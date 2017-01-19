package <%= packageName %>.services;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;
import com.orhanobut.logger.Logger;

import hugo.weaving.DebugLog;

/**
 * Created by aykutasil on 27.11.2016.
 */

public class MyFirebaseInstanceIDService extends FirebaseInstanceIdService {

    @DebugLog
    @Override
    public void onTokenRefresh() {
        super.onTokenRefresh();

        // Get updated InstanceID token.
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Logger.d("Refreshed token: " + refreshedToken);

        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        //sendRegistrationToServer(refreshedToken);
    }
}
