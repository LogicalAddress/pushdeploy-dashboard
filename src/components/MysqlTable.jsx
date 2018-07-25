import React from 'react';
import MysqlDatabaseRow from './MysqlDatabaseRow.jsx';
import PropTypes from 'prop-types';

class MysqlTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Database</th>
                <th>Host</th>
                <th>User</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {this.props.mysqlDbs.map((db, i) => <MysqlDatabaseRow key={i} data={db} />)}
            </tbody>
          </table>
        );
    }
}

MysqlTable.propTypes = {
  mysqlDbs: PropTypes.array,
};

export default MysqlTable;