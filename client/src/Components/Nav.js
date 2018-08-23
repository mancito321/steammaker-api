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
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange (event){
    this.setState({
      detail: event.target.name
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
                 <NavLink href="/nuevo_reto" name="0" onClick={this.handleChange.bind(this)}>
                <DropdownItem>
                    Nuevo reto
                </DropdownItem>
                </NavLink>
                 <NavLink href="/retos" name="0" onClick={this.handleChange.bind(this)}>
                <DropdownItem>
                    Ver retos
                </DropdownItem>
                </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Grupos
                </DropdownToggle>
                <DropdownMenu right>
                 <NavLink href="/nuevo_grupo">
                 <DropdownItem>
                   Nuevo Grupo
                </DropdownItem></NavLink>
                 <NavLink href="/grupos" name="0" onClick={this.handleChange.bind(this)}>
                <DropdownItem>
                    Ver Grupos
                </DropdownItem>
                </NavLink>
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
