import constants from '../Constants';

const initialState = {
  currency: 'USD',
  primaryPlan: '',
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
      case constants.REGISTER_USER_SUCCESS:
        return {...state, ...action.payload.response.body.data};
      case constants.LOGIN_USER_SUCCESS:
        return {...state, ...action.payload.response.body.data};
      case constants.SET_LOGGEDIN_USER:
         var localUser = sessionStorage.getItem('user');
        localUser = (localUser ? JSON.parse(localUser) : {});
        return {...state, ...localUser};
      default:
        return state;
    }
}
 
export default profile;