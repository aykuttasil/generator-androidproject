package <%= packageName %>.activity;

import <%= packageName %>.R;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;

@EActivity(R.layout.activity_main)
public class MainActivity extends BaseActivity {

    @AfterViews
    @Override
    void initAfterViews() {

    }

    @Override
    void updateUi() {

    }

}
