import React from 'react';
import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator';

const socket = io.connect();

class RegistrationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      touched: {
        email: false,
        username: false,
        password: false,
        submit: false
      }
    };

    this.handleEmailChange = ::this.handleEmailChange;
    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const errors = validate(this.state.email, this.state.username, this.state.password);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };

    return (
      <form id="registration" onSubmit={this.handleSubmit}>
     <div className="overallDv">
       <div className="rowArea"><label className="registerEmailAlign">Email: </label><input value={this.state.email} className={shouldMarkError('email')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('email')}  onChange={this.handleEmailChange} />< /div>
       <div className="rowArea">Username: <input value={this.state.username}  className={shouldMarkError('username')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('username')}  onChange={this.handleUsernameChange} /></div>
       <div className="rowArea">Password: <input value={this.state.password}  className={shouldMarkError('password')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('password')}  onChange={this.handlePasswordChange} /></div>
       <div className="rowArea"><button className="myButton" type="submit" onClick={this.handleBlur('submit')} disabled={isDisabled}>Register</button></div>
     </div>
        </form>);
  };

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('registration', { email: this.state.email, username: this.state.username, password: this.state.password }, function(data) {
      if (data) {
        humane.log('Account was successfully created.');
        this.props.history.push('/login');
      }
      else {
        humane.log('Registration failed.')
      };
    }.bind((this)));
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
};


function validate(email, username, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: validator.isEmpty(email) || !validator.isEmail(email),
    username: validator.isEmpty(username),
    password: validator.isEmpty(password)
  };
}

export default RegistrationComponent;
