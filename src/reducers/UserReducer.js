import constants from '../Constants';
import {error, success} from '../utils/toastr.js';

const initialState = {
  name: '',
  email: '',
  password: '',
  mobileNumber: '',
  primaryPlan: '',
};
 
const user = (state = initialState, action) => {
    switch (action.type) {
      case constants.SET_LOGGEDIN_USER:
        var localUser = sessionStorage.getItem('user');
        localUser = (localUser ? JSON.parse(localUser) : {});
        let updatedUser = Object.assign({}, state, localUser, action.payload);
        // console.log({updatedUser});
        return updatedUser;
        // return {...state, ...localUser, {}};
      case constants.LOGIN_USER_SUCCESS:
        success("Notification", "Login Successful");
        var remoteUser = Object.assign(action.payload.response.body.data, 
        {timestamp: new Date()});
        // console.log("Setting", JSON.stringify(remoteUser));
        sessionStorage.setItem('user', 
        JSON.stringify(remoteUser));
        window.location = "/";
        return {...state, ...remoteUser};
      case constants.REGISTER_USER_SUCCESS:
        success("Notification", "Registration Successful");
        sessionStorage.setItem('user', 
        JSON.stringify(Object.assign(action.payload.response.body.data, 
        {timestamp: new Date()})));
        window.location = "/";
        return {...state, ...action.payload.response.body.data};
      case constants.LOGIN_USER_ERROR:
        error('Oopse!', action.payload.error || "Please check your input and try again");
        return state;
      case constants.REGISTER_USER_ERROR:
        error('Oopse!', action.payload.error || "Please check your input and try again");
        return state;
      default:
        return state;
    }
};
 
export default user;