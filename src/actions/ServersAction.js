import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import ServersAPI from '../api/ServersAPI.js';

let ServersAction = {
    
  fetchServers() {
    return (dispatch) => {
      dispatchAsync(ServersAPI.fetchServers, dispatch, {
        request: constants.FETCH_SERVERS,
        success: constants.FETCH_SERVERS_SUCCESS,
        failure: constants.FETCH_SERVERS_ERROR
      });
    }
  },

  createServer(params) {
    return (dispatch) => {
      dispatchAsync(ServersAPI.createServer, dispatch, {
        request: constants.CREATE_SERVER,
        success: constants.CREATE_SERVER_RUNNING,
        failure: constants.CREATE_SERVER_ERROR
      }, params);
    }
  },
  
  createServerFinished() {
    return (dispatch) => {
      dispatch({type: constants.CREATE_SERVER_FINISHED});
    }
  },

  
};

export default ServersAction;
