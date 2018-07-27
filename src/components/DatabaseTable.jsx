import React from 'react';
import DatabaseRow from './DatabaseRow.jsx';
import PropTypes from 'prop-types';

class DatabaseTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Database</th>
                <th>Host</th>
                <th>Username</th>
                <th>Password</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dbs.map((db, i) => <DatabaseRow key={i} data={db} />)}
            </tbody>
          </table>
        );
    }
}

DatabaseTable.propTypes = {
  dbs: PropTypes.array,
};

export default DatabaseTable;