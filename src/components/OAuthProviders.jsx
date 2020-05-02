import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OAuthProviders extends React.Component {
  
    linodeOauth(){
      /* global window */window.location.href = "https://login.linode.com/oauth/authorize?client_id=140b793de74fd3d1e7c1&scope=linode:create&response_type=code&allow_signup=false"
    }
    
    githubOauth(){
      /* global window */window.location.href = "https://github.com/login/oauth/authorize?client_id="+ this.props.app_setting.githubPublicKey + "&scope=repo,admin:repo_hook&response_type=code&allow_signup=false";
    }
    
    bitbucketOauth(){
      /* global window */window.location.href = "https://bitbucket.org/site/oauth2/authorize?client_id="+ this.props.app_setting.bitbucketPublicKey + "&response_type=code"
    }
    
    awsOauth(){
      // do nothing
    }
    render() {
        return (
        <div>
          <div className="row">
            <div className="column">
              <center>
        {/*<button className="button button-outline" onClick={() => this.linodeOauth() } disabled={this.props.credentials.linode_username}>{this.props.credentials.linode_username ? 'Linode Connected' : 'Connect Linode' }</button>*/} <button className="button button-outline" onClick={() => this.awsOauth() } disabled={this.props.credentials.aws_access_key}>{this.props.credentials.aws_access_key ? 'AWS Connected' : 'Connect AWS'}</button> { this.props.app_setting.githubPublicKey.length > 0 && <button className="button button-outline" onClick={() => this.githubOauth() } disabled={this.props.credentials.github_username}>{this.props.credentials.github_username ? 'GitHub Connected' : 'Connect Github'}</button>} { this.props.app_setting.bitbucketPublicKey.length > 0 && <button onClick={() => this.bitbucketOauth() } className="button button-outline" disabled={this.props.credentials.bitbucket_username}>{this.props.credentials.bitbucket_username ? 'Bitbucket Connected' : 'Connect Bitbucket'}</button>}
              </center>
            </div>
          </div>
        </div>
        );
    }
}

OAuthProviders.propTypes = {
  credentials: PropTypes.object,
  app_setting: PropTypes.object,
}

const mapStoreToProps = (storeState) => (
    {
        credentials: storeState.credentials,
        app_setting: storeState.app_setting,
    }
)

const mapDispatchToProps = (dispatch) => ({

})

// export default OAuthProviders;
export default connect(mapStoreToProps, mapDispatchToProps)(OAuthProviders)