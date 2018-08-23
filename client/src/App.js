import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Log from './Components/Log';
import Me from './Components/Me';
import Challenge from './Components/Challenge';
import Inicio from './Components/Inicio';
import Reg from './Components/Reg';
import Grupos from './Components/ver_grupo';
import Retos from './Components/ver_reto';
import NuevoGrupo from './Components/NuevoGrupo';
import NuevoReto from './Components/NuevoReto';
import NuevoDesarrollo from './Components/NuevoDesarrollo';
import UpFile from './Components/UpFile';
import {ChallengePro} from './Components/ChallengeContext';
import './App.css'

class App extends Component {
  state = {
    reto_id:0
  }

  render() {
    return (
      <ChallengePro value={
          {
            state:this.state.reto_id,
            actions:{
              handleReto:()=>{
                console.log('Hola')
              }
            }
          }
        }>
      <Router >
          <Switch>
            <Route path='/me' component={Me} />
            <Route path='/reto' component={Challenge} />
            <Route path='/inicio' component={Inicio} />
            <Route path='/nuevo_grupo' component={NuevoGrupo} />
            <Route path='/nuevo_reto' component={NuevoReto} />
            <Route path='/register' component={Reg} />
            <Route path='/grupos' component={Grupos} />
            <Route path='/retos' component={Retos} />
            <Route path='/' component={Log} />

          </Switch>
      </Router>
      </ChallengePro>
    );
  }
}

export default App;
