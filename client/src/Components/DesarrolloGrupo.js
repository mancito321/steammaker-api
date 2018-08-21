import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import { RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Legend} from 'recharts'; 

  const axios = require('axios'); 
class Challenge extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      valor1:0,
      valor2:0,
      valor3:0,
      valor4:0,
      valor5:0,
      valor1p:0,
      valor2p:0,
      valor3p:0,
      valor4p:0,
      valor5p:0,
      valor1e:"",
      valor2e:"",
      valor3e:"",
      valor4e:"",
      valor5e:"",      
      punctuation:0,
      challenge : []
    };           
  } 

  validateForm() {
    return this.state.valor1e.length == 0 && this.state.valor2e.length == 0 && this.state.valor3e.length == 0 && this.state.valor4e.length == 0 && this.state.valor5e.length == 0 ;
  }
  componentDidMount(){
    axios.get('http://localhost:5000/group/challenge',{
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
    console.log(this.state.challenge)  
     }); 
  }
  componentDidUpdate(){
    console.log(this.state.valor1e.length == 0 && this.state.valor2e.length == 0 && this.state.valor3e.length == 0 && this.state.valor4e.length == 0 && this.state.valor5e.length == 0 )
  }
   handleInputChanged(e){
    console.log(e.target.id)
    switch(e.target.id) {
    case 'valor1':
    if(e.target.value > 15){
    this.setState({
      valor1e: 'El numero ingresado es mayor a 15',      
    });
    }else{
       this.setState({
                valor1: Number(e.target.value),
                valor1p: (Number(e.target.value)*100)/15,
                 valor1e: '',
            });
    }       
        break;
    case 'valor2':
    if(e.target.value > 30){
     this.setState({
      valor2e: 'El numero ingresado es mayor a 30',      
    });
    }else{
       this.setState({
                valor2: Number(e.target.value),
                valor2p: (Number(e.target.value)*100)/30,
                valor2e: '',
            });
    }       
        break;
    case 'valor3':
    if(e.target.value > 25){
     this.setState({
      valor3e: 'El numero ingresado es mayor a 25',      
    });
    }else{
      this.setState({
                valor3: Number(e.target.value),
                valor3p: (Number(e.target.value)*100)/25,
                valor3e: '',
            });
    }        
        break;
    case 'valor4':
    if(e.target.value > 20){
     this.setState({
      valor4e: 'El numero ingresado es mayor a 20',      
    });
    }else{
      this.setState({
                valor4: Number(e.target.value),
                 valor4e: '',
                valor4p: (Number(e.target.value)*100)/20
            });
    }        
        break;
    case 'valor5':
    if(e.target.value > 10){
     this.setState({
      valor5e: 'El numero ingresado es mayor a 10',      
    });
    }else{
      this.setState({
                valor5: Number(e.target.value),
                 valor5e: '',
                valor5p: (Number(e.target.value)*100)/10
            });
    }        
        break;
    default:
        this.setState({
                punctuation: 0
            });
         } 
 }
 handleInputClick(){
   this.setState({
    punctuation: (this.state.valor1+this.state.valor2+this.state.valor3+this.state.valor4+this.state.valor5)
  })
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
        <p>{this.state.challenge[0].ca}</p>       
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
        <Row>
          <Col md="8">Formato<p className="red">{this.state.valor1e}</p></Col>
          <Col md="4">
           <p><Input id="valor1" placeholder="0"  type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>
            
          </Col>
          <Col md="8">Big Art <p className="red">{this.state.valor2e}</p></Col>
           <Col md="4">
           <p><Input id="valor2" placeholder="0"  type="number" className="text_group"  onChange={this.handleInputChanged.bind(this)}/></p>
          
          </Col>
          <Col md="8">Registro fotográfico  <p className="red">{this.state.valor3e}</p></Col>
           <Col md="4">
           <p><Input id="valor3" placeholder="0"  type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>
         
          </Col>
          <Col md="8">Video<p className="red">{this.state.valor4e}</p></Col>
           <Col md="4">
           <p><Input id="valor4" type="number"  placeholder="0" className="text_group"  onChange={this.handleInputChanged.bind(this)}/></p>
           
          </Col>
          <Col md="8">Evidencia del trabajo en equipo<p className="red">{this.state.valor5e}</p></Col>
           <Col md="4">
           <p><Input  placeholder="0" id="valor5" type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>
           
          </Col>
        </Row>
          
        </Col>
        <Col md="4">
        <h5 className="center">Puntaje general</h5>
        <h1 className="center">{this.state.punctuation}</h1>
        </Col>
        <Col md="4">
         <h5 className="center">Puntaje por area</h5>
<RadarChart outerRadius={90} width={339} height={250} data={[
    { subject: 'Formato', A: this.state.valor1p,  fullMark: 15 },
    { subject: 'Big Art', A: this.state.valor2p, fullMark: 30 },
    { subject: 'Registro fotográfico', A: this.state.valor3p,  fullMark: 25 },
    { subject: 'Video', A: this.state.valor4p, fullMark: 20 },
    { subject: 'Evidencia del trabajo en equipo', A: this.state.valor5p,  fullMark: 10 },
]}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={30} domain={[0, 100]}/>
  <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />

  <Legend />
</RadarChart>
      </Col>
        <Col md="12" className="center"><Button disabled={!this.validateForm()} onClick={this.handleInputClick.bind(this)}>Puntuar</Button> <Button onClick={this.props.handler}>Regresar</Button></Col>
       
      </Row>
        <Col md="12" className="margin_container form_margin "></Col>  
        
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
