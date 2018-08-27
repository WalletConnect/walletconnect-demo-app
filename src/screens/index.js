import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

//import QRScannerScreen from './QRScannerScreen';
import SettingsScreen from './SettingsScreen';
import TransactionScreen from './TransactionScreen';
import WalletScreen from './WalletScreen';
import TransactionHistoryScreen from './TransactionHistoryScreen';
import TransactionDetailsScreen from './TransactionDetailsScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  //Navigation.registerComponent('WalletConnect.QRScannerScreen', () => QRScannerScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.SettingsScreen', () => SettingsScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.TransactionScreen', () => TransactionScreen, store, Provider);
  Navigation.registerComponent('WalletConnect.WalletScreen', () => WalletScreen, store, Provider);
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
