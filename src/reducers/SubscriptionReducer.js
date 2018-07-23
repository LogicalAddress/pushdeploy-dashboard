
import constants from '../Constants';

let initialState = {
  plan: '',
  plan_type: '',
  amount: 0,
  plan_slug: '', //as registered on stripe
  currency: '',
};

const initialAction = { type: 'initial state'}

const Subscription = (state = initialState, action = initialAction) => {
    
  switch (action.type) {
    case constants.SUBSCRIBE_PLAN_SUCCESS:
      return {...state, ...action.payload }
    case constants.SUBSCRIBE_PLAN_ERROR:
        return state
    case constants.CHANGE_PLAN_SUCCESS:
      return {...state, ...action.payload }
    case constants.CHANGE_PLAN_ERROR:
      return state
    case constants.FETCH_SUBSCRIPTION:
      return {...state, ...action.payload};
    case constants.FETCH_SUBSCRIPTION_SUCCESS:
      return {...state, ...action.payload};
    case constants.FETCH_SUBSCRIPTION_ERROR:
        return state
    default:
      return state;
  }
}

export default Subscription();