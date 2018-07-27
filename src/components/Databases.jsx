import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MysqlTable from './MysqlTable.jsx';
var Link = require('react-router-dom').Link;
import DatabaseAction from '../actions/DatabaseAction';
import {isWorking, isDoneWorking } from '../actions/Common';
import {error} from '../utils/toastr';

class Databases extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          databases: [
              {
                  db_name: 'techpool',
                  username: 'root',
                  password: 'yahweh',
                  host: '127.0.0.1'
              },{
                  db_name: 'pooltech',
                  username: 'root',
                  password: 'yahweh',
                  host: '127.0.0.1'
              }  
            ]
        };
        
        this.createMysqlDatabase = this.createMysqlDatabase.bind(this);
     }
    
    createMysqlDatabase() {
        if(!this.props.mysqlDraft.db_name.length){
          return error('Notification', 'Database name is required');
        }
        this.props.createMysqlDatabase(this.props.mysqlDraft);
    }
    
    getDetails(){
        var server = {};
        var servers = this.props.servers;
        for(var i = 0; i < servers.length; i++){
            if(servers[i]._id === this.props.match.params.id){
                server = servers[i];
                break;
            }
        }
        return server;
    }
    
    render() {
    var server = this.getDetails();
      return (
         <div className="container">
            <div className="float-right">
                <div className="server-summary">
                    <span className="horizontal-space">{server.server_name}</span>
                    <span className="horizontal-space">{server.state}</span>
                    <span className="horizontal-space">{server.ipv4}</span>
                </div>
            </div>
            <div className="row">
                <div className="column column-20">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/server/" + server._id}>{server.server_name ? server.server_name : ''}</Link></li>
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
                        <div className="white panel">
                            <h3>CREATE MYSQL DATABASE</h3>
                            <p className="lead">For your security, your mysql server listens on localhost and the default user for all your database is root</p>
                            <form>
                                <fieldset>
                                    <label htmlFor="username">Username</label>
                                    <input disabled={true} value={this.props.mysqlDraft.username} id="username" type="text"/>
                                    <div className="form-group">
                                        <label htmlFor="db_name">Database</label>
                                      <input placeholder="e.g techpool" id="db_name" type="text" value={this.props.mysqlDraft.db_name} onChange={(e) => this.props.updateMysqlDraft({db_name: e.target.value})}/>
                                    </div>
                                    <div className="row">
                                        <div className="column">
                                          <a className="button" onClick={this.createMysqlDatabase}>Add Database</a>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        { this.state.databases.length &&
                        <div className="white panel">
                            <h3>MYSQL DATABASES</h3>
                            <MysqlTable mysqlDbs={this.state.databases}/>
                        </div>
                        }
                    </div>
                </div>
            </div>
         </div>
      );
   }
}

Databases.propTypes = {
  servers: PropTypes.array,
  isWorking: PropTypes.func,
  isDoneWorking: PropTypes.func,
};

const mapStoreToProps = (storeState) => (
    {
        servers: storeState.servers,
        mysqlDraft: storeState.mysqlDraft,
        credentials: storeState.credentials,
    }
);

const mapDispatchToProps = (dispatch) => ({
  createMysqlDatabase: (draft) => dispatch(DatabaseAction.createMysqlDatabase(draft)),
  updateMysqlDraft: (draft) => dispatch(DatabaseAction.updateMysqlDraft(draft)),
  isWorking: ()=> dispatch(isWorking()),
  isDoneWorking: ()=> dispatch(isDoneWorking()),

});

export default connect(mapStoreToProps, mapDispatchToProps)(Databases)