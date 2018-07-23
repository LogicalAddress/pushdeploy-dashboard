import React from 'react';
import AppRow from './AppRow.jsx';

class AppTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Template</th>
                <th>Repository</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {this.props.apps.map((app, i) => <AppRow key={i} data={app} />)}
            </tbody>
          </table>
        );
    }
}

export default AppTable;