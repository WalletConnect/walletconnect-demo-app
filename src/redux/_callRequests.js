import { dispatch, getState } from '../redux/store';
import { walletConnectGetCallRequest } from '../helpers/walletconnect';

// -- Constants ------------------------------------------------------------- //

const CALL_REQUESTS_ADD = 'callRequests/CALL_REQUESTS_ADD';

const CALL_REQUESTS_REMOVE = 'callRequests/CALL_REQUESTS_REMOVE';

// -- Actions --------------------------------------------------------------- //

export const addTestCallRequest = async (sessionId, callId, callData) => {
  console.log('[redux] addTestCallRequest sessionId', sessionId);
  console.log('[redux] addTestCallRequest callId', callId);
  const prevCallRequests = getState().callRequests.callRequests;
  const callRequests = { ...prevCallRequests };
  const sessionCallRequests = callRequests[sessionId] || {};
  console.log('[redux] addTestCallRequest callData', callData);
  sessionCallRequests[callId] = callData;
  callRequests[sessionId] = sessionCallRequests;
  dispatch({ type: CALL_REQUESTS_ADD, payload: callRequests });
};

export const addCallRequest = async (sessionId, callId) => {
  console.log('[redux] addCallRequest sessionId', sessionId);
  console.log('[redux] addCallRequest callId', callId);
  const prevCallRequests = getState().callRequests.callRequests;
  const callRequests = { ...prevCallRequests };
  const sessionCallRequests = callRequests[sessionId] || {};
  const callData = await walletConnectGetCallRequest(sessionId, callId);
  console.log('[redux] addCallRequest callData', callData);
  sessionCallRequests[callId] = callData;
  callRequests[sessionId] = sessionCallRequests;
  dispatch({ type: CALL_REQUESTS_ADD, payload: callRequests });
};

export const removeCallRequest = async (sessionId, callId) => {
  console.log('[redux] removeCallRequest sessionId', sessionId);
  console.log('[redux] removeCallRequest callId', callId);
  const prevCallRequests = getState().callRequests.callRequests;
  const callRequests = { ...prevCallRequests };
  delete callRequests[sessionId][callId];
  dispatch({ type: CALL_REQUESTS_REMOVE, payload: callRequests });
};

export const getCallRequest = (sessionId, callId) => {
  console.log('[redux] getCallRequest sessionId', sessionId);
  console.log('[redux] getCallRequest callId', callId);
  const { callRequests } = getState().callRequests;
  return callRequests[sessionId][callId];
};

// -- Reducer --------------------------------------------------------------- //

const INITIAL_STATE = {
  callRequests: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CALL_REQUESTS_ADD:
  case CALL_REQUESTS_REMOVE:
    return {
      ...state,
      callRequests: action.payload,
    };
  default:
    return state;
  }
};
