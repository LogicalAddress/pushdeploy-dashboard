import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stripe from './Stripe.jsx';
import Paystack from './Paystack.jsx';
import SubscriptionAction from '../../actions/SubscriptionAction';
import {isWorking, isDoneWorking } from '../../actions/Common';

class SelectPlan extends React.Component {
    // componentDidMount(){
        // this.props.fetchSubscription(this.props.profile);
    // }
    render() {
      return (
        <div>
            {this.props.profile.currency==='NGN' ? 
                <Paystack showProgress={()=>this.props.isWorking()} stopProgress={()=>this.isDoneWorking()} subscribe={(s)=> {this.props.subscribe(s)}} changePlan={(s, p) => {this.props.changePlan(s, p)}} user={this.props.user} profile={this.props.profile} app_setting={this.props.app_setting} /> : 
                <Stripe showProgress={()=>this.props.isWorking()} stopProgress={()=>this.isDoneWorking()} subscribe={(s)=> {this.props.subscribe(s)}} changePlan={(s, p) => {this.props.changePlan(s, p)}} profile={this.props.profile}  user={this.props.user} app_setting={this.props.app_setting} />}
         </div>
      )
   }
}

SelectPlan.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    app_setting: PropTypes.object,
    //   subscription: PropTypes.object,
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
}

const mapStoreToProps = (storeState) => (
    {
        user: storeState.user,
        profile: storeState.profile,
        app_setting: storeState.app_setting,
        // subscription: storeState.subscription,
    }
)

const mapDispatchToProps = (dispatch) => (
      {
        subscribe: (subscription) => dispatch(SubscriptionAction.subscribe(subscription)),
        changePlan: (subscription, profile) => dispatch(SubscriptionAction.changePlan(subscription, profile)),
        // fetchSubscription: (profile) => dispatch(SubscriptionAction.fetchSubscription(profile)),
        isWorking: ()=> dispatch(isWorking()),
        isDoneWorking: ()=> dispatch(isDoneWorking())
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(SelectPlan)