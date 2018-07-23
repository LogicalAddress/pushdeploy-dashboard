import {error/*, success*/} from '../utils/toastr.js';
import constants from '../Constants';

let initialState = {

};

const initialAction = { type: 'initial state'};

const ActiveApp = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.SET_ACTIVE_APP:
      // success('Notification', action.payload.app_name);
      return {...state, ...action.payload};
    case constants.UPDATE_ACTIVE_APP:
      // console.log("UPDATES", action.payload);
      return {...state, ...action.payload};
    case constants.TOGGLE_AUTO_DEPLOY_ERROR:
        error('Oopse!', "Unable to toggle auto deploy");
        return {...state, ...{auto_deploy: !state.auto_deploy}};
    default:
      return state;
  }
};

export default ActiveApp;