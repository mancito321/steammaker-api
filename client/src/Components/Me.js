import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Route, Redirect } from 'react-router'

class Log extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk
    };
  }
  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      return (
        <div className="App">
          <p>
            You are logged. Why not <Link to="/" onClick={()=>{sessionStorage.removeItem('mySteamM')}}>Logout</Link>
          </p>
        </div>
      );
    }

  }
}

export default Log;
