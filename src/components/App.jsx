import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppLogs from './AppLogs';
import DeployLogs from './DeployLogs';
import req from '../api/req.js';
import UpdateEnvAction from '../actions/UpdateEnvAction';
import {error, success} from '../utils/toastr';
import AppSetupAction from '../actions/AppSetup';
import AppsAction from '../actions/AppsAction';
var Link = require('react-router-dom').Link;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeploying: false,
            enablingSSL: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleAppShellSubmit = this.handleAppShellSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getApp(this.props.match.params.id);
    }
    
    handleChange(event) {
        this.props.updateAppField({ app_shell_script: event.target.value });
    }
    
    deploy(){
        this.setState({isDeploying: true});
        req.post('/v1/app/deploy', {app_id: this.props.app._id})
        .then((response) => {
          return response.json();
        }).then((response) => {
          this.setState({isDeploying: false});
          if (response.body.status === "success") {
              success("Notification", "Deploy Successful");
              return;
          }
          error('Notification', "Unable deploy this app");
          console.log("DEBUG", response);
        }).catch((err) => {
            this.setState({isDeploying: false});
            error('Notification', err.message);
        });
    }
    
    handleAppShellSubmit(event) {
        event.preventDefault();
        this.props.updateEnv( {app_id: this.props.app._id, app_shell_script: this.props.app.app_shell_script});
    }
    
    canAutoDeploy(){
        var git_provider = this.props.app.app_repository.indexOf("github.com") >-1 ? 'github' : 'bitbucket';
        if(git_provider === "github" && this.props.credentials.github_username){
            console.log("it's a github app, canAutoDeploy Yes");
            return true;
        }else if(git_provider ==="bitbucket" && this.props.credentials.bitbucket_username){
            console.log("it's a bitbucket app, canAutoDeploy Yes");
            return true;
        }
        console.log("can't auto deploy this app");
        return false;
    }
    
    activateAutoDeploy(){
        this.props.toggleAutoDeploy(this.props.app);
    }
    
    enableSSL(){
        success("Notification", "Activating SSL");
        this.setState({enablingSSL: true});
        req.post('/v1/app/toggle_ssl', {app_id: this.props.app._id})
        .then((response) => {
          return response.json();
        }).then((response) => {
          this.setState({enablingSSL: false});
          if (response.body.status === "success") {
              success("Notification", "Enabling SSL Done");
              return;
          }
          error('Notification', "Unable to activate SSL for this app");
          console.log("DEBUG", response);
        }).catch((err) => {
            this.setState({enablingSSL: false});
            error('Notification', err.message);
        });
    }
    
    componentDidCatch(error, info) {
        window.location = "/dashboard";
    }

    render() {
      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{this.props.app.server.server_name}</span>
                    <span className="horizontal-space">{this.props.app.server.state}</span>
                    <span className="horizontal-space">{this.props.app.server.ipv4}</span>
                    <span className="horizontal-space">{this.props.app.app_name}</span>
                    <span className="horizontal-space">{this.props.app.state}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/server/" + this.props.app.server._id}>Apps</Link></li>
                        <li><Link to={"#env"}>Env</Link></li>
                        <li><Link to={"#ssl"}>SSL</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                    <div className="white panel">
                        <div className="row">
                            <div className="column">
                               <h3>Deployment</h3>
                            </div>
                            <div className="column">
                                <button disabled={(this.state.isDeploying || this.state.enablingSSL || this.props.app.lock) ? "disabled" : ""} className="right button" onClick={ ()=> { this.deploy() }}>{ this.state.isDeploying ? "Deploying" : "Deploy Now" }</button>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="row">
                            <div className="lead">
                            Auto deploy allows you to easily deploy your projects when you push to source control. When you push to your master branch, PushDeploy will pull your latest code from source control, install relavant dependencies, and start or restart the server.
                            </div>
                        </div>
                        <div className="row upspace">
                            <div className="column">
                               Auto Deploy <button disabled={this.state.isDeploying || this.state.enablingSSL || !this.canAutoDeploy() || this.props.app.lock} className="button" onClick={()=> this.activateAutoDeploy() }>{ this.props.app.auto_deploy ? 'Yes' : 'No'}</button>
                            </div>
                            <div className="column column-60">
                                <div className="row">
                                    <div className="column">
                                        <DeployLogs app={this.props.app}/>
                                    </div>
                                    <div className="column">
                                        <AppLogs app={this.props.app}/>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    
                    <div className="white panel" id="env">
                        <div className="row">
                            <div className="column">
                               <h3>Environment Variables</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="lead">
                            ENVIRONMENT_VARIABLE=VALUE notation each per line. The environment variables typed in here will be exported to your running program.
                            </div>
                        </div>
                        <div className="row upspace">
                            <div className="column">
                               <form onSubmit={this.handleAppShellSubmit}>
                               <label htmlFor="app_shell_script">Export:</label>
                               <textarea id="app_shell_script" name="app_shell_script" value={ this.props.app.app_shell_script } onChange={this.handleChange}></textarea>
                                <div className="row">
                                    <div className="column">
                                        <button disabled={this.state.isDeploying || this.state.enablingSSL || this.props.app.lock} className="button">Save</button>
                                    </div>
                                </div>
                               </form>
                            </div>
                        </div>
                    </div>
                    
                    <div className="white panel" id="ssl">
                        <div className="row">
                            <div className="column">
                               <h3>Let’s Encrypt Certificate</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="lead">
                                Secure your site with Let’s Encrypt. It is a free, automated, and open Certificate Authority brought to you by the non-profit Internet Security Research Group (ISRG). 
                            </div>
                        </div>
                        <div className="row upspace">
                            <div className="column">
                               SSL Activated <button disabled={this.props.app.ssl_enabled || this.state.enablingSSL || this.state.isDeploying  || this.props.app.app_name === 'default' || this.props.app.lock} className="button" onClick={()=> this.enableSSL() }>{ this.props.app.ssl_enabled ? 'Yes' : 'No'}</button>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
         </div>
      )
   }
}

App.propTypes = {
  app: PropTypes.object,
  credentials: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => (
      {
        updateEnv: (app) => dispatch(UpdateEnvAction.updateEnv(app)),
        getApp: (params) => dispatch(AppsAction.getApp(params)),
        toggleAutoDeploy: (app) => dispatch(AppSetupAction.toggleAutoDeploy(app)),
        updateAppField: (params) => dispatch(AppsAction.updateAppField(params)),
      }
    );

const mapStoreToProps = (storeState) => (
    {
        credentials: storeState.credentials,
        app: storeState.app,
    }
)

export default connect(mapStoreToProps, mapDispatchToProps)(App)