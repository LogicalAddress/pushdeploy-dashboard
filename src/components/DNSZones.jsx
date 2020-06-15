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
    }
     
    componentDidMount(){
        this.props.fetchDNSZones();
     }
    
    createDatabase() {
        this.props.createDatabase(this.state);
    }
    
    render() {

      return (
        <div>
            <div className="container" style={{padding: 'unset'}}>
                <div className="float-right">
                    {/* <button className="right button">Add Record</button> */}
                    <DNSZoneForm />
                </div>
                <div style={{clear: 'right'}}></div>
            </div>
            { this.props.dnszones.length !== 0 &&
            <div className="white panel">
                <h3>Domains</h3>
                <DNSZonesTable dnszones={this.props.dnszones}/>
            </div>
            }

            { this.props.dnszones.length === 0 &&
            <div className="white panel">
                <p class="lead">Nothing here yet! Create an app, assign DNS to the app and they will appear here.</p>
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
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(DNSZones)