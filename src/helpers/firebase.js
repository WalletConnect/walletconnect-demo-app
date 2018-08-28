import firebase from 'react-native-firebase';

export const getFCMToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  return fcmToken;
};

export const requestPermissions = async () => {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    console.log('Permissions granted');
  } catch (error) {
    // User has rejected permissions
    console.log('Error while requesting permissions');
    console.log(error);
  }
};
