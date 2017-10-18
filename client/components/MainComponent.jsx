import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './HomeComponent.jsx'
import Login from './LoginComponent.jsx'
import Registration from './RegistrationComponent.jsx'
import ForgotPassword from './ForgotPasswordComponent.jsx'

class MainComponent extends React.Component{
  constructor() {
    super();
  }
  

render() {
    return (
       <main>
         <Switch>
           <Route exact path='/' component={Home}/>
           <Route path='/Login' component={Login}/>
            <Route path='/Register' component={Registration}/>
            <Route path='/ForgotPassword' component={ForgotPassword}/>
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
    
    
    
