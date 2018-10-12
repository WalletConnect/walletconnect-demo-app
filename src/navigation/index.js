import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import QRScannerScreen from '../screens/QRScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import WalletScreen from '../screens/WalletScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen';
import AccountScreen from '../screens/AccountScreen';
import NetworkScreen from '../screens/NetworkScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('WalletConnect.QRScannerScreen', () => QRScannerScreen, store, Provider);

  // Settings Tab Screens
  Navigation.registerComponent('WalletConnect.SettingsScreen', () => SettingsScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.AccountScreen', () => AccountScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.NetworkScreen', () => NetworkScreen, store, Provider);

  // Wallet Tab Screens
  Navigation.registerComponent('WalletConnect.WalletScreen', () => WalletScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.TransactionScreen', () => TransactionScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.TransactionHistoryScreen', () => TransactionHistoryScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.TransactionDetailsScreen', () => TransactionDetailsScreen, store, Provider);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
    didAppear: ({
      screen, startTime, endTime, commandType,
    }) =>
      console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({ screen }) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`),
  }).register();
}

export async function hideActiveModal() {
  Navigation.dismissModal({
    animationType: 'slide-down',
  });
}

export async function showTransactionModal(passProps = {}) {
  Navigation.showModal({
    screen: 'WalletConnect.TransactionScreen',
    navigatorStyle: { navBarHidden: true },
    navigatorButtons: {},
    animationType: 'slide-up',
    passProps,
  });
}
