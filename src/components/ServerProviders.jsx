import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AwsSetupAction from '../actions/AwsSetup'
import LinodeSetupAction from '../actions/LinodeSetup'
import CustomSetupAction from '../actions/CustomSetup'
import ServersAction from '../actions/ServersAction'
import {error} from '../utils/toastr.js'

class ServerProviders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isCreating: false,
    }
    
    this.displayLinode = this.displayLinode.bind(this);
    this.displayCustom = this.displayCustom.bind(this);
    this.displayAWS = this.displayAWS.bind(this);
  };
  componentDidMount(){
    this.sPLDiv = ReactDOM.findDOMNode(document.getElementById('sp_linode'));
    this.sPCDiv = ReactDOM.findDOMNode(document.getElementById('sp_custom'));
    this.sPAWSDiv = ReactDOM.findDOMNode(document.getElementById('sp_aws'));
    this.clearServerProviders();
  }
  
  clearServerProviders(){
    this.sPCDiv.style.display = 'none';
    this.sPAWSDiv.style.display = 'none';
    this.sPLDiv.style.display = 'none';
  }
  
  displayLinode(evt) {
    this.clearServerProviders();
    this.sPLDiv.style.display = 'inline';
  }
  
  displayAWS(evt) {
    this.clearServerProviders();
    this.sPAWSDiv.style.display = 'inline';
  }
  
  displayCustom(evt) {
    this.clearServerProviders();
    this.sPCDiv.style.display = 'inline';
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="column">
            <center>
            {/*<button onClick={this.displayLinode}>Add Linode</button> */}<button onClick={this.displayAWS}>Add AWS</button> <button onClick={this.displayCustom} className="button button-outline">Add Custom</button>
            </center>
          </div>
        </div>
        <div className="row">
          <div className="column column-50 column-offset-25">
            <CustomServer profile={this.props.profile} thisDiv={this.clearServerProviders} credentials={this.props.credentials} draft={this.props.customSetupDraft} update={ (draft) => this.props.updateCustomDraft(draft)} createServer={ (draft) => this.props.createCustomServer(draft)} />
            <LinodeServer profile={this.props.profile} thisDiv={this.clearServerProviders} credentials={this.props.credentials} draft={this.props.linodeSetupDraft} update={ (draft) => this.props.updateLinodeDraft(draft)} createServer={ (draft) => this.props.createLinodeServer(draft)} />
            <AWSServer profile={this.props.profile} thisDiv={this.clearServerProviders} credentials={this.props.credentials} draft={this.props.awsSetupDraft} update={ (draft) => this.props.updateAwsDraft(draft)} createServer={ (draft) => this.props.createAwsServer(draft)} />
          </div>
        </div>
      </div>
    );
  }
}

ServerProviders.propTypes = {
  awsSetupDraft: PropTypes.object,
  linodeSetupDraft: PropTypes.object,
  customSetupDraft: PropTypes.object,
  
  createAwsServer: PropTypes.func.isRequired,
  updateAwsDraft: PropTypes.func.isRequired,
  

  createLinodeServer: PropTypes.func.isRequired,
  updateLinodeDraft: PropTypes.func.isRequired,
  
  createCustomServer: PropTypes.func.isRequired,
  updateCustomDraft: PropTypes.func.isRequired,
  
  credentials: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStoreToProps = (storeState) => (
    {
        awsSetupDraft: storeState.awsSetupDraft,
        linodeSetupDraft: storeState.linodeSetupDraft,
        customSetupDraft: storeState.customSetupDraft,
        credentials: storeState.credentials,
        profile: storeState.profile,
    }
);

const mapDispatchToProps = (dispatch) => ({
  createAwsServer: (draft) => dispatch(ServersAction.createServer(draft)/*AwsSetupAction.createServer(draft)*/),
  updateAwsDraft: (draft) => dispatch(AwsSetupAction.updateDraft(draft)),
  
  createLinodeServer: (draft) => dispatch(ServersAction.createServer(draft)/*LinodeSetupAction.createServer(draft)*/),
  updateLinodeDraft: (draft) => dispatch(LinodeSetupAction.updateDraft(draft)),
  
  createCustomServer: (draft) => dispatch(ServersAction.createServer(draft)/*CustomSetupAction.createServer(draft)*/),
  updateCustomDraft: (draft) => dispatch(CustomSetupAction.updateDraft(draft)),
});


export default connect(mapStoreToProps, mapDispatchToProps)(ServerProviders);

class AWSServer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isCreating: false,
    };
    
    this.createAWS = this.createAWS.bind(this);
    this.cancelAWS = this.cancelAWS.bind(this);
  }
  
  cancelAWS(){
    ReactDOM.findDOMNode(document.getElementById('sp_aws')).style.display = 'none';
  }
  
  createAWS() {
    if(this.props.profile.primaryPlan == null || !this.props.profile.primaryPlan.length){
      return error('Requirements', 'Please select a plan that works for you first.');
    }
    if(!this.props.draft.accessKeyId.length){
      return error('Gosh', 'Your AWS Access Key is required');
    }
    if(!this.props.draft.secretAccessKey.length){
      return error('Gosh', 'Your AWS Secret Key is required');
    }
    this.setState({isCreating: true});
    this.props.createServer(this.props.draft);
  }
  
  render() {
    return (
      <div>
      <div id="sp_aws">
      {this.props.credentials.aws_access_key ?
        <p className="lead">Your account is connected to Amazon Web Service (AWS)</p>
        :
        <p className="lead">You will first need to create access keys with EC2 with neccessary permissions to create EC2 instance.</p> }
        <form>
          <div className="form-group">
            <label>AWS Access Key </label>
            <input disabled={this.props.credentials.aws_access_key} type="text" name="accessKeyId" id="accessKeyId" value={this.props.draft.accessKeyId || this.props.credentials.aws_access_key} onChange={(e) => this.props.update({accessKeyId: e.target.value})}/>
          </div>
          <div className="form-group">
            <label>AWS Secret Key</label>
            <input disabled={this.props.credentials.aws_secret_key} type="password" name="secretAccessKey" id="secretAccessKey" value={this.props.draft.secretAccessKey || this.props.credentials.aws_secret_key} onChange={(e) => this.props.update({secretAccessKey: e.target.value})}/>
          </div>
          {/*
          <div className="form-group">
            <label htmlFor="distroField">Distribution</label>
            <input disabled value="Ubuntu Server 16.04 LTS (HVM), EBS General Purpose (SSD) Volume Type." type="text"/>
          </div>
          */}
          <div className="row">
              <div className="column column-30">
                  <label htmlFor="volumeSize">Storage</label>
                  <select id="volumeSize" name="volumeSize" value={this.props.draft.volumeSize} onChange={(e) => this.props.update({volumeSize: e.target.value})}>
                      <option value="8">8G</option>
                      <option value="10">10G</option>
                      <option value="20">20G</option>
                      <option value="30">30G</option>
                      <option value="50">50G</option>
                      <option value="100">100G</option>
                  </select>
              </div>
              <div className="column column-80">
                  <label htmlFor="InstanceType">Computing Power</label>
                  <select id="InstanceType" name="InstanceType" value={this.props.draft.InstanceType} onChange={(e) => this.props.update({InstanceType: e.target.value})}>
                      <option value="t2.micro">1 CPU, 1 Gig RAM (Free tier maybe applicable)</option>
                      <option value="t2.small">1 CPU, 2 Gig RAM</option>
                      <option value="t2.medium">2 CPUs, 4 Gig RAM</option>
                      <option value="t2.large">2 CPUs, 8 Gig RAM</option>
                      <option value="t2.xlarge">4 CPUs, 16 Gig RAM</option>
                      <option value="t2.2xlarge">8 CPUs, 32 Gig RAM</option>
                  </select>
              </div>
          </div>
          <div className="row">
            <div className="column">
              <a className="button" disabled={this.state.isCreating} onClick={this.createAWS}>Add AWS</a> <a className="button button-clear" onClick={this.cancelAWS}>Cancel</a>
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}


class CustomServer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isCreating: false,
    }
    
    this.createCustom = this.createCustom.bind(this);
    this.cancelCustom = this.cancelCustom.bind(this);
  };
  
  cancelCustom(){
    ReactDOM.findDOMNode(document.getElementById('sp_custom')).style.display = 'none';
  }
  
  createCustom() {
    if(this.props.profile.primaryPlan == null || !this.props.profile.primaryPlan.length){
      return error('Requirements', 'Please select a plan that works for you first.');
    }
    if(!this.props.draft.volumeSize.length){
      return error('Gosh', 'Please specify your server\'s RAM size in gigabyte');
    }
    if(!this.props.draft.ipv4.length){
      return error('Gosh', 'Your server IP address is required');
    }
    if(this.props.draft.username.length === 0){
      return error('Gosh', 'A super user repo is required');
    }
    this.setState({isCreating: true});
    this.props.createServer(this.props.draft);
  }
  render() {
    // console.log(this.props.draft)
    return (
      <div>
      <div id="sp_custom">
        <p className="lead">Your custom server must run a fresh installation of Ubuntu 16.04 x64 and must have a user with a super cow powers.</p>
        <form>
          <div className="form-group">
            <label>Size (Gig RAM): </label>
            <input type="text" value={this.props.draft.volumeSize} onChange={(e) => this.props.update({volumeSize: e.target.value})} name="volumeSize"/>
          </div>
          <div className="row">
              <div className="column column-50">
                  <label htmlFor="username">Super user</label>
                  <input type="text" id="username" name="username" value={this.props.draft.username} onChange={(e) => this.props.update({username: e.target.value})}/>
              </div>
              <div className="column column-50">
                  <label htmlFor="ipv4">IP Address:</label>
                  <input type="text" id="ipv4" name="ipv4" value={this.props.draft.ipv4} onChange={(e) => this.props.update({ipv4: e.target.value})}/>
              </div>
          </div>
          <div className="form-group">
            <small>Append this public key to your $HOME/.ssh/authorized_keys e.g `/{this.props.draft.username}/.ssh/authorized_keys`</small>
            <pre><code>
            {this.props.credentials.custom_public_key}
            </code></pre>
            {/*
            <pre><code>
            {this.props.credentials.custom_private_key}
            </code></pre>
            */}
          </div>
          <div className="row">
            <div className="column">
              <a className="button" disabled={this.state.isCreating} onClick={this.createCustom}>Add Server</a> <a className="button button-clear" onClick={this.cancelCustom}>Cancel</a>
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}


class LinodeServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
    this.cancelLinode = this.cancelLinode.bind(this);
    this.createLinode = this.createLinode.bind(this);
  };
  
  cancelLinode() {
    ReactDOM.findDOMNode(document.getElementById('sp_linode')).style.display = 'none';
  }
  
  createLinode() {
    if(this.props.profile.primaryPlan == null || !this.props.profile.primaryPlan.length){
      return error('Requirements', 'Please select a plan that works for you first.');
    }
    if(this.props.draft.root_pass.length < 8){
      return error('Gosh', 'Your root password must be at least 8 characters in length');
    }
    
    this.props.createServer(this.props.draft);
  }
  
  render() {
    // console.log(this.props.draft)
    return (
      <div>
      <div id="sp_linode">
        { this.props.credentials.linode_username ?
        <p className="lead">Linode Account Connected</p>
        :
        <p className="lead">Connect your Linode account to PushDeploy</p> }
        <form>
          <div className="form-group">
            <label>Server Size: </label>
            <select disabled={!this.props.credentials.linode_username} value={this.props.draft.type} onChange={(e) => this.props.update({type: e.target.value})} className="form-group" name="type" id="type">
              <option value="nanode1024.5">1G RAM - 1 CPU Cores - 20GB SSD</option>
              <option value="linode2048.5">2G RAM - 1 CPU Cores - 30GB SSD</option>
              <option value="linode4096.5">4G RAM - 2 CPU Cores - 48GB SSD</option>
              <option value="linode8192.5">8G RAM - 4 CPU Cores - 96GB SSD</option>
              <option value="linode12288.5">12G RAM - 6 CPU Cores - 192GB SSD</option>
            </select>
          </div>
          
          <div className="row">
              <div className="column column-70">
                <div className="form-group">
                  <label>Region: </label>
                  <select disabled={!this.props.credentials.linode_username} value={this.props.draft.datacenter} onChange={(e) => this.props.update({datacenter: e.target.value})} className="form-group" name="region">
                    <option value="10">Frankfurt, DE</option>
                    <option value="3">Fremont, CA</option>
                    <option value="2">Dallas, TX</option>
                    <option value="4">Atlanta, GA</option>
                    <option value="6">Newark, NJ</option>
                    <option value="7">London, UK</option>
                    <option value="9">Singapore, SG</option>
                    <option value="11">Tokyo 2, JP</option>
                  </select>
                </div>
              </div>
              <div className="column column-30">
                  <label htmlFor="root_pass">Root Password</label>
                  <input disabled={!this.props.credentials.linode_username} value={this.props.draft.root_pass} onChange={(e) => this.props.update({root_pass: e.target.value})} id="root_pass" type="password"/>
              </div>
          </div>
        
          <div className="row">
            <div className="column">
              <button disabled={!this.props.credentials.linode_username} className="button" onClick={this.createLinode}>Add Server</button> <a className="button button-clear" onClick={this.cancelLinode}>Cancel</a>
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}