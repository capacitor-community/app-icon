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
        
    }
}
