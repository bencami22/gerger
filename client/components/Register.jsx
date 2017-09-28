import React from 'react';

const socket=io.connect();

class Register extends React.Component{
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
      <div>
        <form id="registration"  onSubmit={this.handleSubmit}>
          <div>
            <div>Email:
              <input value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            
            <div>Username:
              <input value={this.state.username} onChange={this.handleUsernameChange} />
            </div>
              <button type="submit">Register</button>
          </div>
        </form>
      </div>
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

 
 export default Register;