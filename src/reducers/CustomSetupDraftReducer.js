
import constants from '../Constants';

let initialState = {
  template: 'nodejs',
  template_variation: 'v8.9.3',
  app_repository: '',
  ipv4: '',
  username: 'ubuntu',
  provider: 'custom',
  volumeSize: '20',
};

const initialAction = { type: 'initial state'}

const CustomSetupDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_CUSTOM_SETUP_DRAFT:
      return {...state, ...action.payload}
    default:
      return state;
  }
}

export default CustomSetupDraft;