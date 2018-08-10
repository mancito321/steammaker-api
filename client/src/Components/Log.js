import React, { Component} from 'react';
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import '../App.css';
import { Route, Redirect } from 'react-router'
const axios = require('axios');

class Log extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM')===null)
    this.state = {
      text: "",
      password: "",
      session:logg,
    };
  }

  validateForm() {
    return this.state.text.length > 0 && this.state.password.length > 0;
  }

  handleChange (event){
    this.setState({
      [event.target.type]: event.target.value
    });
  }

  handleSubmit = event => {
    axios.post('http://localhost:5000/api/auth/login', {
      user: this.state.text,
      password: this.state.password
    })
    .then( (response) =>{
      console.log(response.data);
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
    if (this.state.session === false) {
      return <Redirect to='/me' />
    } else{
      console.log(this.state.logged);
      return (
        <Container>
          <Row>
            <Col>
              <div className="Login">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup id="text">
                    <Label>Email</Label>
                    <Input
                      autoFocus
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange.bind(this)}
                      />
                  </FormGroup>
                  <FormGroup id="password">
                    <Label>Password</Label>
                    <Input
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                      type="password"
                      />
                  </FormGroup>
                  <Button
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    >
                    Login
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }

  }
}

export default Log;
