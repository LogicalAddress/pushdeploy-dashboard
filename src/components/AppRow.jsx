import React from 'react';
import { setActiveApp } from '../actions/Common';
import { connect } from 'react-redux';
var Link = require('react-router-dom').Link

class AppRow extends React.Component {
    render() {
      var down = { color: "red" };
      var up = { color: "#336633" };
      var check = { color: "pink" };
      return (
        <tr>
          <td><Link onClick={()=> {this.props.setActiveApp(this.props.data)}} to={"/server/" + this.props.data.server + "/app/" + this.props.data._id}>{this.props.data.app_name.toUpperCase()}</Link></td>
          <td>{this.props.data.template.toUpperCase()}/{this.props.data.template_variation.toUpperCase()}</td>
          <td>{this.props.data.repo_full_name}</td>
          <td style={
            this.props.data.state === "RUNNING" ? up : this.props.data.state === "LOADING" ? 
              check : down }>{this.props.data.state}
          </td>
        </tr>
      );
    }
}

const mapStoreToProps = (storeState) => (
    {
        activeApp: storeState.activeApp,
    }
)

const mapDispatchToProps = (dispatch) => (
      {
        setActiveApp: (app) => dispatch(setActiveApp(app)),
      }
    );

export default connect(mapStoreToProps, mapDispatchToProps)(AppRow)