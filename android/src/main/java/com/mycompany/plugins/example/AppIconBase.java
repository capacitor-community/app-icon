package com.mycompany.plugins.example;

import com.getcapacitor.JSArray;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.content.ComponentName;
import android.content.pm.PackageManager;

public class AppIconBase {

    private Activity activity;
    private Context context;
    private List<String> disableIconNames = new ArrayList<String>();
    private String activeIconName = "";
    private String packageName;
    PackageManager pm;


    public AppIconBase(Activity activity, Context context) {
        this.activity = activity;
        this.context = context;

        this.packageName = context.getPackageName();
        pm = context.getApplicationContext().getPackageManager();
        activeIconName = "";
    }

    public Boolean isSupported() {
        return true;
    }

    public String getName() {
        Intent intent = pm.getLaunchIntentForPackage(context.getPackageName());
        ComponentName componentName = intent.getComponent();
        int status = pm.getComponentEnabledSetting(componentName);

        if (status == PackageManager.COMPONENT_ENABLED_STATE_ENABLED || status == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT) {
            // The component is currently enabled
            String name = componentName.getShortClassName();
            if (Objects.equals(name, ".MainActivity")) {
                return null;
            }
            return name.substring(1);
        } else {
            // The component is currently disabled
            return null;
        }
    }

    public void change(String enableName, JSArray disableNames) {
        try {
            List<String> newList = disableNames.toList();

            pm.setComponentEnabledSetting(
                    new ComponentName(this.packageName, this.packageName + "." + enableName),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP
            );

            for (String value : newList) {
                Log.i("AppIconBase", this.packageName + "." + value);
                pm.setComponentEnabledSetting(
                        new ComponentName(this.packageName, this.packageName + "." + value),
                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP
                );
            }

            // Always disable main app icon
            pm.setComponentEnabledSetting(
                    new ComponentName(this.packageName, this.packageName + ".MainActivity"),
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP
            );
        } catch (JSONException ignore) {
            // do nothing
        }

    }

    public void reset(JSArray disableNames) {
        try {
            List<String> newList = disableNames.toList();
            // Reset the icon to the default icon
            pm.setComponentEnabledSetting(
                    new ComponentName(packageName, packageName + ".MainActivity"),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP
            );
            for (String value : newList) {
                Log.i("AppIconBaseReset", this.packageName + "." + value);
                pm.setComponentEnabledSetting(
                        new ComponentName(this.packageName, this.packageName + "." + value),
                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP
                );
            }
        } catch (JSONException ignore) {
            // do nothing
        }
    }

}
