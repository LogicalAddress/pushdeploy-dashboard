
import constants from '../Constants';

let initialState = {
  template: 'nodejs',
  template_variation: 'v8.9.3',
  root_pass: '',
  app_repository: '',
  provider: 'linode',
  distribution: "ami-0def3275",
  datacenter: "10",
  type: "nanode1024.5",
};

const initialAction = { type: 'initial state'}

const LinodeSetupDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_LINODE_SETUP_DRAFT:
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export default LinodeSetupDraft;