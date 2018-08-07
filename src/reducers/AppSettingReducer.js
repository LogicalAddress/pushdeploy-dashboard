import constants from '../Constants';
 
const initialState = {
  stripeKey: "",
  paystackKey: ""
};
 
const app_setting = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_APP_SETTING_SUCCESS:
        return action.payload.response.body.data;
      case constants.FETCH_APP_SETTING_ERROR:
        return Object.assign({}, state, {error: action.payload.error});
      default:
        return state;
    }
}
 
export default app_setting;