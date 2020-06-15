import React from 'react';
import DNSRecordsRow from './DNSRecordsRow.jsx';
import PropTypes from 'prop-types';

class DNSRecordsTable extends React.Component {
    render() {
        return (
          <table className="table">
            <thead>
              <tr>
                <th>app</th>
                <th>label</th>
                {/* <th>Class</th> */}
                <th>type</th>
                <th>ttl</th>
                <th>value</th>
                {/* <th>Created At</th> */}
              </tr>
            </thead>
            <tbody>
              {this.props.dnsrecords.map((item, i) => <DNSRecordsRow key={i} data={item} />)}
            </tbody>
          </table>
        );
    }
}

DNSRecordsTable.propTypes = {
  dnsrecords: PropTypes.array,
};

export default DNSRecordsTable;