import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.png';
import req from '../../api/req.js';
import {error, success} from '../../utils/toastr';
import {isWorking, isDoneWorking } from '../../actions/Common';

class PasswordRecovery extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      sent: false,
    };
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  componentDidMount(){

  }
  
  forgotPassword(evt) {
    evt.preventDefault();
    if(this.state.email == null || !this.state.email.length){
      return error('Requirements', 'Email is required');
    }
    this.props.isWorking();
    req.post('/v1/user/recoverPassword', {email: this.state.email})
    .then((response) => {
        return response.json();
    }).then((response) => {
        this.props.isDoneWorking();
        if (response.body.status === "success") {
            success("Notification", "Check your email for recovery instructions");
            this.setState({sent: true});
            return;
        }
        error('Notification', "Unable deploy this app");
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
              <h1>Forgot Password</h1>
              { !this.state.sent && <form>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <input placeholder="support@pushdeploy.io" id="email" type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                  <div className="float-right">
                  <a href="/login">Login</a> | <a href="/register">Register</a>
                  </div>
                  <input onClick={this.forgotPassword} className="button-primary" value="Reset Password" type="submit"/>
                </fieldset>
              </form>}
              { this.state.sent && <p className="lead">Check your email for recovery instructions. Return to <a href="/login">Home</a> </p>}
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      );
  }
}

PasswordRecovery.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
};

    
const mapDispatchToProps = (dispatch) => (
      {
        isWorking: ()=> dispatch(isWorking()),
        isDoneWorking: ()=> dispatch(isDoneWorking()),
      }
    );

export default connect(null, mapDispatchToProps)(PasswordRecovery)