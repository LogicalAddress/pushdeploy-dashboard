import React from 'react';
var Link = require('react-router-dom').Link
import { connect } from 'react-redux';

class ServerRow extends React.Component {
    render() {
      var down = { color: "red" };
      var up = { color: "#336633" };
      var check = { color: "pink" };
      
      return (
        <tr>
          <td><Link to={"/server/" + this.props.data._id}>{this.props.data.server_name.toUpperCase()}</Link></td>
          <td>{this.props.data.provider.toUpperCase()}</td>
          <td>{this.props.data.ipv4 ? this.props.data.ipv4 : this.props.data.ipv6}</td>
          <td style={
            this.props.data.state === "RUNNING" ? up : this.props.data.state === "LOADING" ? 
              check : down }>{this.props.data.state}
          </td>
        </tr>
      );
    }
}

const mapDispatchToProps = (dispatch) => (
      {
        
      }
    );


export default connect(null, mapDispatchToProps)(ServerRow)