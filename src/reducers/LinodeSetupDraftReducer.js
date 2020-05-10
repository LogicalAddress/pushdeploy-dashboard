import constants from '../Constants';

let initialState = {
  template: 'nodejs',
  template_variation: 'v8.9.3',
  app_repository: 'git@github.com:LogicalAddress/pushdeploy-nodejs-example.git',
  provider: 'linode',
  image: "linode/ubuntu16.04lts",
  region: "us-west",
  type: "g6-nanode-1",
};

const initialAction = { type: 'initial state'}

const LinodeSetupDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_LINODE_SETUP_DRAFT:
      state = Object.assign({}, state, action.payload);
      console.log(state);
      return state;
    default:
      return state;
  }
}

export default LinodeSetupDraft;