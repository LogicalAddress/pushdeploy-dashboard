import Constants from '../Constants.js';

let AwsSetupAction = {
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_AWS_SETUP_DRAFT, payload})
    }
  },
};

export default AwsSetupAction;