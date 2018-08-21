import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Grupos from './Grupo'
import Griddle, { plugins, RowDefinition, ColumnDefinition,Components} from 'griddle-react';
var LocalPlugin = require('griddle-react').plugins.LocalPlugin;
const axios = require('axios');
const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};
const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});
function id({ value, griddleKey, rowData }) {
  return <span>{rowData.id}</span>;
}


const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <Row>   
    <Col md="12" className="right"><Filter /></Col>    
    <Col md="12" ><Table className="group_table" /></Col>    
  </Row>
);

class Group extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      group : [],
      detail:"0"
    };           
  } 
  componentDidMount(){
    axios.get('http://localhost:5000/group/group')
   .then((response)=>  {    
      this.setState({
       group: response.data
      });
    })
    .catch((error)=>  {
    // handle error  
     })
     .then(()=> {
     
    // always executed    
     }); 
  }


  handleChange (event){
    this.setState({
      detail: event.target.name
    });
    
  }
  render() {       
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {

      try{
      if(this.state.detail>0){
        return( 
          <Grupos id={this.state.detail}/>
          )
      
      }else{
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
       <h2 className="titulo">GRUPOS</h2><small>Todos los grupos</small>
       </Col>
       <Row  className="margin_container">
   <Col md="12"> 
     <Griddle components={{Layout: NewLayout}} data={this.state.group} plugins={[plugins.LocalPlugin]}>      
    <RowDefinition>
      <ColumnDefinition id="logo" title="Logo" customComponent={enhancedWithRowData(id)} />
      <ColumnDefinition id="name" title="Nombre" />     
      <ColumnDefinition id="iname" title="Institución Educativa" />     
      <ColumnDefinition id="frname" title="Sede" />     
      <ColumnDefinition id="user" title="Master Teacher" />     
      <ColumnDefinition id="participantes" title="Participantes" />     
      <ColumnDefinition id="ver" title="Ver grupo" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
         return <Button name={rowData.id} onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >VER</Button>;
          })} />
    </RowDefinition>
  </Griddle>
   </Col>
   <Col md="12" className="center margin_container"><Link to="/nuevo_grupo" ><Button>Crear un grupo</Button></Link></Col>
      </Row>     
        
      </Row>        
           
      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div>     
      );
      }
      }catch(error){
       return(
        <p></p>
        );
      }
    }
     
  }
 
}

export default Group;
