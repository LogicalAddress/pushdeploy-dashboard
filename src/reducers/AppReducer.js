import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = {
  apps: [],
  lock: false,
};
 
const app = (state = initialState, action) => {
  let apps;
    switch (action.type) {
      case constants.FETCH_APPS_SUCCESS:
        apps = action.payload.response.body.data;
        return Object.assign({}, state, {apps: apps});
      case constants.FETCH_APPS_ERROR:
        return state
      case constants.CREATE_APP_RUNNING:
        success('Relax!', "Your app is being setup");
        apps = [...state.apps, action.payload.response.data];
        return Object.assign(state, {lock: true, apps: apps});
      case constants.CREATE_APP_FINISHED:
          return Object.assign(state, {lock: false});
      case constants.CREATE_APP_ERROR:
        error('Oopse!', "Error creating your app");
        return state
      default:
        return state;
    }
};
 
export default app;
