import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class DNSRecordsRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.data.label === '@' ? '': `${this.props.data.label}.`}{this.props.data.name}</td>
          {/* <td>{this.props.data.class}</td> */}
          <td>{this.props.data.type}</td>
          <td>{this.props.data.ttl}</td>
          <td>{this.props.data.rdata}</td>
          {/* <td>{this.props.data.created_at}</td> */}
          <td><a href="/dns/records" onClick={(e)=>this.props.delete(e, this.props.data._id)} data-id={this.props.data._id}><FontAwesomeIcon icon={faTrash } color="#9b4dca"/></a></td>
        </tr>
      );
    }
}

DNSRecordsRow.propTypes = {
  data: PropTypes.object,
  delete: PropTypes.func,
};

export default DNSRecordsRow;