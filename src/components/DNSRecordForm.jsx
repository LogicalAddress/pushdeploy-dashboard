import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
// import req from '../api/req.js';
import {error, success} from '../utils/toastr';
import {isWorking, isDoneWorking, changeRoute } from '../actions/Common';
import DNS from '../api/DNS'
var Link = require('react-router-dom').Link;

class DNSZoneForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        label: '',
        ttl: '3600',
        class: 'IN',
        type: '',
        rdata: '',
        creating: false,
        types: [
            {
                name: 'Select…',
                value: '',
            },
            {
                name: 'A',
                value: 'A',
            },
            {
                name: 'AAAA',
                value: 'AAAA',
            },
            {
                name: 'CNAME',
                value: 'CNAME',
            },
            {
                name: 'MX',
                value: 'MX',
            },
            {
                name: 'TXT',
                value: 'TXT',
            },
            // {
            //     name: 'NS',
            //     value: null,
            // },
            // {
            //     name: 'SRV',
            //     value: null,
            // },
            // {
            //     name: 'CAA',
            //     value: null,
            // }
        ],
    };
    this.createDNSRecord = this.createDNSRecord.bind(this);
  }


  componentDidMount(){
   this.setState({zone: this.props.zone_id});
  }

  createDNSRecord(e){
    e.preventDefault();
    this.props.isWorking();
    this.setState({creating: true});
    DNS.createDNSRecord({
        zone: this.state.zone,
        label: this.state.label,
        ttl: this.state.ttl,
        class: 'IN',
        type: this.state.type,
        rdata: this.state.rdata,
    }).then((response) => {
      return response.json();
    }).then((response) => {
      this.props.isDoneWorking();
      this.setState({creating: false});
      if (response.body && response.body.status === "success") {
          success("Notification", "Creating DNS record successful");
          this.props.fetchDNSRecords(this.state.zone);
          return;
      }
      error('Notification', response.message || "Unable to create a DNS record");
      console.log("DEBUG", response);
    }).catch((err) => {
        this.props.isDoneWorking();
        error('Notification', err.message);
        this.setState({creating: false});
    });
  }

  render() {
    return (
      <Popup onOpen={() => console.log("Function to call on open")} trigger={<h5><Link to="#" className="right button" onClick={(e) => {e.preventDefault()}}>Add Record</Link></h5>} modal>
      {close => (
          <div className="modal" style={{background: 'url(/images/background.png)', fontSize: 'inherit'}}>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> DNS Record </div>
            <div className="row" style={{marginTop: '20px'}}>
              <div className="column column-80" style={{margin: '0px auto'}}>
                  <div className="white panel" style={{marginBottom: '10px'}}>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" value={this.state.type} onChange={(e) => this.setState({type: e.target.value})}>
                            {this.state.types.map(item => (
                                <option key={item.value} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="label">Hostname</label>
                        <input disabled={this.state.creating} autoComplete="off" placeholder="e.g @ or www" id="label" type="text" value={this.state.label} onChange={(e) => this.setState({label: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rdata">Value</label>
                        <textarea disabled={this.state.creating}placeholder="e.g your IP or 10 mail.logicaladdress.com" id="rdata" type="text" value={this.state.rdata} onChange={(e) => this.setState({rdata: e.target.value})}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ttl">TTL (Seconds)</label>
                        <input disabled={this.state.creating} autoComplete="off" placeholder="e.g @ or www" id="ttl" type="text" value={this.state.ttl} onChange={(e) => this.setState({ttl: e.target.value})}/>
                    </div>
                  </div>
              </div>
            </div>
            <div className="actions">
              <button
                className="button"
                disabled={this.state.creating || this.state.ttl.length < 1 || this.state.type === '' || this.state.label < 1 || this.state.rdata < 1}
                onClick={(e) => {
                  this.createDNSRecord(e);
                }}>
                Create
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

DNSZoneForm.propTypes = {
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
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
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
  changeRoute: (route)=> dispatch(changeRoute(route)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSZoneForm)

// export default DNSZoneForm