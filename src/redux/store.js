import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from '.';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk)));

export const { dispatch } = store;

export default store;
