package <%= packageName %>.app;

import android.app.Application;

import <%= packageName %>.BuildConfig;
import com.google.firebase.FirebaseApp;
import com.orhanobut.logger.LogLevel;
import com.orhanobut.logger.Logger;
import com.blankj.utilcode.utils.Utils;

import hugo.weaving.DebugLog;

/**
 * Created by aykutasil on 27.11.2016.
 */

public class App extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        init<%= projectName %>();
    }

    @DebugLog
    private void init<%= projectName %>() {

        FirebaseApp.initializeApp(this);

        Logger.init("<%= projectName %>Logger")
                .methodCount(3)
                .logLevel(BuildConfig.DEBUG ? LogLevel.FULL : LogLevel.NONE)        // default LogLevel.FULL
                .methodOffset(0);

        Utils.init(this);        

    }


}
