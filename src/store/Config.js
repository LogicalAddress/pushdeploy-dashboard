/* eslint-disable */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from '../reducers/index';
import { connectRouter, routerMiddleware } from 'connected-react-router';


const history = createBrowserHistory();

const reduxStore = createStore(
   connectRouter(history)(rootReducer), // new root reducer with router state
   compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk,
      // ... other middlewares ...
    ),
   ),
);


// before connected-react-router
// const reduxStore = createStore(
//    rootReducer,
//    applyMiddleware(thunk) 
// );

export {reduxStore, history};