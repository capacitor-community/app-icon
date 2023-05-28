package com.mycompany.plugins.example;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AppIcon")
public class AppIconPlugin extends Plugin {

    private AppIconBase implementation;

    @Override
    public void load() {
        implementation = new AppIconBase(this.getActivity(), this.getContext());
    }

    @PluginMethod()
    public void isSupported(PluginCall call) {
        JSObject r = new JSObject();
        r.put("value", implementation.isSupported());
        call.resolve(r);
    }

    @PluginMethod()
    public void getName(PluginCall call) {
        JSObject r = new JSObject();
        r.put("value", implementation.getName());
        call.resolve(r);
    }

    @PluginMethod()
    public void change(PluginCall call) {
        if (!call.getData().has("name")) {
            call.reject("Must provide an icon name");
            return;
        }
        if (!call.getData().has("disable")) {
            call.reject("Must provide an array of icon names to disable");
            return;
        }

        implementation.change(call.getString("name", null), call.getArray("disable", null));
        call.resolve();
    }

    @PluginMethod()
    public void reset(PluginCall call) {
        if (!call.getData().has("disable")) {
            call.reject("Must provide an array of icon names to disable");
            return;
        }

        implementation.reset(call.getArray("disable", null));
        call.resolve();
    }

}
