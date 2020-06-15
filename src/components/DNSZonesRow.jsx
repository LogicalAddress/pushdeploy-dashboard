import React from 'react';
import PropTypes from 'prop-types';
var Link = require('react-router-dom').Link;

class DNSZonesRow extends React.Component {
    render() {
      return (
        <tr>
          <td><Link to={ '/dns/' + this.props.data._id }>{this.props.data.name.toUpperCase()}</Link></td>
          <td>{this.props.data.provider.toUpperCase()}</td>
          <td>{this.props.data.owner.toUpperCase()}</td>
          {/* <td>{this.props.data.created_at}</td> */}
        </tr>
      );
    }
}

DNSZonesRow.propTypes = {
  data: PropTypes.object,
};

export default DNSZonesRow;