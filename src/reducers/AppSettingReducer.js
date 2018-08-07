import constants from '../Constants';
 
const initialState = {
  stripeKey: "pk_test_U5qVNRp0u0u1VxqnptEbz9WK",
  paystackKey: "pk_test_8eb0c568b925399e7192843b4c8a20bbb80a9295"
};
 
const app_setting = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_APP_SETTING_SUCCESS:
        return action.payload.response;
      case constants.FETCH_APP_SETTING_ERROR:
        return Object.assign({}, state, {error: action.payload.error});
      default:
        return state;
    }
}
 
export default app_setting;