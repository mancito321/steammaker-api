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
const axios = require('axios');

class App extends Component {
  state = {
    permission:0,
    grupo:0
  }
  componentDidMount(){
  console.log('did mount');
  let session=JSON.parse(sessionStorage.getItem('mySteamM'))
  console.log(session);
  if (session!=null && this.state.permission==0) {

        axios.get('http://localhost:5000/api/auth/me',{
          headers: {
              'content-type': 'multipart/form-data',
              'x-access-token':session.token
          }
      })
       .then((response)=>  {
         console.log('responses: '+response);
          this.setState({
            permission:response.data.rol,
            grupo:response.data.group
          })
        })
        .catch((error)=>  {
        // handle error
        console.log('Fuck '+error);
         })
         .then(()=> {
        console.log(this.state.permission);
         });
  }
  }
  componentWillMount(){


  }
  componentDidUpdate(){
    console.log('Did update');
  }
  componentWillUpdate(){
    console.log('will update');
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    console.log(session);
    if (session!=null && this.state.permission==0) {

          axios.get('http://localhost:5000/api/auth/me',{
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token':session.token
            }
        })
         .then((response)=>  {
           console.log('responses: '+response);
            this.setState({
              permission:response.data.rol,
              grupo:response.data.group
            })
          })
          .catch((error)=>  {
          // handle error
          console.log('Fuck '+error);
           })
           .then(()=> {
          console.log(this.state.permission);
           });
    }
  }

  render() {
    return (
      <ChallengePro value={{
          state:this.state.permission,
          grupo:this.state.grupo,
          actions:{
            update:()=>{if (this.state.permission==0) {

                   let session=JSON.parse(sessionStorage.getItem('mySteamM'))
                   axios.get('http://localhost:5000/api/auth/me',{
                     headers: {
                         'content-type': 'multipart/form-data',
                         'x-access-token':session.token
                     }
                 })
                  .then((response)=>  {
                     this.setState({
                       permission:response.data.rol,
                       grupo:response.data.group
                     })
                   })
                   .catch((error)=>  {
                   // handle error
                   console.log('Fuck '+error);
                    })
                    .then(()=> {
                   console.log(this.state.permission);
                    });
            }},
            logOut:()=>{
              console.log('Fuccccckkk');
              this.setState({
                permission:0
              })
            }

          }
        }}>
      <Router >
          <Switch>
            <Route path='/me' component={Me} />
            <Route path='/reto' component={Challenge} />
            <Route path='/inicio' component={Inicio} />
            <Route path='/nuevo_grupo' component={this.state.permission==1 ? NuevoGrupo:Grupos} />
            <Route path='/nuevo_reto' component={this.state.permission==1 ? NuevoReto:Challenge} />
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
