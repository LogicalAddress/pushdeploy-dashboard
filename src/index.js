// eslint-disable-next-line
import React from 'react';
import ReactDom from 'react-dom'; // eslint-disable-next-line
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';
import Launcher from './components/Launcher.jsx';
import Home from './components/Home.jsx';
import Database from './components/Database.jsx';
import Settings from './components/Settings.jsx';
import AppSettings from './components/AppSettings.jsx';
import Server from './components/Server.jsx';
import Servers from './components/Servers.jsx';
import App from './components/App.jsx';
import Apps from './components/Apps.jsx';
import { reduxStore, history } from './store/Config';
import Account from './components/Account.jsx';
import SelectPlan from './components/Account/SelectPlan.jsx';
import ChangePlan from './components/Account/ChangePlan.jsx';
import { Provider } from 'react-redux';
import Login from './components/Account/Login.jsx';
import Register from './components/Account/Register.jsx';
import { ConnectedRouter } from 'connected-react-router';
import OAuthGithub from './components/OAuthGithub.jsx';
import OAuthBitbucket from './components/OAuthBitbucket';
import OAuthLinode from './components/OAuthLinode.jsx';
import SubscriptionSuccess from './components/SubscriptionSuccess';
import SubscriptionCancelled from './components/SubscriptionCancelled';
import ConfirmAccount from './components/Account/ConfirmAccount';
import PasswordRecovery from './components/Account/PasswordRecovery';
import ResetPassword from './components/Account/ResetPassword';
import DNSZones from './components/DNSZones';
import DNSRecords from './components/DNSRecords';

import  './lib/toastr.min.css';

ReactDom.render((
    <Provider store={reduxStore}>
        {/*<Router history={hashHistory}>*/}
        <ConnectedRouter history={history}>
            <Launcher>
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/server/:id" component={Server} />
                <Route exact={true} path="/servers" component={Servers} />
                <Route exact={true} path="/apps" component={Apps} />
                <Route exact={true} path="/apps/:id" component={App} />
                <Route exact={true} path="/account" component={Account} />
                <Route exact={true} path="/account/plans" component={ChangePlan} />
                <Route exact={true} path="/plans" component={SelectPlan} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/register" component={Register} />
                <Route exact={true} path="/databases/:id" component={Database}/>
                <Route exact={true} path="/settings/:id" component={Settings}/>
                <Route exact={true} path="/appSettings/:id" component={AppSettings}/>
                <Route exact={true} path="/oauth2/github" component={OAuthGithub} />
                <Route exact={true} path="/oauth2/bitbucket" component={OAuthBitbucket} />
                <Route exact={true} path="/oauth2/linode" component={OAuthLinode} />
                <Route exact={true} path="/confirm" component={SubscriptionSuccess} />
                <Route exact={true} path="/subscriptionCancelled" component={SubscriptionCancelled} />
                <Route exact={true} path="/confirmAccount/:code" component={ConfirmAccount}/>
                <Route exact={true} path="/password-recovery" component={PasswordRecovery}/>
                <Route exact={true} path="/reset-password/:token" component={ResetPassword}/>
                <Route exact={true} path="/dns" component={DNSZones} />
                <Route exact={true} path= "/dns/:id" component={DNSRecords} />
            </Launcher>
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));