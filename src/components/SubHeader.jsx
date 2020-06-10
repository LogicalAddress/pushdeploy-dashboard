import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import req from '../api/req.js';
import {error, success} from '../utils/toastr';

class SubHeader extends React.Component {

    resendConfirmationLink(e){
        e.preventDefault();
        req.post('/v1/user/resend-confirmLink', {})
        .then((response) => {
          return response.json();
        }).then((response) => {
            if (response.body.status === "success") {
                success("Notification", "Check your email");
                return;
            }
            error('Notification', "Unable to resend account verification link, please try again later.");
            console.log("DEBUG", response);
        }).catch((err) => {
            error('Notification', err.message);
        });
    }

    render() {
        return (
          <div>
            {this.props.profile.verified_email === false && <div className="white panel"><p className="lead">Check your email. You have not verified your mail. Kindly verify to have access to all pushdeploy features. <a href="" onClick={this.resendConfirmationLink}>Resend Link</a></p></div> }
            <div className="clear"></div>
        </div>     
        );
    }
}

SubHeader.propTypes = {
  loggedIn: PropTypes.bool,
  profile: PropTypes.object.isRequired,
}

const mapStoreToProps = (storeState) => (
    {
        user: storeState.user,
        profile: storeState.profile,
    }
)

const mapDispatchToProps = (storeState) => (
      {

      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(SubHeader)