
import constants from '../Constants';
import update from 'react-addons-update';

let initialState = {
  currency: 'USD',
  primaryPlan: '',
  secondaryPlan: ''
};

const initialAction = { type: 'initial state'}

const ProfileDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_PROFILE_DRAFT:
      return update(state, {
        [action.payload.field]: {
            $set: action.payload.value
        }});

    default:
      return state;
  }
}

export default ProfileDraft;