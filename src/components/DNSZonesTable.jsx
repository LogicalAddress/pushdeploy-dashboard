import React from 'react';
import DNSZonesRow from './DNSZonesRow.jsx';
import PropTypes from 'prop-types';

class DNSZonesTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>App</th>
                <th>Provider</th>
                <th>Owner</th>
                {/* <th>Created At</th> */}
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dnszones.map((item, i) => <DNSZonesRow delete={this.props.delete} key={i} data={item} />)}
            </tbody>
          </table>
        );
    }
}

DNSZonesTable.propTypes = {
    dnszones: PropTypes.array,
    delete: PropTypes.func,
};

export default DNSZonesTable;