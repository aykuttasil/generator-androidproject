package <%= packageName %>.app;

import com.facebook.stetho.Stetho;

/**
 * Created by aykutasil on 27.11.2016.
 */


public class AppProjectDebug extends AppProject {

    @Override
    public void onCreate() {
        super.onCreate();
        Stetho.initializeWithDefaults(this);
    }

}
