import Foundation
import Capacitor

@objc(AppIconPlugin)
public class AppIconPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AppIconPlugin"
    public let jsName = "AppIcon"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isSupported", returnType: CAPPluginReturnPromise),
        // CAPPluginMethod(name: "appIconBadgeNumber", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getName", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "change", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reset", returnType: CAPPluginReturnPromise),
    ]

    @objc func isSupported(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.supportsAlternateIcons
            ])
        }
    }

    @objc func getName(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.alternateIconName
            ])
        }
    }

    @objc func reset(_ call: CAPPluginCall) {
        let suppressNotification = call.getBool("suppressNotification") ?? true

        setIcon(iconName: nil, suppressNotification: suppressNotification, call)
    }

    @objc func change(_ call: CAPPluginCall) {

        guard let iconName = call.getString("name") else {
            call.reject("Must provide an icon name.")
            return
        }

        let suppressNotification = call.getBool("suppressNotification") ?? true

        setIcon(iconName: iconName, suppressNotification: suppressNotification, call)
    }

    func setIcon(iconName: String?, suppressNotification: Bool, _ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            // Check if the app supports alternating icons
            guard UIApplication.shared.supportsAlternateIcons else {
                return call.reject("Alternate icons not supported.")
            }

            if suppressNotification {
                if UIApplication.shared.responds(to: #selector(getter: UIApplication.supportsAlternateIcons)) && UIApplication.shared.supportsAlternateIcons {
                    typealias setAlternateIconName = @convention(c) (NSObject, Selector, NSString?, @escaping (NSError) -> Void) -> Void

                    let selectorString = "_setAlternateIconName:completionHandler:"

                    let selector = NSSelectorFromString(selectorString)
                    let imp = UIApplication.shared.method(for: selector)
                    let method = unsafeBitCast(imp, to: setAlternateIconName.self)
                    method(UIApplication.shared, selector, iconName as NSString?, { _ in })

                    call.resolve()
                }

            } else {
                UIApplication.shared.setAlternateIconName(iconName) { (error) in
                    if let error = error {
                        call.reject("App icon failed to due to \(error.localizedDescription)")
                    } else {
                        call.resolve()
                    }
                }
            }
        }
    }
}
