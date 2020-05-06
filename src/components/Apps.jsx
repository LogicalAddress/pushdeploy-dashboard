import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppTable from './AppTable';

class Apps extends React.Component {
    
    render() {
      return (
        <div>
            <div className="white panel">
                <h3>Your Apps</h3>
                <div className="row">
                    <div className="column">
                        <AppTable apps={this.props.apps}/>
                    </div>
                </div>
            </div>
        </div>
      )
   }
}

Apps.propTypes = {
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


export default connect(mapStoreToProps, mapDispatchToProps)(Apps)