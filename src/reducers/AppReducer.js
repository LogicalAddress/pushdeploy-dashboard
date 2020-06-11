import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = {
  server: {},
  app_repository: '',
  app_name: '',
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
      case constants.DELETE_APP_SUCCESS:
        success('Notification', "Your app has been deleted");
        window.location = `/server/${state.server._id}`;
        return state;
      case constants.DELETE_APP_ERROR:
        error('Notification', "Error deleting your app");
        return state;
      default:
        return state;
    }
};
 
export default app;
