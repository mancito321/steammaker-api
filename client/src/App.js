import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';

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
        <Switch>
            <Route path='/jule' component={Jule} />
            <Route path='/about' component={About} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
