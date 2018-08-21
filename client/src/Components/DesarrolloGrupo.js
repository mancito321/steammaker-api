import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
  const axios = require('axios');
class Challenge extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      challenge : []
    };           
  } 
  componentDidMount(){
    axios.get('http://localhost:5000/challenge/actual',{
      params:{
        id:this.props.id
      }
    })
   .then((response)=>  {    
      this.setState({
       challenge: response.data
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
      try{
        return (  
    <div>            
      <Container fluid="true">
       <Row>
       <Col md="2" className="nav_cont"><Nav/></Col>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">        
       <Container className="Contenido_general">
       <Row> 
       <Col md="12">
       <h2 className="titulo">GRUPOS</h2><small>Detalle de grupo - Solucion de reto</small>
       </Col>
       <Row  className="margin_container">
       <Col md="12"><h4 className="subtitulo">INFORMACIÓN DEL DESARROLLO</h4></Col>       
        <Col md="6">
        <h5>Fecha de publicación</h5>        
        </Col>
        <Col md="6">
        <h5>Nombre del reto</h5>
        <Button>Ver reto</Button>  
        </Col>
        </Row>
        <Row className="margin_container form_margin ">
        <Col md="12">
        <h5>Desarrollo del reto</h5>
        <Button>Ver desarollo</Button>
        </Col>
        </Row>
        <Row className="margin_container form_margin ">
        <Col md="4">
        <h5>Recursos adicionales</h5>
        </Col>
        <Col md="4"></Col>
        <Col md="4">
        <h5>Comentarios sobre el reto</h5>
        </Col>
        </Row>
        <Row className="margin_container form_margin ">
        <Col md="4">
         <h5>Puntuar reto</h5>
         <p><span>Valor 1 a puntuar</span><Input  type="number" className="text_group"  id="participante"/></p>
         <p><span>Valor 2 a puntuar</span><Input  type="number" className="text_group"  id="participante"/></p>
         <p><span>Valor 3 a puntuar</span><Input  type="number" className="text_group"  id="participante"/></p>
         <p><span>Valor 4 a puntuar</span><Input  type="number" className="text_group"  id="participante"/></p>
         <p><span>Valor 5 a puntuar</span><Input  type="number" className="text_group"  id="participante"/></p>
        </Col>
        <Col md="4">
        <h5>Puntaje general</h5>
        </Col>
        <Col md="4">
         <h5>Puntaje por area</h5>
        </Col>
      </Row>
        <Col md="12" className="margin_container form_margin "><Button onClick={this.props.handler}>Regresar</Button></Col>  
        
      </Row>        
           
      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div> 
      
      );
      }catch(error){
       return(
        <p></p>
        );
      }
    }
  }
}

export default Challenge;
