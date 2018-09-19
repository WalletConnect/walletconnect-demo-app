import RNWalletConnect from 'rn-walletconnect-wallet';
import { loadAddress } from './wallet';
import { getFCMToken } from './firebase';

const pushEndpoint = 'https://us-central1-walletconnect-app.cloudfunctions.net/push';

let walletConnector = null;

export const walletConnectInitSession = async uri => {
  console.log('uri', uri);
  walletConnector = new RNWalletConnect(uri);
  console.log('walletConnector', walletConnector);
  await walletConnectSendSession();
};

export const walletConnectSendSession = async () => {
  const address = await loadAddress();
  const fcmToken = await getFCMToken();
  try {
    await walletConnector.sendSessionStatus({
      fcmToken,
      pushEndpoint,
      data: [address],
    });
  } catch (err) {
    console.log('send session status error', err);
  }
};

export const walletConnectGetTransaction = async transactionId => {
  const transactionData = await walletConnector.getTransactionRequest(transactionId);
  return transactionData;
};

export const walletConnectSendTransactionHash = async (transactionId, success, txHash) => {
  try {
    await walletConnector.sendTransactionStatus(transactionId, { success, txHash });
  } catch (err) {
    console.log('sending txn status error', err);
  }
};
