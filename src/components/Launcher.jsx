import React from 'react';
import Header from './Header';
// import Login from './Account/Login';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Footer from './Footer.jsx';
import Loader from '../lib/loader';
import PropTypes from 'prop-types';
import UserAction from '../actions/UserAction';
import ServersAction from '../actions/ServersAction';
import AppsAction from '../actions/AppsAction';
import AppSettingAction from '../actions/AppSetting';
import CredentialsAction from '../actions/CredentialsAction';
// import ProfileAction from '../actions/ProfileAction';
import {error, success} from '../utils/toastr';
import req from '../api/req.js';
import {isWorking, isDoneWorking, changeRoute } from '../actions/Common';
import GlobalErrorHandler from './GlobalErrorHandler';
import Socket from './Socket';

class Launcher extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        loggedIn: false,
    };
  }
    
  componentDidMount() {
    this.props.isWorking();
    req.get('/v1/user')
    .then((response) => {
        return response.json();
    }).then((response) => {
      this.props.isDoneWorking();
      if (response.body && response.body.status === 'success') {
          this.setState({loggedIn: true});
          this.props.setLoggedInUser(response.body.data);
          this.props.fetchUserCredentials();
          this.props.fetchServers();
          this.props.fetchApps();
          this.props.fetchClientSettings();
          if(response.body.data.noSubscription){
            success('Notification', 'Welcome, please choose a plan to continue...');
            this.props.changeRoute('/account/plans');
          }else{
            success('Notification', 'You are logged in');
          }
          // this.props.changeRoute('/');
          return;
      }
      throw new Error("Unexpected response please try again");
    }).catch((err) => {
      console.log({err});
        this.props.isDoneWorking();
        if(this.props.UrlPathname === '/register'){
          return;
        }
        error("Notification!", "Please login to continue");
        this.props.changeRoute('/login');
    });
  }
  
  render() {
      return (
        <div>
          <Socket />
          { this.props.loading && <Loader /> }
          <GlobalErrorHandler changeRoute={this.props.changeRoute}>
          { this.state.loggedIn && <Header loggedIn={this.state.loggedIn}/> }
          { this.props.children }
          { this.state.loggedIn && <Footer loggedIn={this.state.loggedIn}/> }
          </GlobalErrorHandler>
        </div>
      );
  }
}

Launcher.propTypes = {
  loading: PropTypes.bool,
  fetchUser: PropTypes.func.isRequired,
  fetchServers: PropTypes.func.isRequired,
  fetchApps: PropTypes.func.isRequired,
  fetchUserCredentials: PropTypes.func.isRequired,
  fetchClientSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(UserAction.fetchUser()),
  setLoggedInUser: (payload) => dispatch(UserAction.setLoggedInUser(payload)),
  fetchServers: () => dispatch(ServersAction.fetchServers()),
  fetchApps: () => dispatch(AppsAction.fetchApps()),
  isWorking: ()=> dispatch(isWorking()),
  changeRoute: (route)=> dispatch(changeRoute(route)),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
  fetchUserCredentials: () => dispatch(CredentialsAction.fetchUserCredentials()),
  // fetchProfile: () => dispatch(ProfileAction.fetchProfile()),
  fetchClientSettings: () => dispatch(AppSettingAction.fetch()),
});

export default withRouter(connect(
  (state) => ({
    loading: state.loading.loading,
    user: state.user,
    UrlPathname: state.router.location.pathname,
    Urlsearch: state.router.location.search,
    UrlHash: state.router.location.hash,
  }), mapDispatchToProps
)(Launcher));