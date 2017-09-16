import React from 'react';
import reactCSS from 'reactcss';

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
   const styles = reactCSS({
    'default': {
    mainForm: {
      marginTop: '8.5em',
      paddingLeft: 50,
      paddingRight: 50,
      
    },
    card: {
      background: 'pink',
      boxShadow: '0 2px 4px rgba(0,0,0,.15)',
      margin: '0.5em',
    },
    focus:{
      borderBottomColor: '#47315a'
    },
    formColor:{
      borderBottomColor: '#47315a',
      background: '#6d92ce',
      width: 500,
      borderRadius: '32px',
      padding: '40px'
    },
    
    
   marginTop10:{
      marginTop: '10px',
    },
    
    marginLeft49:{
     marginLeft: 49,
    },

    inputStyle:{
      borderRadius: '50px',
      lineHeight: '23px',
      padding: '2px'
    },

    marginLeft10:{
      marginLeft: 10
    },

    paddingTop10:{
      paddingTop: 10
    },

    email:{
       paddingLeft: 2,
       paddingRight: 50
    },
},
});
    

    return (
      <div style={styles.mainForm}>
        <form id="registration"  onSubmit={this.handleSubmit}>
        <div style={styles.formColor} className="form">
            <div style={styles.paddingTop10}>Email:
              <input value={this.state.email}  style={Object.assign({}, styles.marginLeft49, styles.inputStyle)}  onChange={this.handleEmailChange} />
            </div>
            
            <div style={styles.marginTop10}>Username:
              <input value={this.state.username} style={ styles.inputStyle} onChange={this.handleUsernameChange} />
            </div>
    
              <button style={styles.marginTop10} type="submit" className="myButton">Register</button>
       
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
    redirectToDefault();
    
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
 function redirectToDefault()
  {
    window.location = "http://www.google.com";
  }

 
 export default Register;