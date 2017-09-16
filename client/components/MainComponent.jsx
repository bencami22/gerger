import React from 'react'
import reactCSS from 'reactcss';
import { Switch, Route } from 'react-router-dom'
import Home from './HomeComponent.jsx'

// import RegistrationComponent from './client/components/RegistrationComponent.jsx';
// import ForgotPasswordComponent from './client/components/ForgotPasswordComponent.jsx';
// import LoginComponent from './client/components/LoginComponent.jsx';
// import CreateComplaintComponent from './client/components/CreateComplaintComponent.jsx';
// import ComplaintsViewComponent from './client/components/ComplaintsViewComponent.jsx';

import Register from './Register.jsx';

class MainComponent extends React.Component{
  constructor() {
    super();
  }
  

render() {
    const styles = reactCSS({
      'default': {
        mainForm: {
          
          
        },
      },
    });
    
    return (
       <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/Register' component={Register}/>
    </Switch>
  </main>
    );
  };
}

export default MainComponent


// ReactDOM.render(
//     React.createElement(RegistrationComponent), document.getElementById("registrationComponent"));
    
// ReactDOM.render(
//     React.createElement(ForgotPasswordComponent), document.getElementById("forgotPasswordComponent"));
    
// ReactDOM.render(
//     React.createElement(LoginComponent), document.getElementById("loginComponent"));
    
// ReactDOM.render(
//     React.createElement(CreateComplaintComponent), document.getElementById("createComplaintComponent"));
    
// ReactDOM.render(
//     React.createElement(ComplaintsViewComponent), document.getElementById("complaintsViewComponent"));

// ReactDOM.render(
//    React.createElement(Register), document.getElementById("registerComponent"));
    
    
    
