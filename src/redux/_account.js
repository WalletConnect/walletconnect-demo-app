import { apiGetAccountBalances, apiGetAccountTransactions, apiGetTransactionDetails } from '../helpers/api';
import { parseAccountBalances, parseAccountTransactions } from '../helpers/parsers';
import alert from '../helpers/alert';

// -- Constants ------------------------------------------------------------- //

const ACCOUNT_UPDATE_ADDRESS = 'account/ACCOUNT_UPDATE_ADDRESS';

const ACCOUNT_UPDATE_NETWORK = 'account/ACCOUNT_UPDATE_NETWORK';

const ACCOUNT_GET_ASSETS_REQUEST = 'account/ACCOUNT_GET_ASSETS_REQUEST';
const ACCOUNT_GET_ASSETS_SUCCESS = 'account/ACCOUNT_GET_ASSETS_SUCCESS';
const ACCOUNT_GET_ASSETS_FAILURE = 'account/ACCOUNT_GET_ASSETS_FAILURE';

const ACCOUNT_GET_TRANSACTIONS_REQUEST = 'account/ACCOUNT_GET_TRANSACTIONS_REQUEST';
const ACCOUNT_GET_TRANSACTIONS_SUCCESS = 'account/ACCOUNT_GET_TRANSACTIONS_SUCCESS';
const ACCOUNT_GET_TRANSACTIONS_FAILURE = 'account/ACCOUNT_GET_TRANSACTIONS_FAILURE';

const ACCOUNT_GET_TRANSACTION_DETAILS_REQUEST = 'account/ACCOUNT_GET_TRANSACTION_DETAILS_REQUEST';
const ACCOUNT_GET_TRANSACTION_DETAILS_SUCCESS = 'account/ACCOUNT_GET_TRANSACTION_DETAILS_SUCCESS';
const ACCOUNT_GET_TRANSACTION_DETAILS_FAILURE = 'account/ACCOUNT_GET_TRANSACTION_DETAILS_FAILURE';

// -- Actions --------------------------------------------------------------- //

export const accountUpdateAddress = address => dispatch => {
  dispatch({ type: ACCOUNT_UPDATE_ADDRESS, payload: address });
  dispatch(accountGetAssets());
};

export const accountUpdateNetwork = network => ({ type: ACCOUNT_UPDATE_NETWORK, payload: network });

export const accountGetAssets = () => async (dispatch, getState) => {
  const { address, network } = getState().account;
  dispatch({ type: ACCOUNT_GET_ASSETS_REQUEST });
  try {
    const { data } = await apiGetAccountBalances(address, network);
    const assets = parseAccountBalances(data);
    dispatch({ type: ACCOUNT_GET_ASSETS_SUCCESS, payload: assets });
  } catch (error) {
    // console.error(error);
    alert('ERROR', `Message: ${ACCOUNT_GET_ASSETS_FAILURE}`);
    dispatch({ type: ACCOUNT_GET_ASSETS_FAILURE });
    return error;
  }
};

export const accountGetTransactions = address => async (dispatch, getState) => {
  const { network } = getState().account;
  dispatch({ type: ACCOUNT_GET_TRANSACTIONS_REQUEST });
  try {
    const { data } = await apiGetAccountTransactions(address, network);
    const transactions = parseAccountTransactions(data, network);
    dispatch({ type: ACCOUNT_GET_TRANSACTIONS_SUCCESS, payload: transactions });
  } catch (error) {
    // console.error(error);
    alert('ERROR', `Message: ${ACCOUNT_GET_TRANSACTIONS_FAILURE}`);
    dispatch({ type: ACCOUNT_GET_TRANSACTIONS_FAILURE });
    return error;
  }
};

export const accountGetTransactionDetails = txHash => async (dispatch, getState) => {
  const { network } = getState().account;
  dispatch({ type: ACCOUNT_GET_TRANSACTION_DETAILS_REQUEST });
  try {
    const { data } = await apiGetTransactionDetails(txHash, network);
    dispatch({ type: ACCOUNT_GET_TRANSACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // console.error(error);
    alert('ERROR', `Message: ${ACCOUNT_GET_TRANSACTION_DETAILS_FAILURE}`);
    dispatch({ type: ACCOUNT_GET_TRANSACTION_DETAILS_FAILURE });
    return error;
  }
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  loading: false,
  network: 'mainnet',
  address: '',
  assets: [],
  transactions: [],
  txDetails: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACCOUNT_UPDATE_ADDRESS:
    return {
      ...state,
      address: action.payload,
    };
  case ACCOUNT_UPDATE_NETWORK:
    return {
      ...state,
      network: action.payload,
    };
  case ACCOUNT_GET_ASSETS_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case ACCOUNT_GET_ASSETS_SUCCESS:
    return {
      ...state,
      loading: false,
      assets: action.payload,
    };
  case ACCOUNT_GET_ASSETS_FAILURE:
    return {
      ...state,
      loading: false,
    };
  case ACCOUNT_GET_TRANSACTION_DETAILS_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case ACCOUNT_GET_TRANSACTION_DETAILS_SUCCESS:
    return {
      ...state,
      loading: false,
      txDetails: action.payload,
    };
  case ACCOUNT_GET_TRANSACTION_DETAILS_FAILURE:
    return {
      ...state,
      loading: false,
    };

  case ACCOUNT_GET_TRANSACTIONS_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case ACCOUNT_GET_TRANSACTIONS_SUCCESS:
    return {
      ...state,
      loading: false,
      transactions: action.payload,
    };
  case ACCOUNT_GET_TRANSACTIONS_FAILURE:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
};
