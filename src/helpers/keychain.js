import { setInternetCredentials, getInternetCredentials, resetInternetCredentials } from 'react-native-keychain';

export async function keychainSave(key, value) {
  const jsonValue = JSON.stringify(value);
  try {
    await setInternetCredentials(key, key, jsonValue);
    console.log(`Keychain: saved value for key: ${key}`);
  } catch (err) {
    console.log(`Keychain: failed to save value for key: ${key} error: ${err}`);
  }
}

export async function keychainLoad(key) {
  try {
    const data = await getInternetCredentials(key);
    if (data) {
      console.log(`Keychain: loaded value for key: ${key}`);
      const jsonValue = JSON.parse(data.password);
      return jsonValue;
    }
    console.log(`Keychain: value does not exist for key: ${key}`);
  } catch (err) {
    console.log(`Keychain: failed to load value for key: ${key} error: ${err}`);
  }
  return null;
}

export async function keychainDelete(key) {
  try {
    await resetInternetCredentials(key);
    console.log(`Keychain: removed value for key: ${key}`);
  } catch (err) {
    console.log(`Keychain: failed to remove value for key: ${key} error: ${err}`);
  }
}
