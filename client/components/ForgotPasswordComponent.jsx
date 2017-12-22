import React from 'react';
import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator'

const socket = io.connect();

class ForgotPasswordComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      touched: {
        email: false,
        submit: false
      }
    };

    this.handleEmailChange = ::this.handleEmailChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {
    const errors = validate(this.state.email);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };

    return (
      <form id="forgotPassword" onSubmit={this.handleSubmit}>
      <div className="overallDv">
          <div className="rowArea">Email: 
             <input value={this.state.email} className={shouldMarkError('email')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('email')} onChange={this.handleEmailChange} />
             
              <button type="submit" className="myButton" onClick={this.handleBlur('submit')} disabled={isDisabled}>Submit</button>
              </div>
            <div className="smallText">we will send you a reset password link.</div>
          </div>
        </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('forgotPassword', { email: this.state.email }, function(data) {
      if (data) {
        humane.log('We have sent you an email so you can reset your password.');
        this.setState({ email: '' });
      }
      else { humane.log('Oops, something went wrong.') };
    }.bind(this));
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
};


function validate(email) {
  // true means invalid, so our conditions got reversed
  return {
    email: validator.isEmpty(email) || !validator.isEmail(email)
  };
}

export default ForgotPasswordComponent
