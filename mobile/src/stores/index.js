import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import data from './reducers';

export default createStore(
  combineReducers({ data }),
  applyMiddleware(thunk),
);
