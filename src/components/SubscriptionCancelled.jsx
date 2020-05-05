import React from 'react';

class SubscriptionCancelled extends React.Component {
    render() {
      return (
        <div>
            <div className="white panel">
                <h3>Your subscription is deactivated</h3>
                <div className="row">
                    <div className="column">
                        <p className="lead">You will no longer be charged. Your account is still active should you want to subscribe again ;-(</p>
                    </div>
                </div>
            </div>
        </div>
      )
   }
}

export default SubscriptionCancelled