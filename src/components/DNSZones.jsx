import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DNSZonesTable from './DNSZonesTable.jsx';
import DNSAction from '../actions/DNSAction';
import {isWorking, isDoneWorking } from '../actions/Common';
import DNSZoneForm from './DNSZoneForm';
// var Link = require('react-router-dom').Link;

class DNSZones extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { };
        this.deleteDNSZone = this.deleteDNSZone.bind(this);
    }
     
    componentDidMount(){
        this.props.fetchDNSZones();
     }

     deleteDNSZone(e, id){
        e.preventDefault();
        this.props.deleteDNSZone(id);
    }
    
    render() {

      return (
        <div>
            <div className="container" style={{padding: 'unset'}}>
                <div className="float-right">
                    {/* <button className="right button">Add Record</button> */}
                    <DNSZoneForm reloadZones={this.props.fetchDNSZones}/>
                </div>
                <div style={{clear: 'right'}}></div>
            </div>
            { this.props.dnszones.length !== 0 &&
            <div className="white panel">
                <h3>Domains</h3>
                <DNSZonesTable delete={this.deleteDNSZone} dnszones={this.props.dnszones}/>
            </div>
            }

            { this.props.dnszones.length === 0 &&
            <div className="white panel">
                <p className="lead">Nothing here yet! Create an app, assign domain to the app and they will appear here.</p>
            </div>
            }
                   
        </div>
      );
   }
}

DNSZones.propTypes = {
  dnszones: PropTypes.array,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        dnszones: storeState.dnszones,
        credentials: storeState.credentials,
    }
);

const mapDispatchToProps = (dispatch) => ({
  fetchDNSZones: () => dispatch(DNSAction.fetchDNSZones()),
  deleteDNSZone: (params) => dispatch(DNSAction.deleteDNSZone(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSZones)