import Constants from '../Constants.js';

let CustomSetupAction = {

  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_CUSTOM_SETUP_DRAFT, payload})
    }
  },
};

export default CustomSetupAction;