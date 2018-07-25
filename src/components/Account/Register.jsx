import React from 'react';
import { connect } from 'react-redux';
import UserAction from '../../actions/UserAction';
import { error } from '../../utils/toastr';
import logo from '../../../assets/images/logo.png';

class Register extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    this.register = this.register.bind(this);
  }
  
  register(evt) {
    evt.preventDefault();
    if(this.props.user.name == null || !this.props.user.name.length){
      return error('Requirements', 'Name is required');
    }
    if(this.props.user.email == null || !this.props.user.email.length){
      return error('Requirements', 'Email is required');
    }
    if(this.props.user.password == null || !this.props.user.password.length){
      return error('Requirements', 'Password is required');
    }
    this.props.register(this.props.user);
  }
  
  render() {
      return (
        <div>
          <div className="outer">
          <div className="middle">
            <div class="row" style={{width: 'auto'}}>
            <div className="column column-50 column-offset-25">
            <center><img src={logo} height="100" alt="PushDeploy"/></center><br/>
            <div className="white panel">
              <form>
                <fieldset>
                  <label htmlFor="name">Name</label>
                  <input placeholder="Kator Bryan" id="name" type="text" value={this.props.user.name} onChange={(e) => this.props.update({name: e.target.value})}/>
                  <label htmlFor="email">Email</label>
                  <input placeholder="support@pushdeploy.io" id="email" type="text" value={this.props.user.email} onChange={(e) => this.props.update({email: e.target.value})}/>
                  <label htmlFor="password">Password</label>
                  <input placeholder="katorbryan@pushdeploy.io" id="password" type="password" value={this.props.user.password} onChange={(e) => this.props.update({password: e.target.value})}/>
                  <input onClick={this.register} className="button-primary" value="Register" type="submit"/>
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
        update: (payload) => dispatch(UserAction.updateDraft(payload)),
        register: (payload) => dispatch(UserAction.register(payload)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(Register)