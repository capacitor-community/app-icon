package com.mycompany.plugins.example;

import com.getcapacitor.JSArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.content.ComponentName;
import android.content.pm.PackageManager;

public class AppIconBase {

    private Activity activity;
    private List<String> disableIconNames = new ArrayList<String>();
    private String activeIconName = "";
    private String packageName;
    PackageManager pm;


    public AppIconBase(Activity activity, Context context) {
        this.activity = activity;
        this.packageName = context.getPackageName();
        pm = context.getApplicationContext().getPackageManager();
        activeIconName = "";
    }
    
    public void changeIcon(String enableName, JSArray disableNames) {
        
        int action;
        try{
            List<String> newList = disableNames.toList();

            pm.setComponentEnabledSetting(
                new ComponentName(this.packageName, this.packageName + "." + enableName),
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP
            );
            
            for(String value : newList) {                
                Log.i("AppIconBase", this.packageName + "." + value);
                pm.setComponentEnabledSetting(
                    new ComponentName(this.packageName, this.packageName + "." + value),
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP
                );
            }
        }
        catch(JSONException ignore){
            // do nothing
        }

    }

}
