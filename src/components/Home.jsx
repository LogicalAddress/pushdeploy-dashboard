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