import WalletConnect from "@walletconnect/react-native";
import { navigate } from "../navigation";
import {
  IWalletConnectReduxState,
  IWalletConnectRequest
} from "../helpers/types";
import {
  asyncStorageSaveSession,
  asyncStorageLoadSessions,
  asyncStorageDeleteSession
} from "../helpers/asyncStorage";
// import { getFCMToken } from "../helpers/firebase";
// import { DEVICE_LANGUAGE } from "../helpers/constants";

// -- Constants ------------------------------------------------------------- //

const WALLETCONNECT_INIT_REQUEST = "walletConnect/WALLETCONNECT_INIT_REQUEST";
const WALLETCONNECT_INIT_SUCCESS = "walletConnect/WALLETCONNECT_INIT_SUCCESS";
const WALLETCONNECT_INIT_FAILURE = "walletConnect/WALLETCONNECT_INIT_FAILURE";

const WALLETCONNECT_SESSION_REQUEST =
  "walletConnect/WALLETCONNECT_SESSION_REQUEST";

const WALLETCONNECT_SESSION_APPROVAL =
  "walletConnect/WALLETCONNECT_SESSION_APPROVAL";

const WALLETCONNECT_SESSION_REJECTION =
  "walletConnect/WALLETCONNECT_SESSION_REJECTION";

const WALLETCONNECT_SESSION_DISCONNECTED =
  "walletConnect/WALLETCONNECT_SESSION_DISCONNECTED";

const WALLETCONNECT_CALL_REQUEST = "walletConnect/WALLETCONNECT_CALL_REQUEST";

const WALLETCONNECT_CALL_APPROVAL = "walletConnect/WALLETCONNECT_CALL_APPROVAL";

const WALLETCONNECT_CALL_REJECTION =
  "walletConnect/WALLETCONNECT_CALL_REJECTION";

// -- Actions --------------------------------------------------------------- //

const getNativeOptions = async () => {
  // const language = DEVICE_LANGUAGE.replace(/[-_](\w?)+/gi, "").toLowerCase();
  // const token = await getFCMToken();

  const nativeOptions = {
    clientMeta: {
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
      ssl: true
    }
    // push: {
    //   url: "https://push.walletconnect.org",
    //   type: "fcm",
    //   token: token,
    //   peerMeta: true,
    //   language: language
    // }
  };

  return nativeOptions;
};

export const walletConnectInit = () => async (dispatch: any) => {
  dispatch({ type: WALLETCONNECT_INIT_REQUEST });
  try {
    const sessions = await asyncStorageLoadSessions();
    const connectors = await Promise.all(
      Object.values(sessions).map(async session => {
        const nativeOptions = await getNativeOptions();
        new WalletConnect({ session }, nativeOptions);
      })
    );
    dispatch({ type: WALLETCONNECT_INIT_SUCCESS, payload: connectors });
  } catch (error) {
    console.error();
    dispatch({ type: WALLETCONNECT_INIT_FAILURE });
  }
};

export const walletConnectOnSessionRequest = (uri: string) => async (
  dispatch: any,
  getState: any
) => {
  const nativeOptions = await getNativeOptions();

  const connector = new WalletConnect({ uri }, nativeOptions);

  connector.on("session_request", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const { pending } = getState().walletConnect;

    const { peerId, peerMeta } = payload.params[0];

    dispatch({
      type: WALLETCONNECT_SESSION_REQUEST,
      payload: [...pending, connector]
    });

    navigate("Request", { peerId, peerMeta, payload });
  });
};

export const walletConnectApproveSessionRequest = (
  peerId: string,
  response: { accounts: string[]; chainId: number }
) => (dispatch: any, getState: any) => {
  const { connectors, pending } = getState().walletConnect;

  let updatedConnectors = [...connectors];
  let updatedPending;

  pending.forEach((connector: WalletConnect) => {
    if (connector.peerId === peerId) {
      connector.approveSession({
        accounts: response.accounts,
        chainId: response.chainId
      });
      asyncStorageSaveSession(connector.session);
      updatedConnectors.push(connector);
    } else {
      updatedPending.push(connector);
    }
  });

  dispatch({
    type: WALLETCONNECT_SESSION_APPROVAL,
    payload: {
      connectors: updatedConnectors,
      pending: updatedPending
    }
  });

  dispatch(walletConnectSubscribeToEvents(peerId));
};

export const walletConnectRejectSessionRequest = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const { pending } = getState().walletConnect;

  const connector = pending.filter(
    (pendingConnector: WalletConnect) => pendingConnector.peerId === peerId
  )[0];

  connector.rejectSession();

  const updatedPending = pending.filter(
    (connector: WalletConnect) => connector.peerId !== peerId
  );

  dispatch({
    type: WALLETCONNECT_SESSION_REJECTION,
    payload: updatedPending
  });
};

export const walletConnectKillSession = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const updatedConnectors = getState().walletConnect.connectors.filter(
    (connector: WalletConnect) => {
      if (connector.peerId === peerId) {
        connector.killSession();
        asyncStorageDeleteSession(connector.session);
        return false;
      }
      return true;
    }
  );
  dispatch({
    type: WALLETCONNECT_SESSION_DISCONNECTED,
    payload: updatedConnectors
  });
};

export const walletConnectSubscribeToEvents = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const connector = getState().walletConnect.connectors.filter(
    (connector: WalletConnect) => connector.peerId === peerId
  )[0];

  connector.on("call_request", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const updatedRequests = [...getState().walletConnect.requestes];

    const updatedconnector = getState().walletConnect.connectors.filter(
      (connector: WalletConnect) => connector.peerId === peerId
    )[0];

    updatedRequests.push({
      connector: updatedconnector,
      payload: payload
    });

    dispatch({
      type: WALLETCONNECT_CALL_REQUEST,
      payload: updatedRequests
    });

    const { peerMeta } = connector;

    navigate("Request", { peerId, peerMeta, payload });
  });

  connector.on("disconnect", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const updatedConnectors = getState().walletConnect.connectors.filter(
      (connector: WalletConnect) => {
        if (connector.peerId === peerId) {
          asyncStorageDeleteSession(connector.session);
          return false;
        }
        return true;
      }
    );
    dispatch({
      type: WALLETCONNECT_SESSION_DISCONNECTED,
      payload: updatedConnectors
    });
  });
};

export const walletConnectApproveRequest = (
  peerId: string,
  response: { id: number; result: any }
) => async (dispatch: any, getState: any) => {
  const connector = getState().walletConnect.connectors.filter(
    (connector: WalletConnect) => connector.peerId === peerId
  )[0];

  await connector.approveRequest(response);

  const updatedRequests = getState().walletConnect.connectors.filter(
    (request: IWalletConnectRequest) => request.payload.id !== response.id
  );

  await dispatch({
    type: WALLETCONNECT_CALL_APPROVAL,
    payload: updatedRequests
  });
};

export const walletConnectRejectRequest = (
  peerId: string,
  response: { id: number; error: { message: string } }
) => async (dispatch: any, getState: any) => {
  const connector = getState().walletConnect.connectors.filter(
    (connector: WalletConnect) => connector.peerId === peerId
  )[0];

  await connector.rejectRequest(response);

  const updatedRequests = getState().walletConnect.connectors.filter(
    (request: IWalletConnectRequest) => request.payload.id !== response.id
  );

  await dispatch({
    type: WALLETCONNECT_CALL_REJECTION,
    payload: updatedRequests
  });
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE: IWalletConnectReduxState = {
  loading: false,
  connectors: [],
  pending: [],
  requests: []
};

export default (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case WALLETCONNECT_INIT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case WALLETCONNECT_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        connectors: action.payload
      };
    case WALLETCONNECT_INIT_FAILURE:
      return {
        ...state,
        loading: false
      };
    case WALLETCONNECT_SESSION_REQUEST:
    case WALLETCONNECT_SESSION_REJECTION:
      return {
        ...state,
        pending: action.payload
      };
    case WALLETCONNECT_SESSION_APPROVAL:
      return {
        ...state,
        connectors: action.payload.connectors,
        pending: action.payload.pending
      };
    case WALLETCONNECT_SESSION_DISCONNECTED:
      return {
        ...state,
        connectors: action.payload
      };
    case WALLETCONNECT_CALL_REQUEST:
    case WALLETCONNECT_CALL_APPROVAL:
    case WALLETCONNECT_CALL_REJECTION:
      return {
        ...state,
        requests: action.payload
      };
    default:
      return state;
  }
};
