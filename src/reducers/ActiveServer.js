// import {success} from '../utils/toastr.js';
import constants from '../Constants';

let initialState = {

};

const initialAction = { type: 'initial state'};

const ActiveServer = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.SET_ACTIVE_SERVER:
      // success('Notification', action.payload.server_name);
      return {...state, ...action.payload};
    case constants.UPDATE_ACTIVE_SERVER:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default ActiveServer;