import { combineReducers } from 'redux';
import callRequests from './_callRequests';
import account from './_account';

export default combineReducers({
  callRequests,
  account,
});
