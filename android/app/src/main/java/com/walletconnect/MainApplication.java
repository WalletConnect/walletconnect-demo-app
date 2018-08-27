package com.walletconnect;
import android.support.annotation.NonNull;

//import com.facebook.react.ReactApplication;
//import com.reactnativenavigation.NavigationReactPackage;
//import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
//import com.facebook.react.shell.MainReactPackage;
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


     @NonNull
     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
	 // Add the packages you require here.
	 // No need to add RnnPackage and MainReactPackage
	 return Arrays.<ReactPackage>asList(
					    // eg. new VectorIconsPackage()					    
					      );
     }     
 }
