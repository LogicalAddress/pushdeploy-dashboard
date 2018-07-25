import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import DatabaseAPI from '../api/DatabaseAPI';
let DatabaseAction = {
  
  updateMysqlDraft(payload) {
    return (dispatch) => {
      dispatch({ type: constants.MYSQL_UPDATE_DRAFT, payload});
    };
  },
  
  createMysqlDatabase(payload) {
    return (dispatch) => {
      dispatchAsync(DatabaseAPI.createMysqlDatabase, dispatch, {
        request: constants.MYSQL_CREATE_DATABASE,
        success: constants.MYSQL_CREATE_DATABASE_SUCCESS,
        failure: constants.MYSQL_CREATE_DATABASE_ERROR
      }, payload);
    }
  },

};

export default DatabaseAction;