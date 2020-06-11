import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = {
  apps: []
}
 
const server = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_SERVER_SUCCESS:
        return action.payload.response.body.data;
      case constants.FETCH_SERVER_ERROR:
        console.log(action)
        error('Oopse!', "Error fetching server");
        return state
      case constants.CREATE_APP_RUNNING:
        success('Relax!', "Your app is being setup");
        let newState = state
        newState.apps.push(action.payload.response.body.data)
        return newState;
      case constants.CREATE_APP_ERROR:
        error('Notification', "Error creating your app");
       return state;
      case constants.DELETE_SERVER_SUCCESS:
        success('Notification', "Your server and its resources have been deleted");
        window.location = "/";
       return state;
      case constants.DELETE_SERVER_ERROR:
        error('Notification', "Error deleting your server");
       return state;
      default:
        return state;
    }
};
 
export default server;
