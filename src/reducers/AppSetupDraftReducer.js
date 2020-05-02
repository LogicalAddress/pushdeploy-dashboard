import {error} from '../utils/toastr.js'
import constants from '../Constants';

let initialState = {
  template: 'nodejs',
  template_variation: '8.9.3',
  app_repository: '',
  repo_meta_data: '',
  app_name: '',
  entry_point: 'index.js',
  server: null,
  repo_id: '',
  repo_node_id: '',
  repo_full_name: '',
  repo_name: ''
};

/* For CREATE_APP_RUNNING usecase, see /react/src/reducers/ServersReducer.js */

const initialAction = { type: 'initial state'}

const AppSetupDraft = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
      
    case constants.UPDATE_APP_SETUP_DRAFT:
      return {...state, ...action.payload}
    case constants.CREATE_APP_ERROR:
      error('Oopse!', "Unable to create app");
      return state;
    default:
      return state;
  }
}

export default AppSetupDraft;