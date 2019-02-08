import WalletConnect from "@walletconnect/react-native";
import { navigate } from "../navigation";
import {
  IWalletConnectReduxState,
  IWalletConnectCallRequest
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
    const activeConnectors = await Promise.all(
      Object.values(sessions).map(async session => {
        const nativeOptions = await getNativeOptions();
        new WalletConnect({ session }, nativeOptions);
      })
    );
    dispatch({ type: WALLETCONNECT_INIT_SUCCESS, payload: activeConnectors });
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

  const walletConnector = new WalletConnect({ uri }, nativeOptions);

  walletConnector.on("wc_sessionRequest", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const { pendingConnectors } = getState().walletConnect;

    const { peerId, peerMeta } = payload.params[0];

    dispatch({
      type: WALLETCONNECT_SESSION_REQUEST,
      payload: [...pendingConnectors, walletConnector]
    });

    navigate("Request", { peerId, peerMeta, payload });
  });
};

export const walletConnectApproveSessionRequest = (
  peerId: string,
  response: { accounts: string[]; chainId: number }
) => (dispatch: any, getState: any) => {
  const { activeConnectors, pendingConnectors } = getState().walletConnect;

  let updatedActiveConnectors = [...activeConnectors];
  let updatedPendingConnectors;

  pendingConnectors.forEach((walletConnector: WalletConnect) => {
    if (walletConnector.peerId === peerId) {
      walletConnector.approveSession({
        accounts: response.accounts,
        chainId: response.chainId
      });
      asyncStorageSaveSession(walletConnector.session);
      updatedActiveConnectors.push(walletConnector);
    } else {
      updatedPendingConnectors.push(walletConnector);
    }
  });

  dispatch({
    type: WALLETCONNECT_SESSION_APPROVAL,
    payload: {
      activeConnectors: updatedActiveConnectors,
      pendingConnectors: updatedPendingConnectors
    }
  });

  dispatch(walletConnectSubscribeToEvents(peerId));
};

export const walletConnectRejectSessionRequest = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const { pendingConnectors } = getState().walletConnect;

  const updatedPendingConnectors = pendingConnectors.filter(
    (walletConnector: WalletConnect) => walletConnector.peerId !== peerId
  );

  dispatch({
    type: WALLETCONNECT_SESSION_REJECTION,
    payload: updatedPendingConnectors
  });
};

export const walletConnectKillSession = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const updatedActiveConnectors = getState().walletConnect.activeConnectors.filter(
    (activeConnector: WalletConnect) => {
      if (activeConnector.peerId === peerId) {
        activeConnector.killSession();
        asyncStorageDeleteSession(activeConnector.session);
        return false;
      }
      return true;
    }
  );
  dispatch({
    type: WALLETCONNECT_SESSION_DISCONNECTED,
    payload: updatedActiveConnectors
  });
};

export const walletConnectSubscribeToEvents = (peerId: string) => (
  dispatch: any,
  getState: any
) => {
  const walletConnector = getState().walletConnect.activeConnectors.filter(
    (activeConnector: WalletConnect) => activeConnector.peerId === peerId
  )[0];

  walletConnector.on("call_request", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const updatedCallRequests = [...getState().walletConnect.callRequests];

    const updatedWalletConnector = getState().walletConnect.activeConnectors.filter(
      (activeConnector: WalletConnect) => activeConnector.peerId === peerId
    )[0];

    updatedCallRequests.push({
      walletConnector: updatedWalletConnector,
      payload: payload
    });

    dispatch({
      type: WALLETCONNECT_CALL_REQUEST,
      payload: updatedCallRequests
    });

    const { peerMeta } = walletConnector;

    navigate("Request", { peerId, peerMeta, payload });
  });

  walletConnector.on("disconnect", (error: any, payload: any) => {
    if (error) {
      throw error;
    }
    const updatedActiveConnectors = getState().walletConnect.activeConnectors.filter(
      (activeConnector: WalletConnect) => {
        if (activeConnector.peerId === peerId) {
          asyncStorageDeleteSession(activeConnector.session);
          return false;
        }
        return true;
      }
    );
    dispatch({
      type: WALLETCONNECT_SESSION_DISCONNECTED,
      payload: updatedActiveConnectors
    });
  });
};

export const walletConnectApproveCallRequest = (
  peerId: string,
  response: { id: number; result: any }
) => (dispatch: any, getState: any) => {
  const walletConnector = getState().walletConnect.activeConnectors.filter(
    (activeConnector: WalletConnect) => activeConnector.peerId === peerId
  )[0];

  walletConnector.approveRequest(response);

  const updatedCallRequests = getState().walletConnect.activeConnectors.filter(
    (callRequest: IWalletConnectCallRequest) =>
      callRequest.payload.id !== response.id
  );

  dispatch({
    type: WALLETCONNECT_CALL_APPROVAL,
    payload: updatedCallRequests
  });
};

export const walletConnectRejectCallRequest = (
  peerId: string,
  response: { id: number; result: any }
) => (dispatch: any, getState: any) => {
  const walletConnector = getState().walletConnect.activeConnectors.filter(
    (activeConnector: WalletConnect) => activeConnector.peerId === peerId
  )[0];

  walletConnector.rejectRequest(response);

  const updatedCallRequests = getState().walletConnect.activeConnectors.filter(
    (callRequest: IWalletConnectCallRequest) =>
      callRequest.payload.id !== response.id
  );

  dispatch({
    type: WALLETCONNECT_CALL_REJECTION,
    payload: updatedCallRequests
  });
};

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE: IWalletConnectReduxState = {
  loading: false,
  activeConnectors: [],
  pendingConnectors: [],
  callRequests: []
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
        activeConnectors: action.payload
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
        pendingConnectors: action.payload
      };
    case WALLETCONNECT_SESSION_APPROVAL:
      return {
        ...state,
        activeConnectors: action.payload.activeConnectors,
        pendingConnectors: action.payload.pendingConnectors
      };
    case WALLETCONNECT_SESSION_DISCONNECTED:
      return {
        ...state,
        activeConnectors: action.payload
      };
    case WALLETCONNECT_CALL_REQUEST:
    case WALLETCONNECT_CALL_APPROVAL:
    case WALLETCONNECT_CALL_REJECTION:
      return {
        ...state,
        callRequests: action.payload
      };
    default:
      return state;
  }
};
