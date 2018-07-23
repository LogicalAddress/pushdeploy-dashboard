import { dispatchAsync } from '../ReduxDispatcher';
import Constants from '../Constants.js';
import AwsSetupAPI from '../api/AwsSetupAPI.js';

let AwsSetupAction = {
  
  createServer(draft) {
    return (dispatch) => {
      dispatchAsync(AwsSetupAPI.createServer, dispatch, {
        request: Constants.CREATE_AWS_SERVER,
        success: Constants.CREATE_AWS_SERVER_RUNNING,
        failure: Constants.CREATE_AWS_SERVER_ERROR
      }, draft);
    }
  },
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_AWS_SETUP_DRAFT, payload})
    }
  },
};

export default AwsSetupAction;