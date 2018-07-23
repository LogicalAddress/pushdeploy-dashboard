import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ServerProviders from './ServerProviders.jsx';
import ServerTable from './ServerTable.jsx';
import OAuthProviders from './OAuthProviders.jsx';

class Home extends React.Component {
    
    render() {
        // console.log(this.props.servers)
      return (
        <div>
            <div className="white panel">
                <h3>Create Server</h3>
                <ServerProviders />
            </div>
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
}

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.servers,
    }
)

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStoreToProps, mapDispatchToProps)(Home)