import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens, registerScreenVisibilityListener } from './screens';
import { getFCMToken, registerAppListener, registerKilledListener } from './helpers/fcm';
import { walletInit } from './helpers/wallet';
import store from './redux/store';

// const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));

registerScreens(store, Provider);
registerScreenVisibilityListener();

walletInit();

getFCMToken();

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
