import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import '../App.css';
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import { Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,  UncontrolledDropdown,  DropdownToggle,  DropdownMenu,  DropdownItem } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container>
      <Row>
         <Col md="12" xs="12" className="logo"><img src="http://via.placeholder.com/350x150"/></Col>
      </Row>
      <Row>
      <Col md="12" xs="12">
        <Navbar color="light" light expand="md">
         <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/reto">Inicio</Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Retos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Nuevo reto
                  </DropdownItem>
                  <DropdownItem>
                    Ver retos
                  </DropdownItem>               
                </DropdownMenu>
              </UncontrolledDropdown>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Grupos
                </DropdownToggle>
                <DropdownMenu right>
                 <Link to="/nuevo_grupo"> 
                 <DropdownItem>
                   Nuevo Grupo
                </DropdownItem></Link>
                <DropdownItem>
                    Ver Grupos
                </DropdownItem>                  
                
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink onClick={()=>{sessionStorage.removeItem('mySteamM')}}><Link to="/">Salir</Link></NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
        </Col>
      </Row>
</Container>
    );
  }
}

export default Header;
