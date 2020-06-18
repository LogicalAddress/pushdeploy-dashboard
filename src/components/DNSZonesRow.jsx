import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
var Link = require('react-router-dom').Link;

class DNSZonesRow extends React.Component {
    render() {
      return (
        <tr>
          <td><Link to={ '/dns/' + this.props.data._id }>{this.props.data.name.toUpperCase()}</Link></td>
          <td>{this.props.data.app && this.props.data.app._id && <Link to={`/apps/${this.props.data.app._id}`}>{this.props.data.app.app_name.toUpperCase()}</Link> }</td>
          <td>{this.props.data.provider.toUpperCase()}</td>
          <td>{this.props.data.owner.toUpperCase()}</td>
          {/* <td>{this.props.data.created_at}</td> */}
          <td><a href="/dns/zones" onClick={(e)=>this.props.delete(e, this.props.data._id)} data-id={this.props.data._id}><FontAwesomeIcon icon={faTrash } color="#9b4dca"/></a></td>
        </tr>
      );
    }
}

DNSZonesRow.propTypes = {
  data: PropTypes.object,
};

export default DNSZonesRow;