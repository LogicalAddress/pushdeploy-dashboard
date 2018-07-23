import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import CredentialsAPI from '../api/CredentialsAPI.js';

let CredentialAction = {
  
  fetchUserCredentials() {
    return (dispatch) => {
      dispatchAsync(CredentialsAPI.fetchCredentials, dispatch, {
        request: constants.FETCH_USER_CREDENTIALS,
        success: constants.FETCH_USER_CREDENTIALS_SUCCESS,
        failure: constants.FETCH_USER_CREDENTIALS_ERROR
      });
    }
  },

};

export default CredentialAction;