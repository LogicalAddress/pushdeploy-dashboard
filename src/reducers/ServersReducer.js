import constants from '../Constants';
import {error, success} from '../utils/toastr.js'

const initialState = [];

const appendApp = (state, payload) => {
  let servers = state;
    for (var i = 0; i < servers.length; i++) {
      if(servers[i]._id !== payload.server) continue;
      servers[i].apps.push({
        "_id": payload._id,
        "uid": payload.uid,
        "app_name": payload.app_name,
        "template": payload.template,
        "port": payload.port,
        "auto_deploy": payload.auto_deploy,
        "repo_meta_data": payload.repo_meta_data,
        "app_shell_script": payload.app_shell_script,
        "template_variation": payload.template_variation,
        "server": servers[i],
        "state": payload.state,
        "created_at": payload.created_at,
        "updated_at": payload.updated_at,
        "enabled": payload.enabled,
        "app_repository": payload.app_repository
      });
      break;
    }
    return servers;
};

const replaceApp = (state, payload) => {
  console.log("remote data", payload)
  let servers = state;
    for (var i = 0; i < servers.length; i++) {
      if(servers[i]._id === payload.server._id){
        for(var j = 0; j < servers[i].apps.length; j++){
          if(servers[i].apps[j]._id !== payload._id) continue;
          console.log("Found What to Replace", servers[i].apps[j], payload)
          servers[i].apps[j] = payload;
          servers[i].apps[j].server = payload.server._id;
          break;
        }
      }
    }
    return servers;
};
 
const servers = (state = initialState, action) => {
    switch (action.type) {
      case constants.FETCH_SERVERS_SUCCESS:
        return action.payload.response.body.data
      case constants.FETCH_SERVERS_ERROR:
        return state
      case constants.CREATE_APP_RUNNING:
        console.log(action.payload.response);
        success('Relax!', "Your app is being setup");
        return appendApp(state, action.payload.response.body.data);
      case constants.UPDATE_ENV_SUCCESS:
        success('Notification', "Your app has been updated, deploy");
        return replaceApp(state, action.payload.response.body.data);
      case constants.TOGGLE_AUTO_DEPLOY_SUCCESS:
        success('Notification', "Toggling Auto Deploy Successful");
        return replaceApp(state, action.payload.response.body.data);
      case constants.UPDATE_ENV_ERROR:
        error('Oopse!', "Error updating the app's environment");
        return state
      case constants.CREATE_SERVER_RUNNING:
        console.log("CREATE_SERVER_RUNNING",action.payload.response);
        var remote = action.payload.response.body.data;
        success('Relax!', "Your server is being setup");
        return [...state, {
            "_id": remote.data._id,
            "uid": remote.data.uid,
            "superuser": remote.data.superuser,
            "server_name": remote.data.server_name,
            "provider": remote.data.provider,
            "apps": remote.data.apps,
            "public_key": remote.data.public_key || null,
            "private_key": remote.data.private_key || null,
            "root_passwd": remote.data.root_passwd || null,
            "instanceId": remote.data.instanceId || null,
            "meta": remote.data.meta || null,
            "cargoshell_version": remote.data.cargoshell_version,
            "enabled": remote.data.enabled,
            "_app_counter": remote.data._app_counter,
            "ipv4": remote.data.ipv4 || "LOADING",
            "state": remote.data.state || "LOADING",
            "ipv6": null,
            "created_at": remote.data.created_at,
            "updated_at": remote.data.updated_at
          }]
      case constants.CREATE_SERVER_ERROR:
        console.log("CREATE_SERVER_ERROR", action.payload.response);
        error('Oopse!', "Error setting up the server");
        return state
      default:
        return state;
    }
};
 
export default servers;
