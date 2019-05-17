import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import ErrorMessage from './error-message.js';
import superagent from 'superagent';

class RegistrationForm extends Component {
  state = {
    email: '',
    username: '', 
    errorMessage: '', //error messages to be displayed for form
    redirectToTakePhotoPage: false, //if user successfully enters information redirect,
    email: ''
  };

  // gets information from form sets state
  handleChange = async event => {
    //reset error messages if any
    if(this.state.errorMessage) {
      this.setState({errorMessage: ''});
    };
    //set attributes from form
    const attributeToChange = event.target.name;
    const newValue = event.target.value;
    this.setState({ [`${attributeToChange}`]: newValue });
  };

  handleSubmit = async event => {
    event.preventDefault();
    event.persist();
    //set backend url to localhost or deployed site
    let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';

    // check to see if email or username exists
    let isRegisteredUser = await this.isRegisteredUser();
    
    if(isRegisteredUser) {
      this.setState({errorMessage: 'A user exists with that username or password. Please click sign in if you have previously registered with Mood Songz'})
      ;
      event.target.reset();
    } else {
      console.log(this.createUser());
      if(this.props.currentUserHandler) {
        this.props.currentUserHandler(this.state.username);
      }
      this.setState({redirectToTakePhotoPage: true});
    }
  };

  // check that the user exists
  isRegisteredUser = async => {
    let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';
    let requestUrl = `${backendUrl}/users/userexists/${this.state.username}/${this.state.email}`;
    return superagent.get(requestUrl)
      .then(databaseResponse => databaseResponse.body);
  }

  createUser = async => {
    let backendUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8080' : 'https://desolate-shelf-44063.herokuapp.com';
    if(this.state.username && this.state.email) {
      let requestUrl = `${backendUrl}/users/${this.state.username}/${this.state.email}`;
    superagent.post(requestUrl)
    .then(databaseResponse => databaseResponse.body);
    } 
  }

  render() {
    if(this.state.redirectToTakePhotoPage) {
      return <Redirect to="/takephoto" />
    }
    return (
      <div className="registration-form">
        <ErrorMessage message={this.state.errorMessage}/>
        <form onSubmit={this.handleSubmit} method="post">
        <label>
          Username
          <input type="text" name="username" onChange={this.handleChange} required/>
        </label>
        <br/>
        <label>
          Email
          <input
            id="registration-email"
            name="email" 
            type="email"
            required 
            onChange={this.handleChange}
          />
        </label>
        <br/>
        <button type='submit' value='register'>
          Sign Me Up
        </button>
      </form>
    </div>
    );   
  }
}

export default RegistrationForm;
