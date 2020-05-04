import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import AppsAPI from '../api/AppsAPI.js';

let AppsAction = {
    
  fetchApps(blocking = true) {
    return (dispatch) => {
      dispatchAsync(AppsAPI.fetchApps, dispatch, {
        request: constants.FETCH_APPS,
        success: constants.FETCH_APPS_SUCCESS,
        failure: constants.FETCH_APPS_ERROR
      }, blocking);
    }
  },
  
  createAppFinished() {
    return (dispatch) => {
      dispatch({type: constants.CREATE_APP_FINISHED});
    }
  },

  
};

export default AppsAction;
