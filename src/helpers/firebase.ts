import firebase from "react-native-firebase";

let MessageListener: any = null;
let NotificationListener: any = null;
let NotificationDisplayedListener: any = null;
let NotificationOpenedListener: any = null;

export async function initFCM() {
  await requestPermissions();
  await registerListeners();
  await getFCMToken();
}

export async function getFCMToken() {
  const fcmToken = await firebase.messaging().getToken();
  console.log("FCM TOKEN ===>", fcmToken);
  return fcmToken;
}

export async function requestPermissions() {
  try {
    await firebase.messaging().requestPermission();
    console.log("Permissions granted");
  } catch (error) {
    console.log("Failed requesting permissions");
    console.error(error);
  }
}

export async function registerListeners() {
  MessageListener = firebase.messaging().onMessage(onMessage);
  NotificationListener = firebase
    .notifications()
    .onNotification(onNotification);
  NotificationDisplayedListener = firebase
    .notifications()
    .onNotificationDisplayed(onNotificationDisplayed);
  NotificationOpenedListener = firebase
    .notifications()
    .onNotificationOpened(onNotificationOpened);

  console.log("FCM Listeners succesfully registered");
}

export async function unregisterListeners() {
  await MessageListener();
  await NotificationListener();
  await NotificationDisplayedListener();
  await NotificationOpenedListener();
  console.log("FCM Listeners succesfully unregistered");
}

async function onMessage(message: any) {
  try {
    console.log("FCM onMessage  =====>", message);
  } catch (error) {
    console.error(error);
  }
}

async function onNotification(notification: any) {
  try {
    console.log("FCM onNotification  =====>", notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationDisplayed(notification: any) {
  try {
    console.log("FCM onNotificationDisplayed =====>", notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationOpened(notificationOpened: any) {
  try {
    console.log("FCM onNotificationOpened =====>", notificationOpened);
    const { notification } = notificationOpened;
  } catch (error) {
    console.error(error);
  }
}
