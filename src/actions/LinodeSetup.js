import Constants from '../Constants.js';

let LinodeSetupAction = {
  
  updateDraft(payload) {
    return (dispatch) => {
      dispatch({ type: Constants.UPDATE_LINODE_SETUP_DRAFT, payload})
    }
  },
};

export default LinodeSetupAction;