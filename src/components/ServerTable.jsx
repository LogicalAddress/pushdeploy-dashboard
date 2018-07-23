import React from 'react';
import ServerRow from './ServerRow.jsx';

class ServerTable extends React.Component {
    
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Server</th>
                <th>Provider</th>
                <th>IP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.servers.map((server, i) => <ServerRow key={i} data={server} />)}
            </tbody>
          </table>
        );
    }
}

export default ServerTable;