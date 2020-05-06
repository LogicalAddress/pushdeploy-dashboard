import React from 'react';
import io from "socket.io-client";
import constants from '../Constants';
import req from '../api/req';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {error, success} from '../utils/toastr.js'
import { isWorking, isDoneWorking } from '../actions/Common';
import ServersAction from '../actions/ServersAction';
import AppsAction from '../actions/AppsAction';
import DatabaseAction from '../actions/DatabaseAction';

class Socket extends React.Component {

  constructor(props){
    super(props);
    this.state = { };

    this.socket = io.connect(constants.API_URL, {
        query: {
          token: req.getJwt(),
          uid: req.getUid(),
        }
    });
  }

  componentDidMount() {

    this.socket.on('connected', (data) => {
        console.log(data);
    });

    this.socket.on('CREATE_SERVER_SUCCESS', (data) => { //TODO: never fires. dot io problems
      this.props.fetchServers(false);
      this.props.fetchApps(false);
      success('Notification', `Provisioning your server ${data.server_name} was successful`);
      return;
    });

    this.socket.on('CREATE_SERVER_READY', (data) => {
      success("Notification", `Your server ${data.server_name} is ready`);
      this.props.fetchServers(false);
      this.props.fetchApps(false);
      return;
    });

    this.socket.on('CREATE_SERVER_FAILED', (data) => {
      this.props.fetchServers(false);
      error("Notification", `Provisioning your server ${data.server_name} failed`);
      return;
    });

    this.socket.on('CREATE_APP_SUCCESS', (data) => { //TODO: never fires. dot io problems
      this.props.fetchServers(false);
      this.props.fetchApps(false);
      this.props.getApp(data._id, false);
      success('Notification', `Your app ${data.app_name} was successfully deployed`);
      return;
    });

    this.socket.on('CREATE_APP_READY', (data) => {
      // if(data.app_name === 'default') return;
      success("Notification", `${data.app_name} is ready`);
      this.props.fetchServer(data.server._id, false);
      this.props.fetchApps(false);
      this.props.getApp(data._id, false);
      return;
    });

    this.socket.on('CREATE_APP_FAILED', (data) => {
      this.props.fetchServers(false); //TODO:
      this.props.fetchServer(data.server._id || data.server, false);
      this.props.getApp(data._id, false);
      error("Create App", `Deploying your app ${data.app_name} failed, please try again`);
      return;
    });

    this.socket.on('CREATE_DATABASE_READY', (data) => {
      success("Notification", `Your database ${data.db_name} is ready`);
      this.props.fetchDatabase(data.server._id || data.server, false);
      return;
    });

    this.socket.on('TOGGLE_SSL_READY', (data) => {
      success("Notification", `${data.app_name} is now secure with Letsencrypt`);
      this.props.getApp(data._id, false);
      return;
    });

    this.socket.on('DEPLOY_APP_READY', (data) => {
      success("Notification", `Your app ${data.app_name} is up-to-date`);
      return;
    });

  }


  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
      return (
        <div>
         
        </div>
      );
  }
}

Socket.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
    fetchServers: PropTypes.func.isRequired,
  };
  
  const mapStoreToProps = (storeState) => (
      {

      }
  );
  
  const mapDispatchToProps = (dispatch) => ({
    isWorking: ()=> dispatch(isWorking()),
    isDoneWorking: ()=> dispatch(isDoneWorking()),
    fetchServers: (blocking) => dispatch(ServersAction.fetchServers(blocking)),
    fetchServer: (params, blocking) => dispatch(ServersAction.fetchServer(params, blocking)),
    fetchDatabase: (params, blocking) => dispatch(DatabaseAction.fetchDatbases(params, blocking)),
    getApp: (params, blocking) => dispatch(AppsAction.getApp(params, blocking)),
    fetchApps: (blocking) => dispatch(AppsAction.fetchApps(blocking)),
  });
  
  export default connect(mapStoreToProps, mapDispatchToProps)(Socket)