import firebase from 'react-native-firebase';
import { addCallRequest } from '../redux/_callRequests';
import { showCallRequestModal } from '../navigation';
import { walletConnectGetSessionData } from './walletConnect';

let NotificationListener = null;
let NotificationDisplayedListener = null;
let NotificationOpenedListener = null;

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
    console.log('Permissions granted');
  } catch (error) {
    console.log('Failed requesting permissions');
    console.error(error);
  }
}

export async function registerListeners() {
  NotificationListener = firebase.notifications().onNotification(onNotification);
  NotificationDisplayedListener = firebase.notifications().onNotificationDisplayed(onNotificationDisplayed);
  NotificationOpenedListener = firebase.notifications().onNotificationOpened(onNotificationOpened);

  console.log('FCM Listeners succesfully registered');
}

export async function unregisterListeners() {
  await NotificationListener();
  await NotificationDisplayedListener();
  await NotificationOpenedListener();
  console.log('FCM Listeners succesfully unregistered');
}

async function onCallRequest(notification) {
  const { sessionId, callId } = notification.data;
  const { dappName } = walletConnectGetSessionData(sessionId);
  await addCallRequest(sessionId, callId);
  await showCallRequestModal({ sessionId, callId, dappName });
}

async function onNotification(notification) {
  try {
    console.log('FCM onNotification  =====>', notification);
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationDisplayed(notification) {
  try {
    console.log('FCM onNotificationDisplayed =====>', notification);
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationOpened(notificationOpened) {
  try {
    console.log('FCM onNotificationOpened =====>', notificationOpened);
    const { notification } = notificationOpened;
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}
