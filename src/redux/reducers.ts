import { combineReducers } from "redux";
import account from "./_account";
import walletConnect from "./_walletConnect";

export default combineReducers({
  account,
  walletConnect
});
