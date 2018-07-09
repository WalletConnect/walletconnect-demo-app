import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import POCScreen from './POCScreen';
import QRScannerScreen from './QRScannerScreen';
import SettingsScreen from './SettingsScreen';
import TransactionScreen from './TransactionScreen';
import WalletScreen from './WalletScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('WalletConnect.POCScreen', () => POCScreen);
  Navigation.registerComponent('WalletConnect.QRScannerScreen', () => QRScannerScreen);
  Navigation.registerComponent('WalletConnect.SettingsScreen', () => SettingsScreen);
  Navigation.registerComponent('WalletConnect.TransactionScreen', () => TransactionScreen);
  Navigation.registerComponent('WalletConnect.WalletScreen', () => WalletScreen);
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
