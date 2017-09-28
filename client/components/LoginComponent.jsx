import React from 'react';

const socket=io.connect();

socket.on('authenticated', function() {
    // use the socket as usual 
  });
  
class LoginComponent extends React.Component{
  constructor() {
    super();
    this.state = {username: '', password: ''};
    
    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }
  
 
  render() {
    return (
     <form id="login" onSubmit={this.handleSubmit}>
            Username: <input value={this.state.username} onChange={this.handleUsernameChange} />
            Password: <input value={this.state.password} onChange={this.handlePasswordChange} />
            <button type="submit" class="myButton">Login</button>
        </form>
    );
  };
  
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('authentication', {username: this.state.username, password: this.state.password}, function(data)
    {
      alert(data?'Success':'fail');
    });
  }
  
   handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
};
 
 export default LoginComponent;