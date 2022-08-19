package com.capacitorcommunity.appicon;
import android.content.pm.PackageManager;
import android.content.ComponentName;
import android.os.Looper;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;


public class AppIcon {

    public AppCompatActivity activity;

    // close issue on Android 10:
    // https://github.com/skb1129/react-native-change-icon/issues/17
    // https://stackoverflow.com/questions/28436280/app-closes-after-calling-setcomponentenabledsetting-for-using-activity-alias
    public void changeIcon(String iconAliasActivity) {
        Log.i("APPICON activate", iconAliasActivity);
        enableActivity(iconAliasActivity);
        String disableActivityName = activity.getComponentName().getClassName();

        Log.i("APPICON deactivate", disableActivityName);
        disableActivity(disableActivityName); // ! closes App!
    }
  
    public void reset() {
        Log.i("APPICON deactivate", activity.getComponentName().getClassName());
        enableActivity("ch.well.healthapp.dev.MainActivityDefault"); // todo
        disableActivity(activity.getComponentName().getClassName());
    }

    private void enableActivity(String activityName) {
        PackageManager manager = activity.getPackageManager();
        manager.setComponentEnabledSetting(new ComponentName(activity, activityName)
                ,PackageManager.COMPONENT_ENABLED_STATE_ENABLED,PackageManager.DONT_KILL_APP);
    }

    private void disableActivity(String activityName) {
        PackageManager manager = activity.getPackageManager();
        manager.setComponentEnabledSetting(new ComponentName(activity, activityName)
                ,PackageManager.COMPONENT_ENABLED_STATE_DISABLED,PackageManager.DONT_KILL_APP);
    }
}
