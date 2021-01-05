import Foundation
import Capacitor

@objc(AppIcon)
public class AppIcon: CAPPlugin {

    @obj func supportsAlternateIcons(_ call: CAPPluginCall) {
        DispatchQueue.main.sync {
            call.success([
                "value": UIApplication.shared.supportsAlternateIcons
            ]);
        }
    }
}
