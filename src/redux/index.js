import { combineReducers } from 'redux';
import account from './_account';
import callRequests from './_callRequests';

export default combineReducers({
  account,
  callRequests,
});
