import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import req from '../api/req.js';
import io from "socket.io-client";
import {error, success} from '../utils/toastr';
import constants from '../Constants';
import { Link } from 'react-router-dom';

class SubHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPaymentFix: false,
        };

        this.socket = io.connect(constants.API_URL, {
            query: {
              token: req.getJwt(),
              uid: req.getUid(),
            }
        });
    }

    componentDidMount(){
        this.socket.on('PAYMENT_FAILED', (data) => {
            this.setState({showPaymentFix: true});
        });
        this.socket.on('PAYMENT_SUCCESS', (data) => {
            this.setState({showPaymentFix: false});
        });
    }

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
            {(this.props.profile.chargeFailed === true || this.state.showPaymentFix === true) && <div className="white panel"><p className="lead">There's a problem with your payment. <Link to={"/account/plans"}>Click to update your card</Link></p></div> }
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