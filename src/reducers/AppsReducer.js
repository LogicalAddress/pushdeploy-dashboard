import constants from '../Constants';

const initialState = [];
 
const apps = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_APPS_SUCCESS:
        return action.payload.response.body.data;
      case constants.FETCH_APPS_ERROR:
        return state
      case constants.CREATE_APP_RUNNING:
        return [...state, action.payload.response.data];
      default:
        return state;
    }
};
 
export default apps;
