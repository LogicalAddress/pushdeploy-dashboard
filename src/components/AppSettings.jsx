import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {isWorking, isDoneWorking } from '../actions/Common';
import AppsAction from '../actions/AppsAction'
var Link = require('react-router-dom').Link;

class AppSettings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            app: null,
        };
        this.deleteApp = this.deleteApp.bind(this);
     }
     
    componentDidMount(){
        this.props.getApp(this.props.match.params.id);
        this.setState({app: this.props.match.params.id});
     }
    
     deleteApp() {
        let response = window.confirm("Are you sure you want to delete this app from your server and on pushdeploy?");
        if (response === true) {
            this.props.deleteApp(this.state.app);
        }
    }
    
    render() {

      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{this.props.app.server.server_name}</span>
                    <span className="horizontal-space">{this.props.app.server.state}</span>
                    <span className="horizontal-space">{this.props.app.server.ipv4}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        {/* <li><Link to={"/server/" + this.props.app.server._id}>{this.props.app.server.server_name ? this.props.app.server.server_name : ''}</Link></li> */}
                        <li><Link to={"/apps/" + this.props.app._id}>{this.props.app.app_name }</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                    <div className="column">
                        <div className="white panel">
                            <h3>DELETE {this.props.app.app_name }</h3>
                            <p className="lead">This is a dangerous operation! This will app from pushdeploy and also from your cloud server. Your database will be left intact.</p>
                            <form>
                                <fieldset>
                                    <div className="row">
                                        <div className="column">
                                          <a className="button" onClick={this.deleteApp}>Delete { this.props.app.app_name } on pushdpeloy</a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      );
   }
}

AppSettings.propTypes = {
  app: PropTypes.object,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        // credentials: storeState.credentials,
        app: storeState.app,
    }
);

const mapDispatchToProps = (dispatch) => ({
  deleteApp: (app) => dispatch(AppsAction.deleteApp(app)),
  getApp: (params) => dispatch(AppsAction.getApp(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(AppSettings)