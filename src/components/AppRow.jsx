import React from 'react';
var Link = require('react-router-dom').Link

class AppRow extends React.Component {
    render() {
      var down = { color: "red" };
      var up = { color: "#336633" };
      var check = { color: "pink" };
      return (
        <tr>
          <td><Link to={"/apps/" + this.props.data._id}>{this.props.data.app_name.toUpperCase()}</Link></td>
          <td>{this.props.data.template.toUpperCase()}/{this.props.data.template_variation.toUpperCase()}</td>
          <td>{this.props.data.repo_full_name || (this.props.data.app_name == 'default' ? 'Default' : this.props.data.app_repository)}</td>
          <td style={
            this.props.data.state === "RUNNING" ? up : this.props.data.state === "LOADING" ? 
              check : down }>{this.props.data.state}
          </td>
        </tr>
      );
    }
}

export default AppRow