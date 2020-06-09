import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import data from './reducers';

export default createStore(
  combineReducers({ data }),
  composeWithDevTools(applyMiddleware(thunk))
)

