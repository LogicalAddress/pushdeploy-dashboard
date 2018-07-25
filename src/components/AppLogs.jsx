import React from 'react';
import Popup from "reactjs-popup";
var Link = require('react-router-dom').Link;
import req from '../api/req.js';
import {error} from '../utils/toastr';

class AppLogs extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        logs: "",
        loading: true,
    };
  }
  
  getLogs(app_id){
    this.setState({loading: true});
    req.post('/v1/app/logs', {app_id})
      .then((response) => {
          return response.json();
      }).then((response) => {
          this.setState({loading: false});
          if (response.body.status === "success") {
              this.setState({logs: response.body.data});
              return;
          }
          error('Notification', "Unable to retrieve log, hit the reload button");
          console.log("DEBUG", response);
      }).catch((err) => {
          error('Notification', err.message);
      });
  }

  componentDidMount(){
    if(typeof io !== "undefined"){
      io.socket.on("APP_LOG_READY", function (rmessage) { /* global io*/
        if(this.props.app._id === rmessage.data.app._id){
          this.setState({loading: false, logs: rmessage.data.log});
        }else{
          console.log("We are not expecting this event");
        }
      });
    }else{
      console.log("sails/socket.io not available in dev mode");
    }
  }

  render() {
    return (
      <Popup onOpen={() => this.getLogs(this.props.app._id)} trigger={<h5><Link to="#" onClick={(e) => {e.preventDefault()}}>View Last Deployment Log</Link></h5>} modal>
      {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> Deploy Logs </div>
            {this.state.loading ? 
            <h1>Loading...</h1> :
  
            <div className="content">
              {" "}
              {this.state.logs}
            </div>
            }
            <div className="actions">
              <button
                className="button"
                disabled={this.state.loading}
                onClick={() => {
                  this.getLogs(this.props.app._id)
                }}>
                Reload
              </button>
              <button
                className="button button-clear"
                onClick={() => {
                  close()
                }}>
                close
              </button>
            </div>
          
          </div>
        )}
    </Popup>
    );
  }
}

export default AppLogs;