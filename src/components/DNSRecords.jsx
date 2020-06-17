import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DNSRecordsTable from './DNSRecordsTable.jsx';
import DNSAction from '../actions/DNSAction';
import {isWorking, isDoneWorking } from '../actions/Common';
import DNSRecordForm from './DNSRecordForm';
// var Link = require('react-router-dom').Link;

class DNSRecords extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { };
        this.createDNSRecord = this.createDNSRecord.bind(this);
        this.deleteDNSRecord = this.deleteDNSRecord.bind(this);
    }
     
    componentDidMount(){
        this.props.fetchDNSRecords(this.props.match.params.id);
     }
    
    createDNSRecord() {
        this.props.createDNSRecord(this.state);
    }

    deleteDNSRecord(e, id){
        e.preventDefault();
        this.props.deleteDNSRecord(id);
    }
    
    render() {

      return (
         <div>
             <div className="container" style={{padding: 'unset'}}>
                <div className="float-right">
                <DNSRecordForm zone_id={ this.props.match.params.id} fetchDNSRecords={this.props.fetchDNSRecords}/>
                </div>
                <div style={{clear: 'right'}}></div>
            </div>
            { this.props.dnsrecords.length !== 0 &&
            <div className="white panel">
                <h3>DNS Records</h3>
                <DNSRecordsTable delete={this.deleteDNSRecord} dnsrecords={this.props.dnsrecords}/>
            </div>
            }

            { this.props.dnsrecords.length === 0 &&
            <div className="white panel">
                <p className="lead">Nothing here yet! Create an app, assign domain to the app and they will appear here.</p>
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
  deleteDNSRecord: (params) => dispatch(DNSAction.deleteDNSRecord(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSRecords)