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
      }, null, blocking);
    }
  },

  updateAppField(params) {
    return (dispatch) => {
      dispatch({type: constants.UPDATE_APP_FIELD, payload: params});
    }
  },

  getApp(params, blocking = true) {
    return (dispatch) => {
      dispatchAsync(AppsAPI.fetchApp, dispatch, {
        request: constants.FETCH_APP,
        success: constants.FETCH_APP_SUCCESS,
        failure: constants.FETCH_APP_ERROR
      }, params, blocking);
    }
  },

  deleteApp(params) {
    return (dispatch) => {
      dispatchAsync(AppsAPI.deleteApp, dispatch, {
        request: constants.DELETE_APP,
        success: constants.DELETE_APP_SUCCESS,
        failure: constants.DELETE_APP_ERROR
      }, params);
    }
  },
  
};

export default AppsAction;
