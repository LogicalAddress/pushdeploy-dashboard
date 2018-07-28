import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
var Link = require('react-router-dom').Link;
import AppLogs from './AppLogs';
import req from '../api/req.js';
import UpdateEnvAction from '../actions/UpdateEnvAction';
import {error, success} from '../utils/toastr';
import {updateActiveApp} from '../actions/Common';
import AppSetupAction from '../actions/AppSetup';

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
    
    handleChange(event) {
        this.props.updateActiveApp({ app_shell_script: event.target.value });
    }
    
    deploy(){
        this.setState({isDeploying: true});
        req.post('/v1/app/deploy', {app_id: this.props.activeApp._id})
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
        this.props.updateEnv( {app_id: this.props.activeApp._id, app_shell_script: this.props.activeApp.app_shell_script});
    }
    
    canAutoDeploy(){
        var git_provider = this.props.activeApp.app_repository.indexOf("github.com") >-1 ? 'github' : 'bitbucket';
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
        this.props.updateActiveApp({ auto_deploy: !this.props.activeApp.auto_deploy });
        this.props.toggleAutoDeploy(this.props.activeApp);
    }
    
    enableSSL(){
        success("Notification", "Activating SSL");
        this.setState({enablingSSL: true});
        req.post('/v1/app/toggle_ssl', {app_id: this.props.activeApp._id})
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
                    <span className="horizontal-space">{this.props.activeServer.server_name}</span>
                    <span className="horizontal-space">{this.props.activeServer.state}</span>
                    <span className="horizontal-space">{this.props.activeServer.ipv4}</span>
                    <span className="horizontal-space">{this.props.activeApp.app_name}</span>
                    <span className="horizontal-space">{this.props.activeApp.state}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/server/" + this.props.activeServer._id}>Apps</Link></li>
                        <li><Link to={"#"}>Env</Link></li>
                        <li><Link to={"#"}>SSL</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                    <div className="white panel">
                        <div className="row">
                            <div className="column">
                               <h3>Deployment</h3>
                            </div>
                            <div className="column">
                                <button disabled={this.state.isDeploying} className="right button" onClick={ ()=> { this.deploy() }}>{ this.state.isDeploying ? "Deploying" : "Deploy Now" }</button>
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
                               Auto Deploy <button disabled={this.state.isDeploying || !this.canAutoDeploy()} className="button" onClick={()=> this.activateAutoDeploy() }>{ this.props.activeApp.auto_deploy ? 'Yes' : 'No'}</button>
                            </div>
                            <div className="column">
                                <AppLogs app={this.props.activeApp}/>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                    
                    <div className="white panel">
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
                               <textarea id="app_shell_script" name="app_shell_script" value={ this.props.activeApp.app_shell_script } onChange={this.handleChange}></textarea>
                                <div className="row">
                                    <div className="column">
                                        <button disabled={this.state.isDeploying} className="button">Save</button>
                                    </div>
                                </div>
                               </form>
                            </div>
                        </div>
                    </div>
                    
                    <div className="white panel">
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
                               SSL Activated <button disabled={this.state.enablingSSL || this.props.activeApp.app_name === 'default'} className="button" onClick={()=> this.enableSSL() }>{ this.props.activeApp.ssl_enabled ? 'Yes' : 'No'}</button>
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
  servers: PropTypes.array,
  credentials: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => (
      {
        updateEnv: (app) => dispatch(UpdateEnvAction.updateEnv(app)),
        updateActiveApp: (app) => dispatch(updateActiveApp(app)),
        toggleAutoDeploy: (app) => dispatch(AppSetupAction.toggleAutoDeploy(app))
      }
    );

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.servers,
        credentials: storeState.credentials,
        activeApp: storeState.activeApp,
        activeServer: storeState.activeServer
    }
)

export default connect(mapStoreToProps, mapDispatchToProps)(App)