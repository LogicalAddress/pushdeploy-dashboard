import React from 'react';
import DNSRecordsRow from './DNSRecordsRow.jsx';
import PropTypes from 'prop-types';

class DNSRecordsTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>Hostname</th>
                {/* <th>Class</th> */}
                <th>Type</th>
                <th>TTL (seconds)</th>
                <th>Value</th>
                {/* <th>Created At</th> */}
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dnsrecords.map((item, i) => <DNSRecordsRow delete={this.props.delete} key={i} data={item} />)}
            </tbody>
          </table>
        );
    }
}

DNSRecordsTable.propTypes = {
  dnsrecords: PropTypes.array,
  delete: PropTypes.func,
};

export default DNSRecordsTable;