import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import UserAPI from '../api/UserAPI.js';
let UserAction = {
  
  setLoggedInUser(payload) {
    return (dispatch) => {
      dispatch({ type: constants.SET_LOGGEDIN_USER, payload});
    };
  },
  
  login(payload) {
    return (dispatch) => {
      dispatchAsync(UserAPI.login, dispatch, {
        request: constants.LOGIN_USER,
        success: constants.LOGIN_USER_SUCCESS,
        failure: constants.LOGIN_USER_ERROR
      }, payload);
    }
  },
  
  register(payload) {
    return (dispatch) => {
      dispatchAsync(UserAPI.register, dispatch, {
        request: constants.REGISTER_USER,
        success: constants.REGISTER_USER_SUCCESS,
        failure: constants.REGISTER_USER_ERROR
      }, payload);
    }
  },

};

export default UserAction;