package <%= packageName %>.fragment;

import android.support.v4.app.Fragment;

/**
 * Created by aykutasil on 27.11.2016.
 */

public abstract class BaseFragment extends Fragment {

    abstract void initAfterViews();

    abstract void updateUi();
    
}
