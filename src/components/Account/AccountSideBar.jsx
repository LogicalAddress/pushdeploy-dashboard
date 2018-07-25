import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
var Link = require('react-router-dom').Link
import req from '../../api/req.js';
import {error, success} from '../../utils/toastr';
import {isWorking, isDoneWorking, updatePlan } from '../../actions/Common';

class AccountSideBar extends React.Component {
    
    logout = (evt) => {
        evt.preventDefault();
        this.props.isWorking();
        req.get('/logout')
        .then((response) => {
            sessionStorage.removeItem('user');
            success('Notification', 'You are logged out');
            window.location = "/";
        }).catch((err) => {
            this.props.isDoneWorking();
            error('Notification', err.message);
        });
    }
    
    render() {
      return (
         <div>
            <h3>{this.props.user.name}</h3>
            <ul>
                <li><a href="" onClick={ (evt) => this.logout(evt)} to="/logout">Logout</a></li>
                <li><Link to="/account">Profile</Link></li>
                <li><Link to="/account/plans">Subscription</Link></li>
            </ul>
        </div>
      )
   }
}


const mapDispatchToProps = (dispatch) => (
      {
        isWorking: ()=> dispatch(isWorking()),
        isDoneWorking: ()=> dispatch(isDoneWorking()),
        updatePlan: (plan) => dispatch(updatePlan(plan)),
      }
);

AccountSideBar.propTypes = {
    user: PropTypes.object,
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
}

const mapStoreToProps = (storeState) => (
    {
        user: storeState.user,
    }
)

export default connect(mapStoreToProps, mapDispatchToProps)(AccountSideBar)