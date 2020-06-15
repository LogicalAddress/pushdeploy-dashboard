import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
var Link = require('react-router-dom').Link

class Header extends React.Component {
    render() {
        return (
          <div className="nav">
          <div className="container">
            <div className="logo">
              <Link to="/">PushDeploy.io</Link>
            </div>
            <div className="left menu">
              <ul id="left-menu-list">
                <li>
                  <Link to="/servers">Servers</Link>
                </li>
                <li>
                  <Link to="/apps">Apps</Link>
                </li>
                <li>
                  <Link to="/dns">DNS</Link>
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
        user: storeState.user
    }
)

const mapDispatchToProps = (dispatch) => (
      {
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Header)