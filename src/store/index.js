import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducer from '../reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers(reducer);
const store = createStore(appReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  )
);
export default store;
