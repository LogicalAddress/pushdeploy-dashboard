import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants';
import ProfileAPI from '../api/ProfileAPI';

let ProfileAction = {
    
  fetchProfile() {
    return (dispatch) => {
      dispatchAsync(ProfileAPI.fetchProfile, dispatch, {
        request: constants.FETCH_PROFILE,
        success: constants.FETCH_PROFILE_SUCCESS,
        failure: constants.FETCH_PROFILE_ERROR
      });
    }
  },

  updateProfile(profile, profileDraft) {
    return (dispatch) => {
      dispatchAsync(ProfileAPI.updateProfile, dispatch, {
        request: constants.UPDATE_PROFILE,
        success: constants.UPDATE_PROFILE_SUCCESS,
        failure: constants.UPDATE_PROFILE_ERROR
      }, { profile, profileDraft });
    }
  },
  
  updateProfileDraft(field, value){
    return (dispatch) => {
      dispatch({
        type: constants.UPDATE_PROFILE_DRAFT,
        payload: {field, value}
      })
    };
  }
};

export default ProfileAction;
