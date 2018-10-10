import RNWalletConnect from 'rn-walletconnect-wallet';
import { loadAddress } from './wallet';
import { getFCMToken } from './firebase';

let walletConnector = null;

export async function walletConnectInitSession(uri) {
  const fcmToken = await getFCMToken();
  const pushEndpoint = 'https://us-central1-walletconnect-app.cloudfunctions.net/push';
  console.log('uri', uri);
  walletConnector = new RNWalletConnect({
    uri,
    push: {
      type: 'fcm',
      token: fcmToken,
      endpoint: pushEndpoint,
    },
  });
  console.log('walletConnector', walletConnector);
  await walletConnectApproveSession();
}

export async function walletConnectApproveSession() {
  const address = await loadAddress();

  try {
    const result = await walletConnector.approveSession({ accounts: [address] });
    console.log('approveSession', result);
  } catch (err) {
    console.log('Error: Approve WalletConnect Session Failed', err);
  }
}

export async function walletConnectGetCallRequest(callId) {
  const callData = await walletConnector.getCallRequest(callId);
  return callData;
}

export async function walletConnectApproveCallRequest(callId, txHash) {
  try {
    await walletConnector.approveCallRequest(callId, { result: txHash });
  } catch (err) {
    console.log('Error: Approve WalletConnect Call Request Failed', err);
  }
}
