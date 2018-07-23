import { dispatchAsync } from '../ReduxDispatcher';
import Constants from '../Constants.js';
import LinodeSetupAPI from '../api/LinodeSetupAPI.js';

let LinodeSetupAction = {
  
  createServer(draft) {
    return (dispatch) => {
      dispatchAsync(LinodeSetupAPI.createServer, dispatch, {
        request: Constants.CREATE_LINODE_SERVER,
        success: Constants.CREATE_LINODE_SERVER_RUNNING,
        failure: Constants.CREATE_LINODE_SERVER_ERROR
      }, draft);
    }
  },
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_LINODE_SETUP_DRAFT, payload})
    }
  },
};

export default LinodeSetupAction;