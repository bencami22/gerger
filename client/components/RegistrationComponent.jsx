import React from 'react';

const socket = io.connect();

class RegistrationComponent extends React.Component {
  constructor() {
    super();
    this.state = { email: '', username: '', password: '' };

    this.handleEmailChange = ::this.handleEmailChange;
    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }


  render() {
    return (
      <form id="registration" onSubmit={this.handleSubmit}>
     <div className="overallDv">
       <div className="rowArea"><label className="registerEmailAlign">Email: </label><input value={this.state.email} className = "inputStyle" onChange={this.handleEmailChange} />< /div>
       <div className="rowArea">Username: <input value={this.state.username}  className="inputStyle" onChange={this.handleUsernameChange} /></div>
       <div className="rowArea">Password: <input value={this.state.password}  className="inputStyle" onChange={this.handlePasswordChange} /></div>
       <div className="rowArea"><button className="myButton" type="submit">Register</button></div>
     </div>
        </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('registration', { email: this.state.email, username: this.state.username, password: this.state.password }, function(data) {
      alert(data ? 'Success' : 'fail');
    });
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

export default RegistrationComponent;
