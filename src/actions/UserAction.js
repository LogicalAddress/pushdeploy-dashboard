import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import UserAPI from '../api/UserAPI.js';

let UserAction = {
  
  fetchUser() {
    return (dispatch) => {
      dispatchAsync(UserAPI.fetchUser, dispatch, {
        request: constants.FETCH_USER,
        success: constants.FETCH_USER_SUCCESS,
        failure: constants.FETCH_USER_ERROR
      });
    }
  },

};

export default UserAction;