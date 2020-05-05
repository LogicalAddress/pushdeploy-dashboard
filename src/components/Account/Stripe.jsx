import React from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import req from '../../api/req.js';
import {error, success} from '../../utils/toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {isWorking, isDoneWorking, changeRoute } from '../../actions/Common';
import Constants from '../../Constants';
import UserAction from '../../actions/UserAction';

class Stripe extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            selectedPlan: '',
            description: '',
        };
        this.handlePlanChange = this.handlePlanChange.bind(this);
    }

    componentDidMount(){
        console.log(this.props.app_setting.stripeKey);
        console.log(`${Constants.DASHBOARD_URL}/confirm`);

        if(this.props.profile.primaryPlan != this.props.app_setting.stripePlanB){
            var selectedPlan = this.props.app_setting.stripePlanB;
            var description = this.props.app_setting.stripePlanBDesc;
            var amount = this.props.app_setting.stripePlanBAmount;
        }else{
            selectedPlan = this.props.app_setting.stripePlanA;
            description = this.props.app_setting.stripePlanADesc;
            amount = this.props.app_setting.stripePlanAAmount;
        }
        this.setState({selectedPlan});
        this.setState({description});
        this.setState({amount});
    }
    
    onPlanClick = async(evt) => {
        evt.preventDefault();
        this.props.isWorking();
        const stripePromise = loadStripe(this.props.app_setting.stripeKey);
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            items: [
                {plan: this.state.selectedPlan, quantity: 1}
            ],
            successUrl: `${Constants.DASHBOARD_URL}/confirm`,
            cancelUrl: `${Constants.DASHBOARD_URL}/account/plans`,
            clientReferenceId: this.props.user.uid,
            customerEmail: this.props.user.email,
        });
        this.props.isDoneWorking();
        if(error){
            error('Notification', error.message);
        }else{
            success('Notification', 'You can start launching your apps now');
        }
        
    }

    onCancelPlanClick = async(evt) =>{
        evt.preventDefault();
        let response = window.confirm("Are you sure you want to cancel your subscription? You will not be able to carry out actions on pushdeploy until you subscribe again.");
        if (response === true) {
            this.props.isWorking();
            req.post('/v1/cancelSubscription', {plan: this.props.profile.primaryPlan})
            .then((response) => {
                return response.json();
            }).then((response) => {
                this.props.isDoneWorking();
                if (response.body && response.body.status === 'success') {
                    this.props.setLoggedInUser(response.body.data);
                    success('Notification', 'Your subscription has been cancelled');
                    this.props.changeRoute('/subscriptionCancelled');
                    return;
                }
                throw new Error("Unexpected response please try again");
            }).catch((err) => {
                // this.props.stopProgress();
                this.props.isDoneWorking();
                error('Notification', err.message);
            });
        }
    }
    
    handlePlanChange (evt) {
        var data = evt.currentTarget.dataset;
        this.setState({
          selectedPlan: evt.currentTarget.value,
          amount: parseInt(data.amount, 10),
          description: data.description,
        });
    }
    
    render() {
      return (
        <div>
            <div className="white panel">
                <div className="row">
                    <div className="column">
                       <h3>Your Subscription Plan</h3>
                    </div>
                </div>
                <div className="row">
                    { this.props.profile.primaryPlan.length < 1&& <div className="lead">
                    Please select a plan to continue. New users who simply want to test the platform start with <em>Deploy Test</em> then upgrade later to <em>Deploy Pro</em>. Your subscription counts from the begining and you can cancel your plan anytime.
                    </div>}
                    { this.props.profile.primaryPlan.length > 1 && <div className="lead">
                    Your subscription is active! you are currently on <em>{this.props.profile.primaryPlan === "pushdeploy-test" ? "Deploy test" : "Deploy Pro"}</em> When changing plans, the previous plan is cancelled and the new plan takes effect immediately.
                    </div>}
                </div>
                <div className="row upspace">
                    <div className="column">
                       <form className="plan" onSubmit={(evt) => this.onPlanClick(evt)}>
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount={this.props.app_setting.stripePlanAAmount} data-description={this.props.app_setting.stripePlanADesc} value={this.props.app_setting.stripePlanA} name="plan" checked={this.props.profile.primaryPlan === this.props.app_setting.stripePlanA ? this.props.profile.primaryPlan : this.state.selectedPlan===this.props.app_setting.stripePlanA}/> <label> {this.props.app_setting.stripePlanADesc} (Access to provision 1 server, deploy 2 apps, auto deploy)</label>
                           </div>
                        
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount={this.props.app_setting.stripePlanBAmount} data-description={this.props.app_setting.stripePlanBDesc} value={this.props.app_setting.stripePlanB} name="plan" checked={this.props.profile.primaryPlan === this.props.app_setting.stripePlanB ? this.props.profile.primaryPlan : this.state.selectedPlan===this.props.app_setting.stripePlanB}/> <label> {this.props.app_setting.stripePlanBDesc} (<em>Recommended</em>)</label>
                           </div>
                           
                            <div className="row">
                                <button className="button">{ this.props.profile.primaryPlan !== '' ? 'Change Plan' : 'Subscribe'}</button> 
                                { this.props.profile.primaryPlan !== '' && <a href="/" onClick={(evt) => this.onCancelPlanClick(evt)} className="button button-clear">Cancel your subscription</a>}
                            </div>
                       </form>
                    </div>
                </div>
            </div>
        </div>
      )
   }
}

Stripe.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
}

const mapStoreToProps = (storeState) => (
    {
        profile: storeState.profile,
    }
)

const mapDispatchToProps = (dispatch) => (
      {
        isWorking: ()=> dispatch(isWorking()),
        isDoneWorking: ()=> dispatch(isDoneWorking()),
        changeRoute: (route)=> dispatch(changeRoute(route)),
        setLoggedInUser: (payload) => dispatch(UserAction.setLoggedInUser(payload)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Stripe)

// export default Stripe;