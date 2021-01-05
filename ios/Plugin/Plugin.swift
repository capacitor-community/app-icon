import Foundation
import Capacitor

@objc(AppIcon)
public class AppIcon: CAPPlugin {

    @objc func supportsAlternateIcons(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.success([
                "value": UIApplication.shared.supportsAlternateIcons
            ]);
        }
    }

    @objc func applicationIconBadgeNumber(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.success([
                "value": UIApplication.shared.applicationIconBadgeNumber
            ]);
        }
    }
}
