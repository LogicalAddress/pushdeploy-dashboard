import React from 'react';
import io from "socket.io-client";
import constants from '../Constants';
import req from '../api/req';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {error, success} from '../utils/toastr.js'
// import AppSetupAction from '../actions/AppSetup';
// import AwsSetup from '../actions/AwsSetup';
// import CustomSetup from '../actions/CustomSetup';
import {isWorking, isDoneWorking/*, changeRoute, setActiveApp, 
updateActiveApp, setActiveServer, updateActiveServer*/} from '../actions/Common';
// import DatabaseAction from '../actions/DatabaseAction';
// import LinodeSetup from '../actions/LinodeSetup';
import ServersAction from '../actions/ServersAction';
// import UpdateEnvAction from '../actions/UpdateEnvAction';

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

    this.socket.on('CREATE_SERVER_SUCCESS', (data) => {
      this.props.fetchServers();
      this.props.createServerFinished();
      success("Create Server", "Your server was successfully provisioned");
      return;
    });

    this.socket.on('CREATE_SERVER_FAILED', (data) => {
      this.props.fetchServers();
      this.props.createServerFinished();
      error("Create Server", "Provisioning your server failed");
      return;
    });

    this.socket.on('CREATE_APP_SUCCESS', (data) => {
      this.props.fetchServers(); //TODO: below
      // this.props.fetchApps();
      // this.props.createAppFinished();
      success("Create App", "Your app was successfully deployed");
      return;
    });

    this.socket.on('CREATE_APP_FAILED', (data) => {
      this.props.fetchServers(); //TODO:
      // this.props.fetchApps();
      // this.props.createAppFinished();
      error("Create App", "Deploying your app failed, please try again");
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
    createServerFinished: PropTypes.func.isRequired
  };
  
  const mapStoreToProps = (storeState) => (
      {

      }
  );
  
  const mapDispatchToProps = (dispatch) => ({
    isWorking: ()=> dispatch(isWorking()),
    isDoneWorking: ()=> dispatch(isDoneWorking()),
    fetchServers: () => dispatch(ServersAction.fetchServers()),
    createServerFinished: () => dispatch(ServersAction.createServerFinished()),
    // setActiveServer: (server) => dispatch(setActiveServer(server)),
  });
  
  export default connect(mapStoreToProps, mapDispatchToProps)(Socket)