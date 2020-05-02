import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppTable from './AppTable.jsx';
import AppSetupAction from '../actions/AppSetup';
import {error, success} from '../utils/toastr';
import {isWorking, isDoneWorking } from '../actions/Common';
import req from '../api/req.js';
import ServerLogs from './ServerLogs';
import { setActiveServer } from '../actions/Common';
var Link = require('react-router-dom').Link;

class Server extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: ''
        };
        
        this.createApp = this.createApp.bind(this);
     }
  
    componentDidMount() {
        this.props.update({server: this.props.match.params.id});
        // this.componentDidUpdate();
    }
    
    componentDidUpdate(){// eslint-disable-next-line
        var {server, apps } = this.getDetails();
        if(server._id){
            this.props.setActiveServer(server);
        }
    }
    
    remoteAppValidation(payload, type){
        this.props.isWorking();
        payload = Object.assign(payload, {git_provider: type});
        req.post('/v1/app/validate', payload)
            .then((response) => {
                console.log("DEBUG", response);
                return response.json();
            }).then((response) => {
                this.props.isDoneWorking();
                if (response && response.body && response.body.status === "success") {
                    var repoData = response.body.data;
                    if(!repoData.hasRead && this.props.draft.app_repository.indexOf("github.com") > -1 && 
                      !this.props.credentials.github_username){
                      error('Gosh', 'You have not connected github to your account yet');
                      return;
                    }
                    if(!repoData.hasRead && this.props.draft.app_repository.indexOf("bitbucket.org") > -1 && 
                        !this.props.credentials.bitbucket_username){
                      error('Gosh', 'You have not connected bitbucket to your account yet');
                      return;
                    }
                    if(!repoData.hasRead){
                        error('Gosh', 'You don\'t have the read permission to this repo');
                        return;
                    }
                    success('Notification', 'Still working..');
                    this.props.update({repo_meta_data: repoData});
                    this.props.update({repo_id: repoData.repo_id});
                    this.props.update({repo_node_id: repoData.repo_node_id});
                    this.props.update({repo_full_name: repoData.repo_full_name});
                    this.props.update({repo_name: repoData.repo_name});
                    this.props.createApp(this.props.draft);
                    return;
                }
                error('Notification', "Something unexpected occured");
                console.log("DEBUG", response);
            }).catch((err) => {
                console.log(err);
                this.props.isDoneWorking();
                error('Notification', err.message);
            });
    }
    
    createApp() {
        
        if(!this.props.draft.app_name.length){
          return error('Gosh', 'Your domain is required');
        }
        
        if (!(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(this.props.draft.app_name))){
              return error('Gosh', 'Not a valid domain name');
        }
        
        if(this.props.draft.app_repository.length === 0){
          return error('Gosh', 'A git repo is required');
        }
        
        if(this.props.draft.app_repository.indexOf("github.com") < 0 && 
          this.props.draft.app_repository.indexOf("bitbucket.org") < 0  ){
          return error('Oh Gosh', 'Only github and bitbucket are supported at the moment');
        }
        
        var git_provider = this.props.draft.app_repository.indexOf("github.com") >-1 ? 'github' : 'bitbucket';
        this.remoteAppValidation(this.props.draft, git_provider);
    }
    
    getDetails(){
        var server = {}, apps = [];
        var servers = this.props.servers;
        for(var i = 0; i < servers.length; i++){
            if(servers[i]._id === this.props.match.params.id){
                server = servers[i];
                apps = servers[i].apps;
                break;
            }
        }
        return { server, apps}
    }
    
    render() {
    var {server, apps } = this.getDetails();
        
      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{server.server_name}</span>
                    <span className="horizontal-space">{server.state}</span>
                    <span className="horizontal-space">{server.ipv4}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/databases/" + server._id}>Database</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                { !this.props.lock && <div className="white panel">
                        <h3>Deploy App</h3>
                        <form>
                            <fieldset>
                                <label htmlFor="nameField">Root Domain</label>
                                <input value={this.props.draft.app_name} onChange={(e) => this.props.update({app_name: e.target.value})} placeholder="e.g domain.com" id="nameField" type="text"/>
                                <div className="row">
                                  <div className="column column-50">
                                      <label htmlFor="template">Template</label>
                                      <select id="template" name="template" value={this.props.draft.template} onChange={(e) => this.props.update({template: e.target.value})}>
                                          <option value="nodejs">NodeJS</option>
                                      </select>
                                  </div>
                                  <div className="column column-50">
                                      <label htmlFor="template_variation">Template Variation</label>
                                      <select id="template_variation" name="template_variation" value={this.props.draft.template_variation} onChange={(e) => this.props.update({template_variation: e.target.value})}>
                                          <option value="v8.9.3">v8.9.3</option>
                                      </select>
                                  </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="app_repository">Git Repository</label>
                                  <input placeholder="e.g git@github.com:dretnan/droauth.git" id="app_repository" type="text" value={this.props.draft.app_repository} onChange={(e) => this.props.update({app_repository: e.target.value})}/>
                                </div>
                                { this.props.credentials.github_username && <p className="lead">Your pushdeploy account is connected to github, feel free to deploy your private repositories.</p>}
                                <div className="row">
                                    <div className="column">
                                      <a className="button" onClick={this.createApp}>Add App</a>
                                    </div>
                                    <div className="column">
                                        <ServerLogs server={server}/>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </fieldset>
                        </form>
                    </div>}
                    <div className="white panel">
                        <h3>Active Apps</h3>
                        <AppTable apps={apps}/>
                    </div>
                </div>
            </div>
         </div>
      )
   }
}

Server.propTypes = {
  loading: PropTypes.bool,
  servers: PropTypes.array,
  apps: PropTypes.array,
  credentials: PropTypes.object.isRequired,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
  lock: PropTypes.bool.isRequired,
  appLock: PropTypes.bool.isRequired,
};

const mapStoreToProps = (storeState) => (
    {
        loading: storeState.loading.loading,
        servers: storeState.server.servers,
        apps: storeState.app.apps,
        appLock: storeState.app.lock,
        lock: storeState.server.lock,
        draft: storeState.appSetupDraft,
        credentials: storeState.credentials,
        
    }
);

const mapDispatchToProps = (dispatch) => ({
  createApp: (draft) => dispatch(AppSetupAction.createApp(draft)),
  update: (draft) => dispatch(AppSetupAction.updateDraft(draft)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
  setActiveServer: (server) => dispatch(setActiveServer(server)),

});

export default connect(mapStoreToProps, mapDispatchToProps)(Server)