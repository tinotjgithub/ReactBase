import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import './Login.css';
var _ = require('lodash');

class App extends Component {
  constructor(props,state) {
    super(props,state);

    this.state = {
      username: "",
      password: "",
      toDashboard: false,
      inValidCreds: false
    };

    this.letsBindAllFuncts()
  };

  letsBindAllFuncts() {
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.getAlert = this.getAlert.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  validateForm() {
    axios.get('./gist/book_details.json')
    .then((response) => {
      response.data.filter((datas)=>{
        if(datas.username === this.state.username){
          alert(datas.username);
        }
      })
    })
    .catch((err) =>{
      alert(err);
    });
    
    axios.get('./gist/user_details.json')
      .then((response) => {
        const authenticated = response.data.filter((datum) => {
          if (datum.username === this.state.username && datum.password === this.state.password) {
            return true;
          }
          return false;
        });

        if (!_.isEmpty(authenticated)) {
          console.log("Success");
          //TODO: set the authenticated as true in the state;
          this.setState(() => ({
            toDashboard: true
          }));
        } else {
          this.setState(() => ({
            inValidCreds: true
          }));
        }
      })
      .catch((err) => {
        alert(err);
      })
  };

  getAlert() {
    let message = _.isEmpty(this.state.password) ? "better type some passwords" : "Better check yourself, your cred's not looking too good"
    return (<Alert bsStyle="warning">
      <strong>This is wrong!</strong> {message}
    </Alert>)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.validateForm();
    }
  }

  render() {
    if (this.state.toDashboard === true) {
      // return <Redirect to={{pathname: "/home", state: {username: this.state.username}}} />
      return <Redirect to = {{pathname : "/home",state: {usernames: this.state.username}}}/>
    }

    return (
      <div>
        <div className="Login">
          <form>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                type="password"
                />
            </FormGroup>
            <Button
              block
              bsSize="large"
              type="button"
              onClick={this.validateForm}
              >
              Login
            </Button>
            <br></br>
            {this.state.inValidCreds ? this.getAlert() : null}
          </form>
        </div>
      </div>
    );
  }
}

export default App;