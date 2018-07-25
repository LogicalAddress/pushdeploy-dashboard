// eslint-disable-next-line
import React from 'react';
import ReactDom from 'react-dom'; // eslint-disable-next-line
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';
import Launcher from './components/Launcher.jsx';
import Home from './components/Home.jsx';
import Databases from './components/Databases.jsx';
import Server from './components/Server.jsx';
import App from './components/App.jsx';
import { reduxStore, history } from './store/Config';
import Account from './components/Account.jsx';
import SelectPlan from './components/Account/SelectPlan.jsx';
import ChangePlan from './components/Account/ChangePlan.jsx';
import { Provider } from 'react-redux';
import Login from './components/Account/Login.jsx';
import Register from './components/Account/Register.jsx';
import { ConnectedRouter } from 'connected-react-router';
import  './lib/toastr.min.css';

ReactDom.render((
    <Provider store={reduxStore}>
        {/*<Router history={hashHistory}>*/}
        <ConnectedRouter history={history}>
            <Launcher>
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/server/:id" component={Server} />
                <Route exact={true} path="/server/:server_id/app/:id" component={App} />
                <Route exact={true} path="/account" component={Account} />
                <Route exact={true} path="/account/plans" component={ChangePlan} />
                <Route exact={true} path="/plans" component={SelectPlan} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/register" component={Register} />
                <Route exact={true} path="/databases/:id" component={Databases}/>
            </Launcher>
        </ConnectedRouter>
    </Provider>
), document.getElementById('app'));