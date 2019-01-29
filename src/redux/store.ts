import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import reducers from "./reducers";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export const { dispatch } = store;

export const { getState } = store;

export default store;
