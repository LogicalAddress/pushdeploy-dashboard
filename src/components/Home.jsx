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
            {/* <div className="white panel">
                <div className="row">
                    <div className="column">
                        <div className="card o-hidden text-left">
                            <div className="card-body">
                                <div className="row">
                                    <div className="column">
                                        <h3 className="font-weight-bold mb-2">What's New <span className="badge badge-phoenix">new</span>
                                </h3>
                                        <h4 className="mb-4">The most fun you'll ever have building interactive web applications. We guarantee it.</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="column">
                                        <iframe title="youtube" className="col" height="315" src="https://www.youtube.com/embed/MZvmYaFkNJI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className="column mt-4 pt-2">
                                        <p className="font-weight-bold">Try it now:</p>
                                        <ul className="ml-4 pl-2">
                                            <li><a href="https://elixir-lang.org/install.html">Install Elixir</a></li>
                                            <li>Install the Phoenix project generator and create your project
                                                <pre className="p-3 my-3 mr-3 text-white bg-dark">
                                                    <code>$ mix archive.install hex phx_new
        $ mix phx.new demo --live</code></pre>
                                            </li>
                                            <li>
                                                <a href="https://hexdocs.pm/phoenix/installation.html#content">See complete installation instructions</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>*/} 
            
            { !this.props.lock && <div className="white panel">
                <h3>Create Server</h3>
                <ServerProviders />
            </div>}
            <div className="white panel">
                <h3>OAuth Providers</h3>
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
  lock: PropTypes.bool,
}

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.server.servers,
        apps: storeState.app.apps,
        lock: storeState.server.lock,
    }
)

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStoreToProps, mapDispatchToProps)(Home)