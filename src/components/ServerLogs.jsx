import React from 'react';
import Popup from "reactjs-popup";
var Link = require('react-router-dom').Link;
import req from '../api/req.js';
import {error} from '../utils/toastr';

class ServerLogs extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        logs: "",
        loading: true,
    };
  }
  
  getLogs(server_id){
    console.log("getLogs running");
    this.setState({loading: true});
    req.post('/v1/server/logs', {server_id})
      .then((response) => {
          return response.json();
      }).then((response) => {
          this.setState({loading: false});
          if (response.body.status === "success") {
              this.setState({logs: response.body.data});
              return;
          }
          error("Damn!", "Unable to retrieve log, hit the reload button");
          console.log("DEBUG", response);
      }).catch((err) => {
          error("Damn!", err.message);
      });
  }

  componentDidMount(){
    if(typeof io !== "undefined"){
      io.socket.on("SERVER_LOG_READY", function (rmessage) { /* global io*/
        if(this.props.server._id === rmessage.data.server._id){
          this.setState({loading: false, logs: rmessage.data.log});
        }else{
          console.log("We are not expecting this event, ignore");
        }
      });
    }else{
      console.log("sails/socket.io not available in dev mode");
    }
  }

  render() {
    return (
      <Popup onOpen={() => this.getLogs(this.props.server._id)} trigger={<Link to="#" onClick={(e) => { e.preventDefault()}}> View Server Log</Link>} modal>
      {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> Server Logs </div>
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
                  console.log("clicked");
                  this.getLogs(this.props.server._id)
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

export default ServerLogs;