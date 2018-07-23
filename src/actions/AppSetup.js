import { dispatchAsync } from '../ReduxDispatcher';
import Constants from '../Constants.js';
import AppSetupAPI from '../api/AppSetupAPI.js';

let AppSetupAction = {
  
  createApp(draft) {
    return (dispatch) => {
      dispatchAsync(AppSetupAPI.createApp, dispatch, {
        request: Constants.CREATE_APP,
        success: Constants.CREATE_APP_RUNNING,
        failure: Constants.CREATE_APP_ERROR
      }, draft);
    }
  },
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_APP_SETUP_DRAFT, payload})
    }
  },
  
  toggleAutoDeploy(payload) {
    return (dispatch) => {
      dispatchAsync(AppSetupAPI.toggleAutoDeploy, dispatch, {
        request: Constants.TOGGLE_AUTO_DEPLOY,
        success: Constants.TOGGLE_AUTO_DEPLOY_SUCCESS,
        failure: Constants.TOGGLE_AUTO_DEPLOY_ERROR
      }, payload);
    }
  }
};

export default AppSetupAction;