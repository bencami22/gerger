import React from 'react';

const socket = io.connect();

class ForgotPasswordComponent extends React.Component {
  constructor() {
    super();
    this.state = { email: '' };

    this.handleEmailChange = ::this.handleEmailChange;
    this.handleSubmit = ::this.handleSubmit;
  }


  render() {
    return (
      <form id="forgotPassword" onSubmit={this.handleSubmit}>
      <div className="overallDv">
          <div className="rowArea">Email: 
             <input value={this.state.email} className="inputStyle" onChange={this.handleEmailChange} />
             
              <button type="submit" className="myButton">Submit</button>
              </div>
            <div className="smallText">we will send you the updated password on this email</div>
          </div>
        </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('forgotPassword', { email: this.state.email }, function(data) {
      alert(data ? 'Success' : 'fail');
    });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
};

export default ForgotPasswordComponent
