import Constants from '../Constants.js';
import { push } from 'connected-react-router';

export const isWorking = () => ({ type: Constants.ISWORKING });

export const isDoneWorking = () => ({ type: Constants.ISDONEWORKING });

export const updatePlan = (plan) => ({type: Constants.UPDATE_PLAN, payload: plan});

export const changeRoute = (route) => (dispatch) => {
  dispatch(push(route));
};