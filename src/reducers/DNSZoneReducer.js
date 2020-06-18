import constants from '../Constants';
// import {error} from '../utils/toastr.js'

const initialState = {

}
 
const dnszone = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_DNS_ZONE_SUCCESS:
        return action.payload.response.body.data || {};
      case constants.FETCH_DNS_ZONE_ERROR:
        return state;
      case constants.CREATE_DNS_ZONE_RECORD_SUCCESS:
        return action.payload.response.body.data.zone;
      default:
        return state;
    }
};
 
export default dnszone;
