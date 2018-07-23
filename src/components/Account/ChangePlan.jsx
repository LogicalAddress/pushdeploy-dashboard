import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stripe from './Stripe.jsx';
import Paystack from './Paystack.jsx';
import AccountSideBar from './AccountSideBar.jsx';

class ChangePlan extends React.Component {
    
    render() {
        
      return (
         <div className="container">
            <div className="row">
                <div className="column column-20">
                    <AccountSideBar />
                </div>
                <div className="column column-80">
                    {this.props.profile.currency==='NGN' ? 
                        <Paystack user={this.props.user} app_setting={this.props.app_setting} switch="yes"/> : 
                        <Stripe user={this.props.user} app_setting={this.props.app_setting} switch="yes" />}
                </div>
            </div>
         </div>
      )
   }
}

ChangePlan.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  app_setting: PropTypes.object,
}

const mapStoreToProps = (storeState) => (
    {
        user: storeState.user,
        profile: storeState.profile,
        app_setting: storeState.app_setting
    }
)

export default connect(mapStoreToProps)(ChangePlan)