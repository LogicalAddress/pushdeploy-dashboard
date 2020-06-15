import React from 'react';
import PropTypes from 'prop-types';

class DNSRecordsRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.label}</td>
          {/* <td>{this.props.data.class}</td> */}
          <td>{this.props.data.type}</td>
          <td>{this.props.data.ttl}</td>
          <td>{this.props.data.rdata}</td>
          {/* <td>{this.props.data.created_at}</td> */}
        </tr>
      );
    }
}

DNSRecordsRow.propTypes = {
  data: PropTypes.object,
};

export default DNSRecordsRow;