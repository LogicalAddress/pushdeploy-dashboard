import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
// import req from '../api/req.js';
import {error, success} from '../utils/toastr';
import {isWorking, isDoneWorking, changeRoute } from '../actions/Common';
import DNS from '../api/DNS'
import DNSAction from '../actions/DNSAction';
var Link = require('react-router-dom').Link;

class DNSZoneForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        domain: "",
        creating: false,
    };
    this.createDNSZone = this.createDNSZone.bind(this);
  }


  componentDidMount(){
    this.props.getDNSPassFlag();
  }
  
  componentWillReceiveProps(){
    this.props.getDNSPassFlag();
  }

  createDNSZone(e){
    e.preventDefault();
    this.props.isWorking();
    this.setState({creating: true});
    DNS.createDNSZone({
      name: this.state.domain,
      app: null
    }).then((response) => {
      return response.json();
    }).then((response) => {
      this.props.isDoneWorking();
      if (response.body && response.body.status === "success") {
          success("Notification", "Creating a root zone successful");
          this.props.getDNSPassFlag();
          this.props.reloadZones();
          this.props.changeRoute(`/dns/${response.body.data._id}`);
          return;
      }
      error('Notification', response.message || "Unable to create a root zone for the app");
      this.setState({creating: false});
      console.log("DEBUG", response);
    }).catch((err) => {
        this.props.isDoneWorking();
        error('Notification', err.message);
        this.setState({creating: false});
    });
  }

  render() {
    return (
      <Popup trigger={<h5><Link to="#" className="right button" onClick={(e) => {e.preventDefault()}}>Add Domain</Link></h5>} modal>
      {close => (
          <div className="modal" style={{background: 'url(/images/background.png)', fontSize: 'inherit'}}>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> DNS Zone </div>
            <div className="row" style={{marginTop: '20px'}}>
              <div className="column column-80" style={{margin: '0px auto'}}>
                  <div className="white panel" style={{marginBottom: '10px'}}>
                    { this.props.dnspass === true && <div className="form-group">
                        <p className="lead">If you wish to associate your app with domain. It's better to create this from the app's page.</p>
                        <label htmlFor="domain">Root Domain</label>
                        <input disabled={this.state.creating} autoComplete="off" placeholder="e.g pushdeploy.com" id="domain" type="text" value={this.state.domain} onChange={(e) => this.setState({domain: e.target.value})}/>
                    </div>}
                    { this.props.dnspass === false && <div>
                        <p className="lead">Upgrade to <code>Pushdeploy Pro</code> to have unlimited DNS access. <Link to='/account/plans'>Take me to upgrade page</Link>
                    </p></div>}

                    { this.props.dnspass === null && <div>
                        <p className="lead">Please reload the page</p></div>}
                  </div>
              </div>
            </div>
            <div className="actions">
            { this.props.dnspass === true && <button
                className="button"
                disabled={this.state.creating || this.state.domain.length < 1}
                onClick={(e) => {
                  this.createDNSZone(e);
                }}>
                Create
              </button> }
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

DNSZoneForm.propTypes = {
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        dnspass: storeState.dnspass,
    }
);

const mapDispatchToProps = (dispatch) => ({
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
  changeRoute: (route)=> dispatch(changeRoute(route)),
  getDNSPassFlag: () => dispatch(DNSAction.getDNSPassFlag()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSZoneForm)

// export default DNSZoneForm