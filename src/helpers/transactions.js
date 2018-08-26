import store, { dispatch } from '../redux/store';
import { transactionsAddNew } from '../redux/_transactions';
import { walletConnectGetTransaction } from './walletconnect';

export const addNewTransaction = async (sessionId, transactionId) => {
  console.log('adding new transaction');
  // TODO: future: use the sessionId to find the corresponding walletConnectInstance; for now assume only one
  const transactionData = await walletConnectGetTransaction(transactionId);
  dispatch(transactionsAddNew({ transactionId, transactionData }));
};

export const getTransactionToApprove = () => {
  const transaction = store.transactions[0];
  return transaction;
};
