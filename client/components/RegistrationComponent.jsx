import React from 'react';

const socket=io.connect();

class RegistrationComponent extends React.Component{
  constructor() {
    super();
    this.state = {email:'', username: '', password: ''};
    
    this.handleEmailChange = ::this.handleEmailChange;
    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }
  
 
  render() {
    return (
     <form id="registration" onSubmit={this.handleSubmit}>
            Email: <input value={this.state.email} onChange={this.handleEmailChange} />
            Username: <input value={this.state.username} onChange={this.handleUsernameChange} />
            Password: <input value={this.state.password} onChange={this.handlePasswordChange} />
            <button type="submit">Register</button>
        </form>
    );
  };
  
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('registration', {email:this.state.email, username: this.state.username, password: this.state.password}, function(data)
    {
      alert(data?'Success':'fail');
    });
  }
  
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
   handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
};
 
 export default RegistrationComponent;