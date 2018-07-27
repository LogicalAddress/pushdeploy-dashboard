import React from 'react';
import PropTypes from 'prop-types';

class DatabaseRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.data.db_name}</td>
          <td>{this.props.data.host}</td>
          <td>{this.props.data.username}</td>
          <td>{this.props.data.password}</td>
          <td>{this.props.data.state}</td>
        </tr>
      );
    }
}

DatabaseRow.propTypes = {
  data: PropTypes.object,
};

export default DatabaseRow;