import store, { dispatch } from '../redux/store';
import { walletConnectGetCallRequest } from '../helpers/walletconnect';

// -- Constants ------------------------------------------------------------- //

const CALL_REQUESTS_ADD_NEW = 'call_requests/CALL_REQUESTS_ADD_NEW';

// -- Actions --------------------------------------------------------------- //

export const addNewCallRequest = async callId => {
  console.log('adding new call request');
  // TODO: future: use the sessionId to find the corresponding walletConnectInstance; for now assume only one
  const callData = await walletConnectGetCallRequest(callId);
  const callRequest = { id: callId, data: callData };
  dispatch({ type: CALL_REQUESTS_ADD_NEW, payload: callRequest });
};

export const getLastCallRequest = callId => {
  const { callRequests } = store.getState();
  return callRequests[0];
};

// -- Reducer --------------------------------------------------------------- //

const INITIAL_STATE = {
  callRequests: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CALL_REQUESTS_ADD_NEW:
    return {
      ...state,
      callRequests: [...state.callRequests, action.payload],
    };
  default:
    return state;
  }
};
