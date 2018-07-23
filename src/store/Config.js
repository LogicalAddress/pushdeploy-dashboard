import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
 
const reduxStore = createStore(
   rootReducer,
   applyMiddleware(thunk) 
);
 
export default reduxStore;