import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {isWorking, isDoneWorking } from '../actions/Common';
import ServersAction from '../actions/ServersAction'
var Link = require('react-router-dom').Link;

class Settings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            server: null,
        };
        this.deleteServer = this.deleteServer.bind(this);
     }
     
    componentDidMount(){
        this.props.fetchServer(this.props.match.params.id);
        this.setState({server: this.props.match.params.id});
     }
    
    deleteServer() {
        let response = window.confirm("Are you sure you want to delete everything associated with this server and pushdeploy");
        if (response === true) {
            this.props.deleteServer(this.state.server);
        }
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
                        <li><Link to={"/server/" + this.props.server._id}>{this.props.server.server_name ? this.props.server.server_name : ''}</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                    <div className="column">
                        <div className="white panel">
                            <h3>DELETE SERVER</h3>
                            <p className="lead">Not quite dangerous! This will only dis-associate your physical servers and resources from pushdeploy. To fully delete the server, you will need to do that manually from your cloud provider.</p>
                            <form>
                                <fieldset>
                                    <div className="row">
                                        <div className="column">
                                          <a className="button" onClick={this.deleteServer}>Delete { this.props.server.server_name } on pushdpeloy</a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                    <div className="column">
                        <div className="white panel">
                            <h3>PRIVATE KEY</h3>
                            <p className="lead">Your server is completely under your control. The following is the private key you can use to ssh into your server</p>
                            <small>Write the following content and refer to it like this ssh -i file.pem pushdeploy@...</small>
                            <pre><code>
                            {this.props.credentials.custom_private_key}
                            </code></pre>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      );
   }
}

Settings.propTypes = {
  server: PropTypes.object,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        credentials: storeState.credentials,
        server: storeState.server,
    }
);

const mapDispatchToProps = (dispatch) => ({
  deleteServer: (server) => dispatch(ServersAction.deleteServer(server)),
  fetchServer: (params) => dispatch(ServersAction.fetchServer(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Settings)