import { AsyncStorage } from 'react-native';

export async function keychainSave(key, value) {
  const jsonValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`AsyncStorage: saved value for key: ${key}`);
  } catch (err) {
    console.log(`AsyncStorage: failed to save value for key: ${key} error: ${err}`);
  }
}

export async function keychainLoad(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      console.log(`AsyncStorage: loaded value for key: ${key}`);
      const jsonValue = JSON.parse(data);
      return jsonValue;
    }
    console.log(`AsyncStorage: value does not exist for key: ${key}`);
  } catch (err) {
    console.log(`AsyncStorage: failed to load value for key: ${key} error: ${err}`);
  }
  return null;
}

export async function keychainDelete(key) {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`AsyncStorage: removed value for key: ${key}`);
  } catch (err) {
    console.log(`AsyncStorage: failed to remove value for key: ${key} error: ${err}`);
  }
}
