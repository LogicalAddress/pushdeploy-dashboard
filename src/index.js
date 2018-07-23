import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';

import Launcher from './components/Launcher.jsx';
import Home from './components/Home.jsx';
import Server from './components/Server.jsx';
import App from './components/App.jsx';
import reduxStore from './store/Config';
import Account from './components/Account.jsx';
import SelectPlan from './components/Account/SelectPlan.jsx';
import ChangePlan from './components/Account/ChangePlan.jsx';
import { Provider } from 'react-redux';

import  './lib/toastr.min.css';


ReactDom.render((
    <Provider store={reduxStore}>
        <Router history={hashHistory}>
            <Launcher>
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/dashboard" component={Home} />
                <Route exact={true} path="/server/:id" component={Server} />
                <Route exact={true} path="/server/:server_id/app/:id" component={App} />
                <Route exact={true} path="/account" component={Account} />
                <Route exact={true} path="/account/plans" component={ChangePlan} />
                <Route exact={true} path="/plans" component={SelectPlan} />
            </Launcher>
        </Router>
    </Provider>
), document.getElementById('app'));