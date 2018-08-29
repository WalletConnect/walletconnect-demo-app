import firebase from 'react-native-firebase';

let MessageListener = null;

export async function initFCM() {
  await requestPermissions();
  await registerMessageListener();
  const fcmToken = await getFCMToken();
  return fcmToken;
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

export async function registerMessageListener() {
  MessageListener = firebase.messaging().onMessage(message => {
    console.log('FCM Notification =====>', message);
  });
  console.log('Firebase Cloud Messaging Listener REGISTERED');
  return MessageListener;
}

export async function unregisterMessageListener() {
  await MessageListener();
  console.log('Firebase Cloud Messaging Listener UNREGISTERED');
  return MessageListener;
}
