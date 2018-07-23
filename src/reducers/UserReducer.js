import constants from '../Constants';

const initialState = {};
 
const user = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_USER_SUCCESS:
        return {...state, ...action.payload.response.body.data}
      case constants.FETCH_USER_ERROR:
        return state
      default:
        return state;
    }
}
 
export default user;