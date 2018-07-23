import { dispatchAsync } from '../ReduxDispatcher';
import Constants from '../Constants.js';
import CustomSetupAPI from '../api/CustomSetupAPI.js';

let CustomSetupAction = {
  
  createServer(draft) {
    return (dispatch) => {
      dispatchAsync(CustomSetupAPI.createServer, dispatch, {
        request: Constants.CREATE_CUSTOM_SERVER,
        success: Constants.CREATE_CUSTOM_SERVER_RUNNING,
        failure: Constants.CREATE_CUSTOM_SERVER_ERROR
      }, draft);
    }
  },
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_CUSTOM_SETUP_DRAFT, payload})
    }
  },
};

export default CustomSetupAction;