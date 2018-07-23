import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import req from '../../api/req.js';
import {error, success} from '../../utils/toastr';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {isWorking, isDoneWorking, updatePlan } from '../../actions/Common';
import Constants from '../../Constants';

class Stripe extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            amount: 4999,
            selectedPlan: Constants.PLAN_BASIC_MONTHLY,
            description: Constants.PLAN_BASIC_MONTHLY_DESC,
        };
        this.handlePlanChange = this.handlePlanChange.bind(this);
    }
    
    onToken = (stripeToken) => {
        this.props.isWorking();
        let payload = { ...stripeToken, ...this.state };
        req.post('/v1/subscribe', payload)
            .then((response) => {
                console.log("DEBUG", response);
                return response.json();
            }).then((response) => {
                this.props.isDoneWorking();
                if (response.status) {
                    this.props.updatePlan({
                        primaryPlan: this.state.selectedPlan
                    });
                    success("Congrats!", 'You can start launching your apps now');
                    // this.history.pushState(null, '/');
                    return;
                }
                error("Damn!", "something unexpected occured");
                console.log("DEBUG", response);
                throw new Error("Unexpected response please try again");
            }).catch((err) => {
                // this.props.stopProgress();
                this.props.isDoneWorking();
                error("Damn!", err.message);
            });
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
        var user = this.props.user;
        var stripeKey = this.props.app_setting.stripeKey;
        // console.log(this.props.profile)
      return (
        <div>
            <div className="white panel">
                <div className="row">
                    <div className="column">
                       <h3>Your Subscription Plan</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="lead">
                    When changing plans, the time remaining on the current billing period will be prorated. 
                    </div>
                </div>
                <div className="row upspace">
                    <div className="column">
                       <form className="plan" onSubmit={(evt) => evt.preventDefault()}>
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="499" data-description={Constants.PLAN_BASIC_MONTHLY_DESC} value={Constants.PLAN_BASIC_MONTHLY} name="plan" checked={this.props.profile.primaryPlan === Constants.PLAN_BASIC_MONTHLY ? this.props.profile.primaryPlan : this.state.selectedPlan===Constants.PLAN_BASIC_MONTHLY}/> <label>{Constants.PLAN_BASIC_MONTHLY_DESC}</label>
                           </div>
                        
                           <div className="row">
                               <input type="radio" onChange={this.handlePlanChange} data-amount="4999" data-description={Constants.PLAN_BASIC_YEARLY_DESC} value={Constants.PLAN_BASIC_YEARLY} name="plan" checked={this.props.profile.primaryPlan === Constants.PLAN_BASIC_YEARLY ? this.props.profile.primaryPlan : this.state.selectedPlan===Constants.PLAN_BASIC_YEARLY}/> <label>Deploy Basic (<em>$49.99 / Year - Save $10.01 Per Year!</em>)</label>
                           </div>
                           
                            <div className="row">
                                <StripeCheckout name="PushDeploy" amount={this.state.amount} description={this.state.description} email={user.email} currency="USD" locale="en" token={this.onToken} stripeKey={stripeKey}>
                                    <button className="button">{ this.props.profile.primaryPlan !== '' ? 'Change Plan' : 'Subscribe'}</button>
                                </StripeCheckout>
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
        updatePlan: (plan) => dispatch(updatePlan(plan)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Stripe)

// export default Stripe;