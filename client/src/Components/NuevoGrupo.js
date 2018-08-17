import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label,FormText } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
  const axios = require('axios');
class NuevoGrupo extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM')===null)
    this.state = {
      ie: "0",
      franchise:"0",
      name: "",
      usuario: "",
      password: "",
      participante:"",
      participantes:[],
      franchises : [],
      institutions : []
    };
  }

  validateForm() {
     true ? true : false;
  }
  franchiseForm() {
     return this.state.ie > 0;
  }

  handleChange (event){
    this.setState({
      [event.target.id]: event.target.value
    });

    axios.get('http://localhost:5000/group/franchises',{
      params:{
        id: this.state.ie
      }
    })
   .then((response)=>  {
      this.setState({
       franchises: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed
     console.log(this.state.participante.length)
     });
  }
  componentDidMount(){

     axios.get('http://localhost:5000/group/institution')
   .then((response)=>  {
      this.setState({
       institutions: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
     });
  }

  handleSubmit = event => {
    console.log({
      user: this.state.usuario,
      ie: this.state.text,
      franchise:this.state.franchise,
      name: this.state.name,
      usuario: this.state.usuario,
      password: this.state.password,
      participante:this.state.participante,
    });
    return true
    axios.post('http://localhost:5000/group/register', {
      user: this.state.usuario,
      ie: this.state.text,
      franchise:this.state.franchise,
      name: this.state.name,
      usuario: this.state.usuario,
      password: this.state.password,
      participante:this.state.participante,
    })
    .then( (response) =>{
      sessionStorage.setItem('mySteamM', JSON.stringify(response.data));
      this.setState({
        session: false
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
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
       <h2 className="titulo">GRUPOS</h2><small>Nuevo Grupo</small>
       </Col>
       <Row  className="margin_container">
        <form onSubmit={this.handleSubmit}>
        <Container>
        <Row>
        <Col md="3" xs="12">
         <FormGroup id="ie">
           <Label>Institucion Educativa</Label>
          <Input type="select" name="select" defaultValue={this.state.ie} id="ie" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >
           <option value='0'>Seleccione una institución</option>
          {
            this.state.institutions.map(function(item, i){
             return (
                 <option value={item.id} key={i}>{item.name}</option>
             );
           }.bind(this))
          }
          </Input>
         </FormGroup>
        </Col>
        <Col md="3" xs="12">
         <FormGroup id="franchise">
           <Label>Sede</Label>
          <Input type="select" disabled={!this.franchiseForm()} name="select"  onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >
             <option value='0'>Seleccione una sede</option>
             {
            this.state.franchises.map(function(item, i){
             return (
                 <option  id="franchise" value={this.state.select} key={i}>{item.name}</option>
             );
           }.bind(this))
          }
          </Input>
         </FormGroup>
        </Col>

        </Row>
        <Row>
          <Col md="3" xs="12">
           <FormGroup id="name">
            <Label>Nombre del grupo</Label>
            <Input  type="text" id="name"  onChange={this.handleChange.bind(this)} />
          </FormGroup>
        </Col>
        </Row>
        </Container>
        <Container className="form_margin">
          <Row>
            <Col md="12"><h5>PARTICIPANTES</h5></Col>
          </Row>
              <Row>
                 <Col md="3" xs="12">
                  <FormGroup id="name_participant">
                   <Label>Nombre Completo</Label>
                   <Input  type="text"  id="participante"  onChange={this.handleChange.bind(this)}/>
                  </FormGroup>
                  <Col md="12" className="center"> <Button className="ingresar_participante" disabled={!this.validateForm()} onClick={this.add_participante.bind(this)} >ingresar</Button></Col>
                </Col>
                 <Col md="9" xs="12">
                  <Col md="12"><div className="header_participants">
                   <Row>
                     <Col md="9" className="center">Nombre</Col>
                     <Col md="3" className="center">Remover</Col>
                   </Row>
                  </div></Col>
                  <Col md="12"><div className="cont_participants">
                  {
                      this.state.participantes.map(function(item, i){
                      return (
                        <Row key={'Row'+i}>
                        <Col md="10" key={item}>{item}</Col>
                        <Col md="2" key={i} onClick={this.delete_participante.bind(this,item)} >delete</Col>
                        </Row>
                        );
                     }.bind(this))
                   }
                  </div></Col>
                </Col>
              </Row>
        </Container>
         <Container className="form_margin">
              <Row>
              <Col md="6">
              <FormGroup id="participantes">
          <Label for="exampleFile">Foto de los participantes</Label>
          <Input type="file" name="file" id="foto" />
          <FormText color="muted">
          Advertencia sobre formato y peso del contenido a cargar
          </FormText>
        </FormGroup>
        </Col>
              </Row>
               <Row>
              <Col md="6">
              <FormGroup id="logo">
          <Label for="exampleFile">Logo del grupo</Label>
          <Input type="file" name="file" id="logo" />
          <FormText color="muted">
           Advertencia sobre formato y peso del contenido a cargar
          </FormText>
        </FormGroup>
        </Col>
              </Row>
        </Container>
        <Container className="form_margin">
          <Row>
            <Col md="12"><h5>ACCESO</h5></Col>
          </Row>
              <Row>
                <Col md="3" xs="12">
                 <FormGroup id="user">
                  <Label>Usuario de grupo</Label>
                  <Input  type="text"  id="usuario" onChange={this.handleChange.bind(this)} />
                   <FormText color="muted">
                      Caracteristicas del nombre de usuario
                   </FormText>
                 </FormGroup>
                </Col>
              </Row>
               <Row>
                <Col md="3" xs="12">
                 <FormGroup id="password">
                  <Label>Clave de grupo</Label>
                  <Input  type="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
                    <FormText color="muted">
                     Caracteristicas de la clave de grupo
                   </FormText>
                 </FormGroup>
                </Col>
              </Row>
        </Container>
           <Container className="form_margin">
              <Row className="center">
              <Col md="2">
              <Button block disabled={!this.validateForm()} type="submit" >
                    Crear
              </Button>
              </Col>
              <Col md="2">
              <Button block disabled={!this.validateForm()} type="submit" >
                    Regresar
              </Button>
              </Col>

              </Row>
        </Container>
        </form>
      </Row>
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


    participante(event){
      this.setState({
        participante: event.target.value
      })
    }

  add_participante(){
    this.state.participantes.push(this.state.participante)
      this.setState(
        this.state
      )
       this.setState({
        participante: ""
      })
     document.getElementById('participante').value = "";
    }

  delete_participante(i){
  var array = this.state.participantes;
  var index = array.indexOf(i);
  delete array[index];
   this.setState(
        this.state
      )
  }
}

export default NuevoGrupo;
