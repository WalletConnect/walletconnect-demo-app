import FCM from 'react-native-fcm';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import { registerAppListener, registerKilledListener } from './helpers/fcm';
import * as EthWallet from './model/ethWallet';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));

registerScreens(store, Provider);
registerScreenVisibilityListener();

EthWallet.init();

FCM.getFCMToken().then(fcmToken => {
  console.log(`FCM Token: ${fcmToken}`);
});

registerAppListener();
registerKilledListener();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Wallet',
      screen: 'WalletConnect.WalletScreen',
      icon: require('./assets/wallet-icon.png'), // eslint-disable-line

      title: 'Wallet',
    },
    {
      label: 'Scan',
      screen: 'WalletConnect.QRScannerScreen',
      icon: require('./assets/scan-icon.png'), // eslint-disable-line

      title: 'WalletConnect',
    },
    {
      label: 'Settings',
      screen: 'WalletConnect.SettingsScreen',
      icon: require('./assets/settings-icon.png'), // eslint-disable-line

      title: 'Settings',
    },
  ],
  tabsStyle: {
    tabBarButtonColor: '#abb1b8',
    tabBarSelectedButtonColor: '#0b0b0c',
    tabBarBackgroundColor: '#f7f8fc',
    initialTabIndex: 0,
  },
  appStyle: {
    orientation: 'portrait',
    bottomTabBadgeTextColor: 'red',
    bottomTabBadgeBackgroundColor: 'green',

    hideBackButtonTitle: false,
  },

  passProps: {},
  animationType: 'slide-down',
});
