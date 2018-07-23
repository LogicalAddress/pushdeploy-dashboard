import React from 'react';
import Profile from './Account/Profile.jsx';
import AccountSideBar from './Account/AccountSideBar.jsx';

class Account extends React.Component {

    render() {
      return (
         <div className="container">
            <div className="row">
                <div className="column column-20">
                    <AccountSideBar />
                </div>
                <div className="column column-80">
                    <Profile />
                </div>
            </div>
         </div>
      )
   }
}

export default Account;