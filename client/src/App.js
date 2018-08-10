import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Log from './Components/Log';
import Header from './Components/Header';
import Me from './Components/Me';
import PrivateRoute from './Components/PrivateRoute';

const Jule = ()=> <h1>Julian is Gay</ h1>;
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Route path='/' component={Header} />
          <Switch>
            <Route path='/jule' component={Jule} />
            <Route path='/me' component={Me} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Log} />
            <Route path='/' component={Home} />
            <PrivateRoute />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
