
import constants from '../Constants';
import {error, success} from '../utils/toastr.js';

let initialState = [];

const initialAction = { type: 'initial state'};

const Database = (state = initialState, action = initialAction) => {
  
  switch (action.type) {
    case constants.DATABASE_APPEND_DATABASE:
      return [...state, ...action.payload];
    case constants.CREATE_DATABASE_SUCCESS:
      if(action.payload.response.body.status === 'IN_PROGRESS'){
        success("Notification", "Database creation in progress");
      }else{
        success("Notification", "Database creation successful");
      }
      state.push(action.payload.response.body.data);
      return state;
    case constants.CREATE_DATABASE_ERROR:
      error('Notification', action.payload.error || "Unable to create database");
      return state;
    case constants.FETCH_DATABASE_SUCCESS:
      return action.payload.response.body.data;
    case constants.FETCH_DATABASE_ERROR:
      error('Notification', action.payload.error || "Unable to fetch database list, please reload the page");
      return state;
    default:
      return state;
  }
};

export default Database;