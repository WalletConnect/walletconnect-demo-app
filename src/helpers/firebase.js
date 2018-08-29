import firebase from 'react-native-firebase';

let MessageListener = null;
let NotificationListener = null;
let NotificationDisplayedListener = null;

export async function initFCM() {
  await requestPermissions();
  await registerListeners();
  await getFCMToken();
}

export async function getFCMToken() {
  const fcmToken = await firebase.messaging().getToken();
  console.log('FCM TOKEN ===>', fcmToken);
  return fcmToken;
}

export async function requestPermissions() {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    console.log('Permissions granted');
  } catch (error) {
    // User has rejected permissions
    console.log('Error while requesting permissions');
    console.log(error);
  }
}

export async function registerListeners() {
  MessageListener = firebase.messaging().onMessage(message => {
    console.log('FCM onMessage =====>', message);
  });
  NotificationListener = firebase.notifications().onNotification(notification => {
    console.log('FCM onNotification  =====>', notification);
  });
  NotificationDisplayedListener = firebase.notifications().onNotificationDisplayed(notification => {
    console.log('FCM onNotificationDisplayed =====>', notification);
  });
  console.log('FCM Listeners REGISTERED');
}

export async function unregisterListeners() {
  await MessageListener();
  await NotificationListener();
  await NotificationDisplayedListener();
  console.log('FCM Listeners UNREGISTERED');
}
