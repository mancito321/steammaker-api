import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
  const axios = require('axios');
class Me extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      user : []
    };           
  } 
  componentDidMount(){
    axios.get('http://localhost:5000/users/user/all')
   .then((response)=>  {    
      this.setState({
       user: response.data
      });
    })
    .catch((error)=>  {
    // handle error  
     })
     .then(()=> {
    // always executed   
     }); 
  }

  render() {       
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      return (  
      <div>            
      <Container fluid="true">
       <Row>
       <Col md="2" className="nav_cont"><Nav/></Col>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general"> 
       <Container> 
       <p>
            You are logged. Why not <Link to="/" onClick={()=>{sessionStorage.removeItem('mySteamM')}}>Logout</Link> 
            lorem
          </p>
          {
            this.state.user.map(item=>{
              return <li key={item.user.toString()}>{item.user}</li>
            })
      }       
      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div>     
      );
    }
  }
}

export default Me;
