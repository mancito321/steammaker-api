import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Log from './Components/Log';
import Me from './Components/Me';
import Challenge from './Components/Challenge';
import Inicio from './Components/Inicio';
import Reg from './Components/Reg';
import NuevoGrupo from './Components/NuevoGrupo';
import './App.css'

class App extends Component {
  render() {
    return (
      <Router >        
          <Switch>
            <Route path='/me' component={Me} />
            <Route path='/reto' component={Challenge} />
            <Route path='/inicio' component={Inicio} />
            <Route path='/nuevo_grupo' component={NuevoGrupo} />
            <Route path='/register' component={Reg} /> 
            <Route path='/' component={Log} />
            
          </Switch>       
      </Router>
    );
  }
}

export default App;
