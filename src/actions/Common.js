import Constants from '../Constants.js';
import { push } from 'connected-react-router';

export const isWorking = () => ({ type: Constants.ISWORKING });

export const isDoneWorking = () => ({ type: Constants.ISDONEWORKING });

export const updatePlan = (plan) => ({type: Constants.UPDATE_PLAN, payload: plan});


export const changeRoute = (route) => (dispatch) => {
  dispatch(push(route));
};

export const setActiveApp = (app) => ({type: Constants.SET_ACTIVE_APP, payload: app});

export const updateActiveApp = (app) => ({type: Constants.UPDATE_ACTIVE_APP, payload: app});

export const setActiveServer = (server) => ({type: Constants.SET_ACTIVE_SERVER, payload: server});

export const updateActiveServer = (server) => ({type: Constants.UPDATE_ACTIVE_SERVER, payload: server});