import React from 'react';
import DNSZonesRow from './DNSZonesRow.jsx';
import PropTypes from 'prop-types';

class DNSZonesTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>app</th>
                <th>provider</th>
                <th>owner</th>
                {/* <th>Created At</th> */}
              </tr>
            </thead>
            <tbody>
              {this.props.dnszones.map((item, i) => <DNSZonesRow key={i} data={item} />)}
            </tbody>
          </table>
        );
    }
}

DNSZonesTable.propTypes = {
    dnszones: PropTypes.array,
};

export default DNSZonesTable;