import Foundation
import Capacitor

@objc(AppIcon)
public class AppIcon: CAPPlugin {

    @objc func supportsAlternateIcons(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.supportsAlternateIcons,
            ]);
        }
    }

    @objc func appIconBadgeNumber(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.applicationIconBadgeNumber
            ]);
        }
    }

    @objc func alternateIconName(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.alternateIconName
            ]);
        }
    }

    @objc func setAlternateIconName(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            guard UIApplication.shared.supportsAlternateIcons else {
                call.reject("Alternate icons is not supported.")
                return;
            }
        }
        
        guard let iconName = call.options["name"] as? String else {
            call.reject("Must provide an icon name.")
            return
        }
        
        DispatchQueue.main.sync {
//            UIApplication.shared.setAlternateIconName(iconName) { (error) in
//                // After app icon changed, print our error or success message
//                if let error = error {
//                    call.reject("App icon failed to due to \(error.localizedDescription)")
//                } else {
//                    call.resolve(["value": "App icon changed successfully."])
//                }
//            }
            
            if UIApplication.shared.responds(to: #selector(getter: UIApplication.supportsAlternateIcons)) && UIApplication.shared.supportsAlternateIcons {
                typealias setAlternateIconName = @convention(c) (NSObject, Selector, NSString?, @escaping (NSError) -> ()) -> ()
                        
                let selectorString = "_setAlternateIconName:completionHandler:"
                        
                let selector = NSSelectorFromString(selectorString)
                let imp = UIApplication.shared.method(for: selector)
                let method = unsafeBitCast(imp, to: setAlternateIconName.self)
                method(UIApplication.shared, selector, iconName as NSString?, { _ in })
            }
        }
    }
}
