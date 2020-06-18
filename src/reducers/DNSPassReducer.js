import constants from '../Constants';

const initialState = null;
 
const DNSPass = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_DNS_PASS_FLAG_SUCCESS:
        return action.payload.response.body.data;
      case constants.FETCH_DNS_PASS_FLAG_ERROR:
        return state;
      default:
        return state;
    }
};
 
export default DNSPass;