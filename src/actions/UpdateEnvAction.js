import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import UpdateEnvAPI from '../api/UpdateEnvAPI.js';

let UpdateEnvAction = {
  
  updateEnv(payload) {
    return (dispatch) => {
      dispatchAsync(UpdateEnvAPI.updateEnv, dispatch, {
        request: constants.UPDATE_ENV,
        success: constants.UPDATE_ENV_SUCCESS,
        failure: constants.UPDATE_ENV_ERROR
      }, payload);
    }
  },

};

export default UpdateEnvAction;