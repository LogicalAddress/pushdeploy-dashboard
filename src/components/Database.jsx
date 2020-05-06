import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatabaseTable from './DatabaseTable.jsx';
import DatabaseAction from '../actions/DatabaseAction';
import {isWorking, isDoneWorking } from '../actions/Common';
import ServersAction from '../actions/ServersAction'
var Link = require('react-router-dom').Link;

class Database extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            server: null,
            db_type: 'mysql'
        };
        this.createDatabase = this.createDatabase.bind(this);
     }
     
    componentDidMount(){
        this.props.fetchDatbases(this.props.match.params.id);
        this.props.fetchServer(this.props.match.params.id);
        this.setState({server: this.props.match.params.id});
     }
    
    createDatabase() {
        this.props.createDatabase(this.state);
    }
    
    render() {

      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{this.props.server.server_name}</span>
                    <span className="horizontal-space">{this.props.server.state}</span>
                    <span className="horizontal-space">{this.props.server.ipv4}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/server/" + this.props.server._id}>{this.props.server.server_name ? this.props.server.server_name : ''}</Link></li>
                    </ul>
                </div>
                <div className="column column-80">
                    <div className="column">
                        <div className="white panel">
                            <h3>MONGODB</h3>
                            <p className="lead">Replace YourDatabaseNameHere with whatever you want from within your application</p>
                            <code>mongodb://localhost:27017/YourDatabaseNameHere</code>
                        </div>
                    </div>
                    <div className="column">
                        { !this.props.server.lock && <div className="white panel">
                            <h3>CREATE MYSQL DATABASE</h3>
                            <p className="lead">For your security, your mysql server listens on localhost</p>
                            <form>
                                <fieldset>
                                    <div className="row">
                                        <div className="column">
                                          <a className="button" onClick={this.createDatabase}>Add Database</a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div> }
                        { this.props.database.length !== 0 &&
                        <div className="white panel">
                            <h3>MYSQL DATABASES</h3>
                            <DatabaseTable dbs={this.props.database}/>
                        </div>
                        }
                    </div>
                </div>
            </div>
         </div>
      );
   }
}

Database.propTypes = {
  server: PropTypes.object,
  database: PropTypes.array,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        database: storeState.database,
        credentials: storeState.credentials,
        server: storeState.server,
    }
);

const mapDispatchToProps = (dispatch) => ({
  createDatabase: (draft) => dispatch(DatabaseAction.createDatabase(draft)),
  updateDatabaseDraft: (draft) => dispatch(DatabaseAction.updateDatabaseDraft(draft)),
  fetchDatbases: (server) => dispatch(DatabaseAction.fetchDatbases(server)),
  fetchServer: (params) => dispatch(ServersAction.fetchServer(params)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),
});

export default connect(mapStoreToProps, mapDispatchToProps)(Database)