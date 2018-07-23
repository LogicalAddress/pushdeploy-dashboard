import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Footer from './Footer.jsx';
import Loader from '../lib/loader';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux'
import UserAction from '../actions/UserAction';
import ServersAction from '../actions/ServersAction';
import CredentialsAction from '../actions/CredentialsAction';
// import ProfileAction from '../actions/ProfileAction';

class Launcher extends React.Component {
  componentDidMount() {
    //dispatch everything here
    this.props.fetchUser();
    this.props.fetchUserCredentials();
    this.props.fetchServers();
    // this.props.fetchProfile();
    // this.props.fetchSubscription();
  }
  
  render() {
      return (
        <div>
          {this.props.loading && <Loader />}
          <Header />
          {this.props.children}
          <Footer/>
        </div>
      );
  }
}

Launcher.propTypes = {
  loading: PropTypes.bool,
  fetchUser: PropTypes.func.isRequired,
  fetchServers: PropTypes.func.isRequired,
  fetchUserCredentials: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(UserAction.fetchUser()),
  fetchServers: () => dispatch(ServersAction.fetchServers()),
  fetchUserCredentials: () => dispatch(CredentialsAction.fetchUserCredentials()),
  // fetchProfile: () => dispatch(ProfileAction.fetchProfile()),
});

export default withRouter(connect(
  (state) => ({
    loading: state.loading.loading
  }), mapDispatchToProps
)(Launcher));