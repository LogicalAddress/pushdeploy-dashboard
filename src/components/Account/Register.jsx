import React from 'react';
import { connect } from 'react-redux';
import UserAction from '../../actions/UserAction';
import { error } from '../../utils/toastr';
import logo from '../../assets/images/logo.png';
import req from '../../api/req.js';
import ReCAPTCHA from "react-google-recaptcha";

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      recaptcha: null,
    };
    this.register = this.register.bind(this);
  }

  componentDidMount(){
    req.get('/v1/user')
    .then((response) => {
        return response.json();
    }).then((response) => {
      if (response.body && response.body.status === 'success') {
        this.props.changeRoute('/');
      }
    });
  }
  
  register(evt) {
    evt.preventDefault();
    if(this.state.name == null || !this.state.name.length){
      return error('Requirements', 'Name is required');
    }
    if(this.state.email == null || !this.state.email.length){
      return error('Requirements', 'Email is required');
    }
    if(this.state.password == null || !this.state.password.length){
      return error('Requirements', 'Password is required');
    }
    this.props.register(this.state);
  }
  
  render() {
      return (
        <div>
          <div className="outer">
          <div className="middle">
            <div className="row" style={{width: 'auto'}}>
            <div className="column column-50 column-offset-25">
            <center><img src={logo} height="100" alt="PushDeploy"/></center><br/>
            <div className="white panel">
              <h1>Register</h1>
              <form>
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input placeholder="Kator Bryan" id="name" type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                  <label htmlFor="email">Email</label>
                  <input placeholder="support@pushdeploy.io" id="email" type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value, mobileNumber: e.target.value})}/>
                  <label htmlFor="password">Password</label>
                  <input placeholder="P@55w0rd" id="password" type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                  <ReCAPTCHA
                    sitekey="6LdWefMUAAAAADeh0hCJLmm6Ga96rRgG0F7cmvZ5"
                    onChange={(val) => this.setState({recaptcha: val})}
                  /><br/>
                  <div className="float-right">
                    <a href="/login">Login here</a>
                  </div>
                  <input disabled={this.state.recaptcha === null} onClick={this.register} className="button-primary" value="Register" type="submit"/>
                </fieldset>
              </form>
           </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      );
  }
}

Register.propTypes = {
    
};

const mapStoreToProps = (storeState) => (
    {
        user: storeState.user,
    }
)
    
const mapDispatchToProps = (dispatch) => (
      {
        register: (payload) => dispatch(UserAction.register(payload)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Register)