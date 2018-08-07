import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveApp } from '../actions/Common';
var Link = require('react-router-dom').Link

class Header extends React.Component {
    render() {
      
      var servers = this.props.servers;
      var serverList = [];
      for (var key in servers) {
        serverList.push(<ServerUL key={key} server={servers[key]} />);
      }
      
      var appList = [];
      for (let i = 0; i < servers.length; i++) {
        for (let akey in servers[i].apps) {
          appList.push(<AppUL setActiveApp={this.props.setActiveApp} key={akey} server={servers[i]} app={servers[i].apps[akey]} />);
        }
      }
      /*
      var functionList = [];
      for (let i = 0; i < servers.length; i++) {
        for (let akey in servers[i].apps) {
          appList.push(<FunctionUL setActiveApp={this.props.setActiveApp} key={akey} server={servers[i]} app={servers[i].apps[akey]} />);
        }
      }*/
      
        return (
          <div className="nav">
          <div className="container">
            <div className="logo">
              <Link to="/">PushDeploy.io</Link>
            </div>
            <div className="left menu">
              <ul id="left-menu-list">
                <li className="dropdown">
                  <Link to="/">Servers</Link>
                  <div className="submenu">
                    <ul id="server-list">{serverList}</ul>
                  </div>
                </li>
                <li className="dropdown">
                  <Link to="/">Apps</Link>
                  <div className="submenu">
                    <ul id="app-list">{appList}</ul>
                  </div>
                </li>
                {/*
                <li className="dropdown">
                  <Link to="/">Functions</Link>
                  <div className="submenu">
                    <ul id="function-list">{functionList}</ul>
                  </div>
                </li>
                <li><input type="text" placeholder="Search.." id="search"/></li>
                */}
              </ul>
            </div>
            <div className="right menu">
              <ul>
                {/*
                <li>
                    <Link to="/documentation">Documentation</Link>
                </li>
                */}
                <li>
                  <Link to="/account">Account</Link>
                </li>
              </ul>
            </div>
            <div className="clear"></div>
            </div>
          </div>          
        );
    }
}

Header.propTypes = {
  servers: PropTypes.array,
  loggedIn: PropTypes.bool,
}

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.servers,
        user: storeState.user
    }
)

const mapDispatchToProps = (dispatch) => (
      {
        setActiveApp: (app) => dispatch(setActiveApp(app)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Header)


class ServerUL extends React.Component {
  
  render() {
    return (
        <li><Link to={'/server/' + this.props.server._id}>{this.props.server.server_name.toUpperCase()}</Link></li>  
    );
  }
}

class AppUL extends React.Component {
  update(){
    this.props.setActiveApp(this.props.app);
  }
  render() {
    return (
      <li><Link onClick={()=> this.update() } to={'/server/' + this.props.server._id + '/app/' + this.props.app._id}>{this.props.app.app_name.toUpperCase()} - {this.props.server.server_name.toUpperCase()}</Link></li>
    );
  }
}

/*
class FunctionUL extends React.Component {
  update(){
    this.props.setActiveApp(this.props.app);
  }
  render() {
    return (
      <li><Link onClick={()=> this.update() } to={'/server/' + this.props.server._id + '/app/' + this.props.app._id}>{this.props.app.app_name.toUpperCase()} - {this.props.server.server_name.toUpperCase()}</Link></li>
    );
  }
}
*/