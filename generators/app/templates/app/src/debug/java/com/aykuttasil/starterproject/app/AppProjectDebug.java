package <%= packageName %>.app;

import com.facebook.stetho.Stetho;

/**
 * Created by aykutasil on 27.11.2016.
 */


public class AppProjectDebug extends App {

    @Override
    public void onCreate() {
        super.onCreate();
        Stetho.initializeWithDefaults(this);
    }

}
