package com.yitu8_app_client1;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zyu.ReactNativeWheelPickerPackage;
import com.theweflex.react.WeChatPackage;
import com.brentvatne.react.ReactVideoPackage;
import cn.reactnative.modules.update.UpdatePackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.beefe.picker.PickerViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.wix.interactable.Interactable;
import com.rnfs.RNFSPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import MyNativeModule.MyNativeReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeWheelPickerPackage(),
            new WeChatPackage(),
            new ReactVideoPackage(),
            new UpdatePackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new PickerViewPackage(),
            new OrientationPackage(),
            new LinearGradientPackage(),
            new Interactable(),
            new RNFSPackage(),
            new ExtraDimensionsPackage(),
            new RNDeviceInfo(),
            new ReactNativeContacts(),
            new MyNativeReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
