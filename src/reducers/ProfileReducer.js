import constants from '../Constants';

const initialState = {
  currency: 'USD',
  primaryPlan: '',
  secondaryPlan: ''
};
 
const profile = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_PROFILE_SUCCESS:
        return {...state, ...action.payload.response.body.data }
      case constants.FETCH_PROFILE_ERROR:
        return state;
      case constants.UPDATE_PROFILE_SUCCESS:
        return {...state, ...action.payload.response.body.data }
      case constants.UPDATE_PROFILE_ERROR:
        return state;
      case constants.UPDATE_PLAN:
        return {...state, ...action.payload}
      default:
        return state;
    }
}
 
export default profile;