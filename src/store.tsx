import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import clusterStatusReducer from './clusterStatusReducer';

const rootReducer = combineReducers({
  clusterStatus: clusterStatusReducer,
  // Add more reducers if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
