import { combineReducers } from 'redux';
import transactions from './_transactions';
import account from './_account';

export default combineReducers({
  transactions,
  account,
});
