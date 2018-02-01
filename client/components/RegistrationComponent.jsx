import React from 'react';
import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socketConnection } from '../reducers/reducer-socketConnection';

class RegistrationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      touched: {
        email: false,
        password: false,
        firstName: false,
        lastName: false,
        submit: false
      }
    };

    this.handleEmailChange = ::this.handleEmailChange;
    this.handleFirstNameChange = ::this.handleFirstNameChange;
    this.handleLastNameChange = ::this.handleLastNameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const errors = validate(this.state.email, this.state.firstName, this.state.lastName, this.state.password);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };

    return (
      <form id="registration" onSubmit={this.handleSubmit}>
     <div className="overallDv">
       <div className="rowArea"><label className="registerEmailAlign">Email: </label><input value={this.state.email} className={shouldMarkError('email')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('email')}  onChange={this.handleEmailChange} />< /div>
       <div className="rowArea">First Name: <input value={this.state.firstName}  className={shouldMarkError('firstName')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('firstName')}  onChange={this.handleFirstNameChange} /></div>
       <div className="rowArea">Last Name: <input value={this.state.lastName}  className={shouldMarkError('lastName')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('lastName')}  onChange={this.handleLastNameChange} /></div>
       <div className="rowArea">Password: <input type="password" value={this.state.password}  className={shouldMarkError('password')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('password')}  onChange={this.handlePasswordChange} /></div>
       <div className="rowArea"><button className="myButton" type="submit" onClick={this.handleBlur('submit')} disabled={isDisabled}>Register</button></div>
     </div>
        </form>);
  };

  handleSubmit(e) {
    e.preventDefault();
    const errors = validate(this.state.email, this.state.firstName, this.state.lastName, this.state.password);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };
    if (!isDisabled) {
      this.props.socketConnection.emit('registration', { email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, password: this.state.password }, function(data) {
        if (data) {
          humane.log('Account was successfully created.');
          this.props.history.push('/login');
        }
        else {
          humane.log('Registration failed.')
        };
      }.bind((this)));
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
};


function validate(email, firstName, lastName, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: validator.isEmpty(email) || !validator.isEmail(email),
    firstName: validator.isEmpty(firstName),
    password: validator.isEmpty(password)
  };
}

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    socketConnection: state.socketConnection
  }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(RegistrationComponent);
