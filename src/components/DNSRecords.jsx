import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DNSRecordsTable from './DNSRecordsTable.jsx';
import DNSAction from '../actions/DNSAction';
import {isWorking, isDoneWorking } from '../actions/Common';
// var Link = require('react-router-dom').Link;

class DNSRecords extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { };
        this.createDNSRecord = this.createDNSRecord.bind(this);
    }
     
    componentDidMount(){
        this.props.fetchDNSRecords(this.props.match.params.id);
     }
    
    createDNSRecord() {
        this.props.createDNSRecord(this.state);
    }
    
    render() {

      return (
         <div>
             <div className="container" style={{padding: 'unset'}}>
                <div className="float-right">
                    <button className="right button">Add Record</button>
                </div>
                <div style={{clear: 'right'}}></div>
            </div>
            { this.props.dnsrecords.length !== 0 &&
            <div className="white panel">
                <h3>DNS Records</h3>
                <DNSRecordsTable dnsrecords={this.props.dnsrecords}/>
            </div>
            }

            { this.props.dnsrecords.length === 0 &&
            <div className="white panel">
                <p class="lead">Nothing here yet! Create an app, assign DNS to the app and they will appear here.</p>
            </div>
            }
        </div>
      );
   }
}

DNSRecords.propTypes = {
  dnsrecords: PropTypes.array,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        dnsrecords: storeState.dnsrecords,
        credentials: storeState.credentials,
    }
);

const mapDispatchToProps = (dispatch) => ({
  fetchDNSRecords: (params) => dispatch(DNSAction.fetchDNSRecords(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSRecords)