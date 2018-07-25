import React from 'react';
import PropTypes from 'prop-types';

class MysqlDatabaseRow extends React.Component {
    render() {
      return (
        <tr>
          <td>{this.props.data.db_name.toUpperCase()}</td>
          <td>{this.props.data.host.toUpperCase()}</td>
          <td>{this.props.data.username}</td>
          <td>{this.props.data.password}</td>
        </tr>
      );
    }
}

MysqlDatabaseRow.propTypes = {
  data: PropTypes.boolean,
};

export default MysqlDatabaseRow;