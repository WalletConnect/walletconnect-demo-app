package org.walletconnect;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.reactnativenavigation.NavigationReactPackage;
import org.reactnative.camera.RNCameraPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.oblador.keychain.KeychainPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
          new SplashScreenReactPackage(),
          new FingerprintAuthPackage(),
          new UdpSocketsModule(),
          new TcpSocketsModule(),
          new RNOSModule(),
          new NavigationReactPackage(),
          new RNCameraPackage(),
          new FIRMessagingPackage(),
          new RandomBytesPackage(),
          new KeychainPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
