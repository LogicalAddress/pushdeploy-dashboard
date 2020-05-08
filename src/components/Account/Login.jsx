import React from 'react';
import { connect } from 'react-redux';
import UserAction from '../../actions/UserAction';
import { changeRoute } from '../../actions/Common';
import { error } from '../../utils/toastr';
import logo from '../../assets/images/logo.png';
import req from '../../api/req.js';
// var Link = require('react-router-dom').Link;

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    req.get('/v1/user')
    .then((response) => {
        return response.json();
    }).then((response) => {
      if (response.body && response.body.status === 'success') {
        this.props.changeRoute('/');
      }
    }).catch((err)=>{
      //be silent
    });;
  }
  
  login(evt) {
    evt.preventDefault();
    if(this.state.email == null || !this.state.email.length){
      return error('Requirements', 'Email is required');
    }
    if(this.state.password == null || !this.state.password.length){
      return error('Requirements', 'Password is required');
    }
    this.props.authenticate(this.state); 
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
              <h1>Login</h1>
              <form>
                <fieldset>
                  <label htmlFor="email">Email</label>
                  <input placeholder="support@pushdeploy.io" id="email" type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                  <label htmlFor="password">Password</label>
                  <input placeholder="P@55w0rd" id="password" type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                  <div className="float-right">
                    <a href="/register">Register here</a>
                  </div>
                  <input onClick={this.login} className="button-primary" value="Login" type="submit"/>
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

    
const mapDispatchToProps = (dispatch) => (
      {
        update: (payload) => dispatch(UserAction.updateDraft(payload)),
        authenticate: (payload) => dispatch(UserAction.login(payload)),
        changeRoute: (route)=> dispatch(changeRoute(route)),
      }
    );

export default connect(null, mapDispatchToProps)(Login)