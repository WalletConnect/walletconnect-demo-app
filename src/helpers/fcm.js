// import FCM, { FCMEvent, NotificationType, RemoteNotificationResult, WillPresentNotificationResult } from 'react-native-fcm';
import { Platform, AsyncStorage, AppState } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { addNewCallRequest } from '../redux/_callRequests';

// DELETE THIS
const FCM = {
  getFCMToken: () => {},
  on: () => {},
};
const FCMEvent = null;
const NotificationType = null;
const RemoteNotificationResult = null;
const WillPresentNotificationResult = null;

export async function getFCMToken() {
  const fcmToken = await FCM.getFCMToken();
  console.log(`FCM Token: ${fcmToken}`);
  return fcmToken;
}

export function registerKilledListener() {
  FCM.on(FCMEvent.Notification, notif => {
    console.log(`registerKilledListener notif: ${notif}`);
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
    if (notif.opened_from_tray) {
      setTimeout(() => {
        if (notif._actionIdentifier === 'reply') {
          if (AppState.currentState !== 'background') {
            console.log(`User replied ${JSON.stringify(notif._userText)}`);
          } else {
            AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
          }
        }
        if (notif._actionIdentifier === 'view') {
          console.log('User clicked View in App');
        }
        if (notif._actionIdentifier === 'dismiss') {
          console.log('User clicked Dismiss');
        }
      }, 1000);
    }
  });
}

export function registerAppListener() {
  FCM.on(FCMEvent.Notification, notif => {
    console.log(`registerAppListener notif: ${notif}`);
    const { sessionId, callId } = notif;

    if (Platform.OS === 'ios') {
      switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData);
        break;
      case NotificationType.NotificationResponse:
        addNewCallRequest(sessionId, callId).then(() => {
          Navigation.showModal({
            screen: 'WalletConnect.TransactionScreen',
            navigatorStyle: { navBarHidden: true },
            navigatorButtons: {},
            animationType: 'slide-up',
          });
        });
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All);
        break;
      default:
        break;
      }
    }
  });
}
