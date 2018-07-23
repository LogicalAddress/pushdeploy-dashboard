import { dispatchAsync } from '../ReduxDispatcher';
import Constants from '../Constants.js';
import SubscriptionAPI from '../api/SubscriptionAPI.js';

let SubscriptionAction = {
  
  subscribe(subscription) {
    return (dispatch) => {
      dispatchAsync(SubscriptionAPI.subscribe, dispatch, {
        request: Constants.SUBSCRIBE_PLAN,
        success: Constants.SUBSCRIBE_PLAN_SUCCESS,
        failure: Constants.SUBSCRIBE_PLAN_ERROR
      }, subscription);
    };
  },
  
  changePlan(subscription, profile) {
    console.log("UNUSED", profile);
    return (dispatch) => {
      dispatchAsync(SubscriptionAPI.changePlan, dispatch, {
        request: Constants.CHANGE_PLAN,
        success: Constants.CHANGE_PLAN_SUCCESS,
        failure: Constants.CHANGE_PLAN_ERROR
      }, subscription);
    };
  },

  fetchSubscription(profile, plan_type = 'primary'){
    return (dispatch) => dispatch({
      type: Constants.FETCH_SUBSCRIPTION, 
      payload: Object.assign({}, {
        plan: (plan_type === 'primary' ? (profile.primaryPlan ? profile.primaryPlan : '' ) : (profile.secondaryPlan ? profile.secondaryPlan : '')),
        plan_type,
      })});
  },
  
};

export default SubscriptionAction;