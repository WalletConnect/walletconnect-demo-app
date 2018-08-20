import { Navigation } from 'react-native-navigation';
import { walletConnectGetTransaction } from './walletconnect';

export const transactionsToApprove = [];

export const addNewTransaction = async (sessionId, transactionId) => {
  console.log('adding new transaction');
  // TODO: future: use the sessionId to find the corresponding walletConnectInstance; for now assume only one
  const transactionData = await walletConnectGetTransaction(transactionId);
  transactionsToApprove.push({ transactionId, transactionData });
};

export const getTransactionToApprove = () => {
  // TODO: make more robust
  console.log('transactions to approve', transactionsToApprove);
  const transaction = transactionsToApprove.shift();
  console.log('transaction popped', transaction);
  return transaction;
};

export function showApproveTransactions(sessionId, transactionId) {
  addNewTransaction(sessionId, transactionId).then(() => {
    Navigation.showModal({
      screen: 'WalletConnect.TransactionScreen',
      navigatorStyle: { navBarHidden: true },
      navigatorButtons: {},
      animationType: 'slide-up',
    });
  });
}
