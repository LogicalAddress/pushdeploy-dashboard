
import constants from '../Constants';
import {error, success} from '../utils/toastr.js';

let initialState = [];

const initialAction = { type: 'initial state'};

const dnsrecords = (state = initialState, action = initialAction) => {
  
  switch (action.type) {
    case constants.CREATE_DNS_RECORD_SUCCESS:
      success('Notification', 'Create DNS record success')
      state.push(action.payload.response.body.data);
      return state;
    case constants.CREATE_DNS_RECORD_ERROR:
      error('Notification', action.payload.error || "Unable to create DNS record");
      return state;
    case constants.FETCH_DNS_RECORDS_SUCCESS:
      console.log("daatta", action.payload.response.body.data);
      return action.payload.response.body.data;
    case constants.FETCH_DNS_RECORDS_ERROR:
      error('Notification', action.payload.error || "Unable to fetch DNS record list, please reload the page");
      return state;
    case constants.DELETE_DNS_RECORD_SUCCESS:
        // TODO: pull out of array
        success('Notification', 'Delete record success');
        return state;
    case constants.DELETE_DNS_RECORD_ERROR:
        error('Notification', action.payload.error || "unable to delete record");
        return state;
    case constants.CREATE_DNS_ZONE_RECORD_SUCCESS:
      success('Notification', 'Create DNS record success')
      state.push(action.payload.response.body.data.record);
      return state;
    case constants.CREATE_DNS_ZONE_RECORD_ERROR:
      error('Notification', action.payload.error || "Unable to create DNS record");
      return state;
    default:
      return state;
  }
};

export default dnsrecords;