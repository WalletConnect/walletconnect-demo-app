import RNWalletConnect from 'rn-walletconnect-wallet';
import { loadAddress } from './wallet';
import { getFCMToken } from './firebase';

const pushEndpoint = 'https://us-central1-walletconnect-app.cloudfunctions.net/push';

let walletConnector = null;

export async function walletConnectInitSession(uri) {
  console.log('uri', uri);
  walletConnector = new RNWalletConnect(uri);
  console.log('walletConnector', walletConnector);
  await walletConnectSendSession();
}

export async function walletConnectSendSession() {
  const address = await loadAddress();
  const fcmToken = await getFCMToken();
  try {
    const result = await walletConnector.sendSessionStatus({
      fcmToken,
      pushEndpoint,
      data: [address],
    });
    console.log('sendSessionStatus', result);
  } catch (err) {
    console.log('send session status error', err);
  }
}

export async function walletConnectGetTransaction(transactionId) {
  const transactionData = await walletConnector.getTransactionRequest(transactionId);
  return transactionData;
}

export async function walletConnectSendTransactionHash(transactionId, success, txHash) {
  try {
    await walletConnector.sendTransactionStatus(transactionId, { success, txHash });
  } catch (err) {
    console.log('sending txn status error', err);
  }
}
