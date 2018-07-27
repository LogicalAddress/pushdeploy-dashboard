import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import DatabaseAPI from '../api/DatabaseAPI';
let DatabaseAction = {
  
  updateDatabaseDraft(payload) {
    return (dispatch) => {
      dispatch({ type: constants.DATABASE_UPDATE_DRAFT, payload});
    };
  },
  
  createDatabase(payload) {
    return (dispatch) => {
      dispatchAsync(DatabaseAPI.createDatabase, dispatch, {
        request: constants.CREATE_DATABASE,
        success: constants.CREATE_DATABASE_SUCCESS,
        failure: constants.CREATE_DATABASE_ERROR
      }, payload);
    }
  },
  
  fetchDatbases(payload) {
    return (dispatch) => {
      dispatchAsync(DatabaseAPI.fetchDatbases, dispatch, {
        request: constants.FETCH_DATABASE,
        success: constants.FETCH_DATABASE_SUCCESS,
        failure: constants.FETCH_DATABASE_ERROR
      }, payload);
    }
  },

};

export default DatabaseAction;