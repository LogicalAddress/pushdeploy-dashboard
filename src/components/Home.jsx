import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ServerProviders from './ServerProviders.jsx';
import ServerTable from './ServerTable.jsx';
// import AppTable from './AppTable';
import OAuthProviders from './OAuthProviders.jsx';

class Home extends React.Component {
    
    render() {
      return (
        <div>
            <div className="white panel">
                <div className="row">
                    <div className="column">
                        <div className="card o-hidden text-left">
                            <div className="card-body">
                                <div className="row">
                                    <div className="column">
                                        <h3 className="font-weight-bold mb-2">Getting Started <span className="badge badge-phoenix">highlights</span>
                                </h3>
                                        <h4 className="mb-4">The most cost effective and easiest way to deploy node.js web applications. We guarantee it.</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="column">
                                        <iframe title="youtube" className="col" width="100%" height="315" src="https://www.youtube.com/embed/YouqYGdfBeQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                    <div className="column mt-4 pt-2">
                                        <p className="font-weight-bold">The highlights:</p>
                                        <ul className="ml-4 pl-2">
                                            <li>Amazon Compute Cloud (EC2)</li>
                                            <li>Setup any custom server</li>
                                            <li>Get support at <a href="mailto:support@pushdeploy.io">support@pushdeploy.io</a></li>
                                            <li><a href="https://twitter.com/pushdeploy">Tweet at @pushdeploy for questions, info and updates</a></li>
                                            <li><a href="https://www.youtube.com/channel/UCZuW4Ne3l7PSJsfBBeb9x0A">Watch more videos on our youtube channel</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
           <div className="white panel">
                <h3>Create Server</h3>
                <p className="lead">Access keys are needed to setup aws ec2 and to setup a custom server, a fresh installation of Ubuntu 16.04 x64 is needed with a super user</p>
                <ServerProviders />
            </div>
            <div className="white panel">
                <h3>OAuth Providers</h3>
                <p className="lead">Connecting your pushdeploy account to your git providers is neccessary for pushdeploy to deploy from private repositories.</p>
                <OAuthProviders />
            </div>
            <div className="white panel">
                <h3>Servers</h3>
                <div className="row">
                    <div className="column">
                        <ServerTable servers={this.props.servers}/>
                    </div>
                </div>
            </div>
        </div>
      )
   }
}

Home.propTypes = {
  servers: PropTypes.array,
  apps: PropTypes.array,
}

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.servers,
        apps: storeState.apps,
    }
)

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStoreToProps, mapDispatchToProps)(Home)