import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ServerTable from './ServerTable.jsx';

class Servers extends React.Component {
    
    render() {
      return (
        <div>
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

Servers.propTypes = {
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


export default connect(mapStoreToProps, mapDispatchToProps)(Servers)