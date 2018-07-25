
import constants from '../Constants';
import {error, success} from '../utils/toastr.js';

let initialState = {
  username: 'root',
  db_name: '',
};

const initialAction = { type: 'initial state'};

const ProfileDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.MYSQL_UPDATE_DRAFT:
      return {...state, ...action.payload};
    case constants.MYSQL_CREATE_DATABASE_SUCCESS:
      success("Notification", "Database creation Successful");
     return state;
    case constants.MYSQL_CREATE_DATABASE_ERROR:
      error('Oopse!', action.payload.error || "Unable to create database");
      return state;
    default:
      return state;
  }
};

export default ProfileDraft;