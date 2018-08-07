import React from 'react';
import logo from '../assets/images/logo.png';
// var Link = require('react-router-dom').Link;

/* Adapted from: SRC: https://codepen.io/gaearon/pen/wqvxGa?editors=0010 */

class GlobalErrorHandler extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <div className="outer">
          <div className="middle">
            <div className="row" style={{width: 'auto'}}>
            <div className="column column-50 column-offset-25">
            <center><img src={logo} height="100" alt="PushDeploy"/></center><br/>
            <div className="white panel">
              <h2>Something went wrong.</h2>
              <p className="lead" style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </p>
              <button onClick={(e) => window.location = '/' } className="button-primary">Return</button>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      );
    }
    // render children
    return this.props.children;
  }
}

export default GlobalErrorHandler;