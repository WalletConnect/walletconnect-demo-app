const api = null;

// constants

const AUTHENTICATION_LOGIN_REQUEST = 'authentication/AUTHENTICATION_LOGIN_REQUEST';
const AUTHENTICATION_LOGIN_SUCCESS = 'authentication/AUTHENTICATION_LOGIN_SUCCESS';
const AUTHENTICATION_LOGIN_FAILURE = 'authentication/AUTHENTICATION_LOGIN_FAILURE';

const AUTHENTICATION_UPDATE_EMAIL = 'authentication/AUTHENTICATION_UPDATE_EMAIL';
const AUTHENTICATION_UPDATE_PASSWORD = 'authentication/AUTHENTICATION_UPDATE_PASSWORD';

// actions

export const authenticationCreate = (email, password) => dispatch => {
  api
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: AUTHENTICATION_LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch(error =>
      dispatch({
        type: AUTHENTICATION_LOGIN_FAILURE,
        payload: error.message,
      }));
};

export const authenticationLogin = (email, password) => dispatch => {
  dispatch({ type: AUTHENTICATION_LOGIN_REQUEST });
  api
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: AUTHENTICATION_LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        authenticationCreate(email, password)(dispatch);
        return;
      }
      dispatch({
        type: AUTHENTICATION_LOGIN_FAILURE,
        payload: error.message,
      });
    });
};

export const authenticationUpdateEmail = email => ({
  type: AUTHENTICATION_UPDATE_EMAIL,
  payload: email,
});

export const authenticationUpdatePassword = password => ({
  type: AUTHENTICATION_UPDATE_PASSWORD,
  payload: password,
});

// reducer

const INITIAL_STATE = {
  fetching: false,
  email: '',
  password: '',
  user: {},
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case AUTHENTICATION_LOGIN_REQUEST:
    return {
      ...state,
      fetching: true,
      error: '',
    };
  case AUTHENTICATION_LOGIN_SUCCESS:
    return {
      ...state,
      fetching: false,
      email: '',
      password: '',
      user: action.payload,
    };
  case AUTHENTICATION_LOGIN_FAILURE:
    return {
      ...state,
      fetching: false,
      password: '',
      error: action.payload,
    };
  case AUTHENTICATION_UPDATE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case AUTHENTICATION_UPDATE_PASSWORD:
    return {
      ...state,
      password: action.payload,
    };
  default:
    return state;
  }
};
