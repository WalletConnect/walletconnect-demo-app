import RNWalletConnect from 'rn-walletconnect-wallet';
import { loadAddress } from './wallet';
import { getFCMToken } from './firebase';
import { asyncStorageLoadSessions, asyncStorageSaveSession, asyncStorageDeleteSession } from './asyncStorage';

const walletConnectors = {};

function setWalletConnector(sessionId, walletConnector) {
  walletConnectors[sessionId] = walletConnector;
  return true;
}

function getWalletConnector(sessionId) {
  const walletConnector = walletConnectors[sessionId];
  return walletConnector;
}

async function generateWalletConnector(session) {
  const pushType = 'fcm';
  const pushToken = await getFCMToken();
  const pushWebhook = 'https://us-central1-walletconnect-app.cloudfunctions.net/push';

  const push = {
    type: pushType,
    token: pushToken,
    webhook: pushWebhook,
  };

  const walletConnector = new RNWalletConnect({ ...session, push });

  return walletConnector;
}

export async function walletConnectNewSession(uri) {
  console.log('uri', uri);

  const walletConnector = await generateWalletConnector({ uri });

  const { sessionId } = walletConnector;
  setWalletConnector(sessionId, walletConnector);

  const session = await walletConnectApproveSession(sessionId);

  console.log('session', session);
  try {
    await asyncStorageSaveSession(session);
    await asyncStorageSaveSession(session);
  } catch (err) {
    console.error(err);
    console.log('Error: Async Storage Save Session Failed', err);
  }
  return session;
}

export async function walletConnectGetLiveSessions() {
  const liveSessions = {};
  let savedSessions = {};
  try {
    savedSessions = await asyncStorageLoadSessions();
    console.log('savedSessions', savedSessions);
  } catch (err) {
    console.error(err);
    console.log('Error: Async Storage Load Sessions Failed', err);
  }
  const savedSessionIds = savedSessions ? Object.keys(savedSessions) : [];
  console.log('savedSessionIds', savedSessionIds);
  if (savedSessions && savedSessionIds.length) {
    try {
      await Promise.all(savedSessionIds.map(async sessionId => {
        const now = Date.now();
        const session = savedSessions[sessionId];
        if (session.expires > now) {
          liveSessions[sessionId] = session;
        } else {
          try {
            await asyncStorageDeleteSession(session);
          } catch (err) {
            console.error(err);
            console.log('Error: Async Storage Delete Session Failed', err);
          }
        }
      }));
    } catch (err) {
      console.error(err);
      console.log('Error: Filtering Saved Sessions Failed', err);
    }
    const liveSessionIds = liveSessions ? Object.keys(liveSessions) : {};
    console.log('liveSessionIds', liveSessionIds);
    if (liveSessions && liveSessionIds.length) {
      try {
        await Promise.all(liveSessionIds.map(async sessionId => {
          const session = liveSessions[sessionId];

          const walletConnector = await generateWalletConnector(session);

          setWalletConnector(sessionId, walletConnector);
          console.log('session', session);
        }));
      } catch (err) {
        console.error(err);
        console.log('Error: Filtering Live Sessions Failed', err);
      }
    }
  }
  return liveSessions;
}

export function walletConnectGetSessionData(sessionId) {
  const walletConnector = getWalletConnector(sessionId);
  return walletConnector.toJSON();
}

export async function walletConnectApproveSession(sessionId) {
  const address = await loadAddress();

  const walletConnector = getWalletConnector(sessionId);
  try {
    const result = await walletConnector.approveSession({ accounts: [address] });
    console.log('approveSession', result);
    return result;
  } catch (err) {
    console.log('Error: Approve WalletConnect Session Failed', err);
  }
}

export async function walletConnectGetCallRequest(sessionId, callId) {
  const walletConnector = getWalletConnector(sessionId);
  try {
    const result = await walletConnector.getCallRequest(callId);
    console.log('getCallRequest', result);
    const callData = result.data;
    console.log('callData', callData);
    return callData;
  } catch (err) {
    console.log('Error: Get WalletConnect Call Request Failed', err);
  }
}

export async function walletConnectApproveCallRequest(sessionId, callId, result) {
  const walletConnector = getWalletConnector(sessionId);
  try {
    const res = await walletConnector.approveCallRequest(callId, result);
    console.log('approveCallRequest', res);
  } catch (err) {
    console.log('Error: Approve WalletConnect Call Request Failed', err);
  }
}

export async function walletConnectRejectCallRequest(sessionId, callId) {
  const walletConnector = getWalletConnector(sessionId);
  try {
    const res = await walletConnector.rejectCallRequest(callId);
    console.log('rejectCallRequest', res);
  } catch (err) {
    console.log('Error: Reject WalletConnect Call Request Failed', err);
  }
}
