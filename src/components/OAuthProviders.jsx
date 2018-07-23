import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OAuthProviders extends React.Component {
  
    linodeOauth(){
      /* global location */location.href = "https://login.linode.com/oauth/authorize?client_id=f99ebdd78b0b371d4279&scope=linode:create&response_type=code&allow_signup=false"
    }
    
    githubOauth(){
      /* global location */location.href = "https://github.com/login/oauth/authorize?client_id=f99ebdd78b0b371d4279&scope=repo,admin:repo_hook&response_type=code&allow_signup=false";
    }
    
    bitbucketOauth(){
      /* global location */location.href = "https://bitbucket.org/site/oauth2/authorize?client_id=79Yb8fD76QtuzAnZKe&response_type=code"
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
                <button className="button button-outline" onClick={() => this.linodeOauth() } disabled={this.props.credentials.linode_username}>{this.props.credentials.linode_username ? 'Linode Connected' : 'Connect Linode' }</button> <button className="button button-outline" onClick={() => this.awsOauth() } disabled={this.props.credentials.aws_access_key}>{this.props.credentials.aws_access_key ? 'AWS Connected' : 'Connect AWS'}</button> <button className="button button-outline" onClick={() => this.githubOauth() } disabled={this.props.credentials.github_username}>{this.props.credentials.github_username ? 'GitHub Connected' : 'Connect Github'}</button> <button onClick={() => this.bitbucketOauth() } className="button button-outline" disabled={this.props.credentials.bitbucket_username}>{this.props.credentials.bitbucket_username ? 'Bitbucket Connected' : 'Connect Bitbucket'}</button>
              </center>
            </div>
          </div>
        </div>
        );
    }
}

OAuthProviders.propTypes = {
  credentials: PropTypes.object,
}

const mapStoreToProps = (storeState) => (
    {
        credentials: storeState.credentials,
    }
)

const mapDispatchToProps = (dispatch) => ({

})

// export default OAuthProviders;
export default connect(mapStoreToProps, mapDispatchToProps)(OAuthProviders)