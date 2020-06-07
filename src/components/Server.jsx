import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppTable from './AppTable.jsx';
import AppSetupAction from '../actions/AppSetup';
import {error, success} from '../utils/toastr';
import {isWorking, isDoneWorking, changeRoute } from '../actions/Common';
import req from '../api/req.js';
import ServerLogs from './ServerLogs';
import ServersAction from '../actions/ServersAction';
var Link = require('react-router-dom').Link;

class Server extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            template: 'empty',
            template_variation: '',
            app_repository: '',
            repo_meta_data: '',
            app_name: '',
            entry_point: 'index.js',
            server: null,
            repo_id: '',
            repo_node_id: '',
            repo_full_name: '',
            repo_name: '',
            currentVariations: [
                {
                    name: 'Select…',
                    value: null,
                }
            ],
        };
        
        this.createApp = this.createApp.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
     }

     selectTemplate = (e) => {
        this.setState({template: e.target.value, template_variation: ''});
        this.setState({currentVariations: this.getVariation(e.target.value)});
    }

     getVariation(key){
         let laravel = [
            {
                name: 'Select…',
                value: '',
            },
            {
                name: 'PHP 5.6',
                value: 'php5.6',
            },
            {
                name: 'PHP 7.0',
                value: 'php7.0',
            },
            {
                name: 'PHP 7.1',
                value: 'php7.1',
            },
            {
                name: 'PHP 7.2',
                value: 'php7.2',
            },
            {
                name: 'PHP 7.3',
                value: 'php7.3',
            },
            {
                name: 'PHP 7.4',
                value: 'php7.4',
            },
          ];
          let nodejs = [
            {
                name: 'Select…',
                value: null,
            },
            {
                name: 'v8.17.0',
                value: '8.17.0',
            },
            {
                name: 'v9.11.2',
                value: '9.11.2',
            },
            {
                name: 'v10.21.0',
                value: '10.21.0',
            },
            {
                name: 'v11.15.0',
                value: '11.15.0',
            },
            {
                name: 'v12.18.0',
                value: '12.18.0',
            },
            {
                name: 'v13.14.0',
                value: '13.14.0',
            },
            {
                name: 'v14.4.0',
                value: '14.4.0',
            },
          ];
          let templates = {
              laravel: laravel,
              nodejs: nodejs,
              empty: [],
          }
          return templates[key];
     }
  
    componentDidMount() {
        this.props.fetchServer(this.props.match.params.id);
        this.setState({server: this.props.match.params.id});
        this.setState({currentVariations: this.getVariation('nodejs')});
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
                    if(!repoData.hasRead && this.state.app_repository.indexOf("github.com") > -1 && 
                      !this.props.credentials.github_username){
                      error('Gosh', 'You have not connected github to your account yet');
                      return;
                    }
                    if(!repoData.hasRead && this.state.app_repository.indexOf("bitbucket.org") > -1 && 
                        !this.props.credentials.bitbucket_username){
                      error('Gosh', 'You have not connected bitbucket to your account yet');
                      return;
                    }
                    if(!repoData.hasRead){
                        error('Gosh', 'You don\'t have the read permission to this repo');
                        return;
                    }
                    if(!repoData.isPublic && (this.props.profile.primaryPlan === null || this.props.profile.primaryPlan.length === 0)){
                        if(this.props.profile.tryFree){
                          error('Requirements', 'Please select a paid plan to continue');
                          this.props.changeRoute('/account/plans');
                          return;
                        }
                    }
                    success('Notification', 'Still working..');
                    this.setState({repo_meta_data: repoData});
                    this.setState({repo_id: repoData.repo_id});
                    this.setState({repo_node_id: repoData.repo_node_id});
                    this.setState({repo_full_name: repoData.repo_full_name});
                    this.setState({repo_name: repoData.repo_name});
                    this.setState({clone_url: repoData.clone_url});
                    this.props.createApp(this.state);
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
    
    createApp(e) {
        e.preventDefault();
        
        if(!this.state.app_name.length){
          return error('Gosh', 'Your domain is required');
        }
        
        if (!(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(this.state.app_name))){
              return error('Gosh', 'Not a valid domain name');
        }
        
        if(this.state.app_repository.length === 0){
          return error('Gosh', 'A git repo is required');
        }
        
        if(this.state.app_repository.indexOf("github.com") < 0 && 
          this.state.app_repository.indexOf("bitbucket.org") < 0  ){
          return error('Oh Gosh', 'Only github and bitbucket are supported at the moment');
        }
        
        var git_provider = this.state.app_repository.indexOf("github.com") >-1 ? 'github' : 'bitbucket';
        this.remoteAppValidation(this.state, git_provider);
    }
    
    render() {  
      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{this.props.server.server_name}</span>
                    <span className="horizontal-space">{this.props.server.state}</span>
                    <span className="horizontal-space">{this.props.server.ipv4}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/databases/" + this.props.server._id}>Database</Link></li>
                        <li><Link to={"/settings/" + this.props.server._id}>Settings</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                { !this.props.server.lock && <div className="white panel">
                        <h3>Deploy App</h3>
                        <form>
                            <fieldset>
                                <label htmlFor="nameField">Root Domain</label>
                                <input value={this.state.app_name} onChange={(e) => this.setState({app_name: e.target.value})} placeholder="e.g domain.com" id="nameField" type="text"/>
                                <div className="row">
                                  <div className="column column-50">
                                      <label htmlFor="template">Framework</label>
                                      <select id="template" name="template" value={this.state.template} onChange={this.selectTemplate}>
                                          <option value="empty">Select…</option>
                                          <option value="nodejs">NodeJS</option>
                                          <option value="laravel">Laravel</option>
                                      </select>
                                  </div>
                                  <div className="column column-50">
                                      <label htmlFor="template_variation">Version</label>
                                      <select id="template_variation" name="template_variation" value={this.state.template_variation} onChange={(e) => this.setState({template_variation: e.target.value})}>
                                            {this.state.currentVariations.map(item => (
                                                <option key={item.value} value={item.value}>{item.name}</option>
                                            ))}
                                      </select>
                                  </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="app_repository">Git Repository</label>
                                  <input placeholder="e.g git@github.com:LogicalAddress/pushdeploy-nodejs-example.git" id="app_repository" type="text" value={this.state.app_repository} onChange={(e) => this.setState({app_repository: e.target.value})}/>
                                </div>
                                { this.props.credentials.github_username && <p className="lead">Your pushdeploy account is connected to github, feel free to deploy your private repositories.</p>}
                                <div className="row">
                                    <div className="column">
                                      <input type="submit" className="button" disabled={this.state.template_variation === '' || this.state.app_repository.trim().length === 0 || this.state.app_name.trim().length === 0} onClick={this.createApp} value="Add App"/>
                                    </div>
                                    <div className="column">
                                        <ServerLogs server={this.props.server}/>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </fieldset>
                        </form>
                    </div> }
                    <div className="white panel">
                        <h3>Active Apps</h3>
                        <AppTable apps={this.props.server.apps}/>
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
  server: PropTypes.object,
  credentials: PropTypes.object.isRequired,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
  profile: PropTypes.object.isRequired,
};

const mapStoreToProps = (storeState) => (
    {
        loading: storeState.loading.loading,
        servers: storeState.servers, 
        server: storeState.server,
        apps: storeState.apps,
        credentials: storeState.credentials,
        profile: storeState.profile,
    }
);

const mapDispatchToProps = (dispatch) => ({
  createApp: (params) => dispatch(AppSetupAction.createApp(params)),
  fetchServer: (params) => dispatch(ServersAction.fetchServer(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
  changeRoute: (route)=> dispatch(changeRoute(route)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Server)