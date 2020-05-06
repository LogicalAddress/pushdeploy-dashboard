import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = [];
 
const servers = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_SERVERS_SUCCESS:
        return action.payload.response.body.data
      case constants.FETCH_SERVERS_ERROR:
        error('Oopse!', "Error fetching servers");
        return state
      case constants.CREATE_SERVER_RUNNING:
        success('Relax!', "Your server is being setup");
        return [...state, action.payload.response.body.data]
      case constants.CREATE_SERVER_ERROR:
        error('Oopse!', "Error setting up the server");
        return state
      default:
        return state;
    }
};
 
export default servers;
