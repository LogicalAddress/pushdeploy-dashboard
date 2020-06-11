import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {error, success} from '../../utils/toastr';
import req from '../../api/req.js';
import {isWorking, isDoneWorking } from '../../actions/Common';
import UserAction from '../../actions/UserAction';
import logo from '../../assets/images/logo.png';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerifying: true,
            tokenIsGood: false,
            tokenisBad: false,
            email: null,
            newpassword: '',
            cpassword: '',
        };
        this.resetPassword = this.resetPassword.bind(this);
    }
    componentDidMount() {
        this.props.isWorking();
        req.post('/v1/user/passwordRecovery', {token: this.props.match.params.token})
        .then((response) => {
          return response.json();
        }).then((response) => {
          this.props.isDoneWorking();
          this.setState({isVerifying: false});
          if (response.body.status === "success") {
              success("Notification", "Account verification successful");
              this.setState({tokenIsGood: true});
              this.setState({email: response.body.data.email})
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

    resetPassword(evt) {
        evt.preventDefault();
        if(this.state.email == null || !this.state.email.length){
          return error('Requirements', 'Email is required');
        }
        if(this.state.newpassword == null || !this.state.newpassword.length){
          return error('Requirements', 'New password is required');
        }

        if(this.state.cpassword == null || !this.state.cpassword.length || this.state.cpassword !== this.state.newpassword){
            return error('Requirements', 'Passwords do not match');
        }

        this.props.isWorking();
        req.post('/v1/user/resetPassword', {email: this.state.email, newpassword: this.state.newpassword, cpassword: this.state.cpassword})
        .then((response) => {
          return response.json();
        }).then((response) => {
          this.props.isDoneWorking();
          if (response.body.status === "success") {
            this.props.authenticate({email: this.state.email, password: this.state.newpassword});
            return;
          }
          error('Notification', response.body.message || "Unable to reset your password");
          console.log("DEBUG", response);
        }).catch((err) => {
            this.props.isDoneWorking();
            error('Notification', err.message);
        });

      }


      render() {
        return (
          <div>
            <div className="outer">
            <div className="middle">
              <div className="row" style={{width: 'auto'}}>
              <div className="column column-50 column-offset-25">
              <center><img src={logo} height="100" alt="pushdeploy.io"/></center><br/>
              <div className="white panel">
                { this.state.isVerifying && <h3>Checking your account...</h3>}
                { this.state.tokenisBad && <div className="row">
                    <div className="column">
                        <p className="lead">We are unable to verify your account. ;-(</p>
                    </div>
                </div>}
                { this.state.tokenIsGood && <div>
                <h1>Reset Password</h1>
                <form>
                  <fieldset>
                    <label htmlFor="password">New Password</label>
                    <input placeholder="P@55w0rd" id="password" type="password" value={this.state.password} onChange={(e) => this.setState({newpassword: e.target.value})}/>
                    <label htmlFor="cpassword">Password Again</label>
                    <input placeholder="P@55w0rd" id="cpassword" type="password" value={this.state.password} onChange={(e) => this.setState({cpassword: e.target.value})}/>
                    <input disabled={this.state.email === null} onClick={this.resetPassword} className="button-primary" value="Reset Password" type="submit"/>
                  </fieldset>
                </form>
                </div>}
             </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        );
    }
}

ResetPassword.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
    authenticate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    isWorking: ()=> dispatch(isWorking()),
    isDoneWorking: ()=> dispatch(isDoneWorking()),
    authenticate: (payload) => dispatch(UserAction.login(payload)),
})


export default connect(null, mapDispatchToProps)(ResetPassword)