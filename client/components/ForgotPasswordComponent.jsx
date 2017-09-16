import React from 'react';
import reactCSS from 'reactcss';

const socket=io.connect();

class ForgotPasswordComponent extends React.Component{
  constructor() {
    super();
    this.state = {email: ''};
    
    this.handleEmailChange = ::this.handleEmailChange;
    this.handleSubmit = ::this.handleSubmit;
  }
  
 
  render() {
    const styles = reactCSS({
      'default': {
        mainForm: {
          
          
        },
      },
    });
    
    return (
     <form id="forgotPassword" style={styles.mainForm}  onSubmit={this.handleSubmit}>
            Email: <input value={this.state.email} onChange={this.handleEmailChange} />
            <button type="submit" className="myButton">Forgot Password</button>
        </form>
    );
  };
  
  handleSubmit(e) {
    e.preventDefault();
    socket.emit('forgotPassword', {email: this.state.email}, function(data)
    {
      alert(data?'Success':'fail');
    });
  }
  
   handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
};
 
 export default ForgotPasswordComponent