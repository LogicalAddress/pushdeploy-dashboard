import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {error, success} from '../utils/toastr';
import req from '../api/req.js';
import {isWorking, isDoneWorking } from '../actions/Common';
import CredentialsAction from '../actions/CredentialsAction';

class ConfirmAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerifying: true,
            tokenIsGood: false,
            tokenisBad: false,
        };
    }
    componentDidMount() {
        const { location: { search } } = this.props;
        this.props.isWorking();
        req.post('/v1/user/confirmAccount', {code: this.props.match.params.code})
        .then((response) => {
          return response.json();
        }).then((response) => {
          this.props.isDoneWorking();
          this.setState({isVerifying: false});
          if (response.body.status === "success") {
              success("Notification", "Verification Successful");
              this.setState({tokenIsGood: true});
              this.props.fetchUserCredentials();
              return;
          }
          error('Notification', "Unable to verify token");
          console.log("DEBUG", response);
          this.setState({tokenisBad: true});
        }).catch((err) => {
            this.props.isDoneWorking();
            this.setState({isVerifying: false});
            error('Notification', err.message);
        });
    }

    render() {
      return (
        <div>
            <div className="white panel">
                <h3>Activating your account...</h3>
                { this.state.tokenIsGood && <div className="row">
                    <div className="column">
                        <p className="lead">Congratulations! Your account has been activated</p>
                    </div>
                </div>}
                { this.state.tokenisBad && <div className="row">
                    <div className="column">
                        <p className="lead">We are unable to verify your account. ;-(</p>
                    </div>
                </div>}
            </div>
        </div>
      )
   }
}

ConfirmAccount.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
    fetchUserCredentials: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    isWorking: ()=> dispatch(isWorking()),
    isDoneWorking: ()=> dispatch(isDoneWorking()),
    fetchUserCredentials: () => dispatch(CredentialsAction.fetchUserCredentials()),
})


export default connect(null, mapDispatchToProps)(ConfirmAccount)