import { AsyncStorage } from "react-native";
import { IWalletConnectSession } from "../lib/types";

export async function asyncStorageSave(key: string, value: any) {
  const jsonValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`AsyncStorage: saved value for key: ${key}`);
  } catch (err) {
    console.log(
      `AsyncStorage: failed to save value for key: ${key} error: ${err}`
    );
  }
}

export async function asyncStorageLoad(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      console.log(`AsyncStorage: loaded value for key: ${key}`);
      const jsonValue = JSON.parse(data);
      return jsonValue;
    }
    console.log(`AsyncStorage: value does not exist for key: ${key}`);
  } catch (err) {
    console.log(
      `AsyncStorage: failed to load value for key: ${key} error: ${err}`
    );
  }
  return null;
}

export async function asyncStorageDelete(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`AsyncStorage: removed value for key: ${key}`);
  } catch (err) {
    console.log(
      `AsyncStorage: failed to remove value for key: ${key} error: ${err}`
    );
  }
}

// -- WalletConnect --------------------------------------------------------- //

const asyncStorageId: string = "walletConnect";

interface IWalletConnectSessionDict {
  [peerId: string]: IWalletConnectSession;
}

export async function asyncStorageSaveSession(session: IWalletConnectSession) {
  let sessions: IWalletConnectSessionDict = {};
  const prevSessions = await asyncStorageLoad(asyncStorageId);
  if (prevSessions) {
    sessions = { ...prevSessions };
  }
  sessions[session.peerId] = session;
  await asyncStorageSave(asyncStorageId, sessions);
  return true;
}

export async function asyncStorageLoadSessions() {
  const sessions: IWalletConnectSessionDict = await asyncStorageLoad(
    asyncStorageId
  );
  return sessions;
}

export async function asyncStorageDeleteSession(
  session: IWalletConnectSession
) {
  const sessions = await asyncStorageLoad(asyncStorageId);
  if (sessions) {
    if (sessions[session.peerId]) {
      delete sessions[session.peerId];
    }
  }
  await asyncStorageSave(asyncStorageId, sessions);
  return true;
}
