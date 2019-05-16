import React, {Component} from 'react';
import RegistrationForm from './registration-form.js';

class Register extends Component {
  render() {
    return (
      <div className="registration">
        <h3>Register to save your song searches</h3>
        <RegistrationForm currentUserHandler={this.props.currentUserHandler}/>
      </div>
    );
  }
};

export default Register;