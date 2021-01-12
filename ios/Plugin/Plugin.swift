import Foundation
import Capacitor

@objc(AppIcon)
public class AppIcon: CAPPlugin {

    @objc func isSupported(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.supportsAlternateIcons,
            ]);
        }
    }

    @objc func getName(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.resolve([
                "value": UIApplication.shared.alternateIconName
            ]);
        }
    }

    @objc func reset(_ call: CAPPluginCall) {
        changeIcon(iconName: nil, call)
    }

    @objc func change(_ call: CAPPluginCall) {
        CAPLog.print("Changing app icon.")
        
        guard let iconName = call.getString("name") else {
            call.reject("Must provide an icon name.")
            return
        }
        
        DispatchQueue.main.sync {
            
            if UIApplication.shared.responds(to: #selector(getter: UIApplication.supportsAlternateIcons)) && UIApplication.shared.supportsAlternateIcons {
                typealias setAlternateIconName = @convention(c) (NSObject, Selector, NSString?, @escaping (NSError) -> ()) -> ()

                let selectorString = "_setAlternateIconName:completionHandler:"

                let selector = NSSelectorFromString(selectorString)
                let imp = UIApplication.shared.method(for: selector)
                let method = unsafeBitCast(imp, to: setAlternateIconName.self)
                method(UIApplication.shared, selector, iconName as NSString?, { _ in })

                call.resolve();
            }
        }
    }
    
    func changeIcon(iconName: String?, _ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            // Check if the app supports alternating icons
            guard UIApplication.shared.supportsAlternateIcons else {
                return call.reject("Alternate icons not supported.");
            }
                
            // Change the icon to a specific image with given name
            UIApplication.shared.setAlternateIconName(iconName) { (error) in
                // After app icon changed, print our error or success message
                if let error = error {
                    call.reject("App icon failed to due to \(error.localizedDescription)")
                } else {
                    call.resolve()
                }
            }
        }
    }
}
