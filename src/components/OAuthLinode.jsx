import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {error, success} from '../utils/toastr';
import req from '../api/req.js';
import {isWorking, isDoneWorking } from '../actions/Common';
import CredentialsAction from '../actions/CredentialsAction';
import queryString from 'query-string';

class OAuthLinode extends React.Component {
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
        let params = queryString.parse(search);
        req.post('/v1/oauth2/linode/create', {code: params.code})
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
                <h3>Connecting your linode account to pushdeploy</h3>
                { this.state.tokenIsGood && <div className="row">
                    <div className="column">
                        <p className="lead">Pushdeploy is now connected to linode. You can now create servers via the provider.</p>
                    </div>
                </div>}
                { this.state.tokenisBad && <div className="row">
                    <div className="column">
                        <p className="lead">Pushdeploy failed to connect to your linode, please try again. ;-(</p>
                    </div>
                </div>}
            </div>
        </div>
      )
   }
}

OAuthLinode.propTypes = {
    isWorking: PropTypes.func,
    isDoneWorking: PropTypes.func,
    fetchUserCredentials: PropTypes.func.isRequired,
}

// const mapStoreToProps = (storeState) => (
//     {
        
//     }
// )

const mapDispatchToProps = (dispatch) => ({
    isWorking: ()=> dispatch(isWorking()),
    isDoneWorking: ()=> dispatch(isDoneWorking()),
    fetchUserCredentials: () => dispatch(CredentialsAction.fetchUserCredentials()),
})


export default connect(null, mapDispatchToProps)(OAuthLinode)