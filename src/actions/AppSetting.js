import { dispatchAsync } from '../ReduxDispatcher';
import constants from './Constants.js';
import AppSettingAPI from '../api/AppSettingAPI.js';

let AppSettingAction = {
  
  fetchUser() {
    return (dispatch) => {
      dispatchAsync(AppSettingAPI.fetchAppSetting(), dispatch, {
        request: constants.FETCH_APP_SETTING,
        success: constants.FETCH_APP_SETTING_SUCCESS,
        failure: constants.FETCH_APP_SETTING_ERROR
      });
    }
  },

};

export default AppSettingAction;