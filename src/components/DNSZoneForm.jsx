import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import req from '../api/req.js';
import {error} from '../utils/toastr';
var Link = require('react-router-dom').Link;

class DNSZoneForm extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        domain: "",
        creating: false,
    };
  }


  componentDidMount(){
   
  }

  render() {
    return (
      <Popup onOpen={() => console.log("Function to call on open")} trigger={<h5><Link to="#" className="right button" onClick={(e) => {e.preventDefault()}}>Add Zone Record</Link></h5>} modal>
      {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="header"> DNS Zone </div>
        
            <div className="content">
             <fieldset>
                <div className="form-group">
                    <p class="lead">If you wish to associate your app with domain. It's better to create this from the app's page.</p>
                    <label htmlFor="domain">Root Domain</label>
                    <input autocomplete="off" placeholder="e.g pushdeploy.com" id="domain" type="text" value={this.state.domain} onChange={(e) => this.setState({domain: e.target.value})}/>
                </div>
            </fieldset>
            </div>
            <div className="actions">
              <button
                className="button"
                disabled={this.state.creating || this.state.domain.length > 5}
                onClick={() => {
                //   this.getLogs(this.props.app._id)
                console.log("creating..");
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

export default DNSZoneForm