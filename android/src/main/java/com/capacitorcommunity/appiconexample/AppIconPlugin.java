package com.capacitorcommunity.appicon;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import android.util.Log;

@CapacitorPlugin(name = "AppIcon")
public class AppIconPlugin extends Plugin {

    private AppIcon implementation = new AppIcon();

    @Override
    public void load() {
        implementation.activity = getActivity();
        Log.i("myconfig", getConfig().getObject("icons").toString());
        Log.i("actualcomponentname",  implementation.activity.getComponentName().toString());
    }

    @PluginMethod
    public void isSupported(PluginCall call) {
        // String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void getName(PluginCall call) {
        
        JSObject ret = new JSObject();
        // DispatchQueue.main.sync {
        //     call.resolve([
        //         "value": UIApplication.shared.alternateIconName
        //     ]);
        // }
        ret.put("value", "this-icon-example");
        call.resolve(ret);
    }
    
    //   change(options: IconOptions): Promise<void>;
    @PluginMethod
    public void change(PluginCall call) {
        String iconAliasActivity;

        try {
            String configName = call.getString("name");
            iconAliasActivity = getConfig().getObject("icons").getJSONObject(configName).getString("androidActivity");
            implementation.changeIcon(iconAliasActivity);
        } catch(Exception e) {
            call.reject("Could not find icons-config");
            return;
        }


        JSObject ret = new JSObject();
        // DispatchQueue.main.sync {
        //     call.resolve([
        //         "value": UIApplication.shared.alternateIconName
        //     ]);
        // }
        // ret.put("value", 'this-icon-example');
        call.resolve(ret);
    }
    

    // reset(options: ResetOptions): Promise<void>;
    @PluginMethod
    public void reset(PluginCall call) {
        // String value = call.getString("value");
        implementation.reset();

        JSObject ret = new JSObject();
        // DispatchQueue.main.sync {
        //     call.resolve([
        //         "value": UIApplication.shared.alternateIconName
        //     ]);
        // }
        ret.put("value", "this-icon-example");
        call.resolve(ret);
    }


}
