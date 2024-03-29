import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import ServersAPI from '../api/ServersAPI.js';

let ServersAction = {
    
  fetchServers(blocking = true) {
    return (dispatch) => {
      dispatchAsync(ServersAPI.fetchServers, dispatch, {
        request: constants.FETCH_SERVERS,
        success: constants.FETCH_SERVERS_SUCCESS,
        failure: constants.FETCH_SERVERS_ERROR
      }, null, blocking);
    }
  },

  fetchServer(params, blocking = true) {
    return (dispatch) => {
      dispatchAsync(ServersAPI.fetchServer, dispatch, {
        request: constants.FETCH_SERVER,
        success: constants.FETCH_SERVER_SUCCESS,
        failure: constants.FETCH_SERVER_ERROR
      }, params, blocking);
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

  deleteServer(params) {
    return (dispatch) => {
      dispatchAsync(ServersAPI.deleteServer, dispatch, {
        request: constants.DELETE_SERVER,
        success: constants.DELETE_SERVER_SUCCESS,
        failure: constants.DELETE_SERVER_ERROR
      }, params);
    }
  },

  
};

export default ServersAction;
