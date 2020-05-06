import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = {
  server: {},
  app_repository: ''
}
 
const app = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_APP_SUCCESS:
        return action.payload.response.body.data;
      case constants.FETCH_APP_ERROR:
        error('Notification', "Error getting app");
        return state;
      case constants.UPDATE_APP_FIELD:
          return {...state, ...action.payload};
      case constants.TOGGLE_AUTO_DEPLOY_SUCCESS:
          return action.payload.response.body.data;
      case constants.TOGGLE_AUTO_DEPLOY_ERROR:
        error('Oopse!', "Unable to toggle auto deploy");
        return state;
      case constants.UPDATE_ENV_ERROR:
        error('Notification', "Error updating the app's environment");
        return state
      case constants.UPDATE_ENV_SUCCESS:
          success('Notification', "Your app has been updated, deploy");
          return action.payload.response.body.data;
      default:
        return state;
    }
};
 
export default app;
