import React from 'react';
import ReactDOM from 'react-dom';
import router from 'react-router-dom';

// import RegistrationComponent from './client/components/RegistrationComponent.jsx';
// import ForgotPasswordComponent from './client/components/ForgotPasswordComponent.jsx';
// import LoginComponent from './client/components/LoginComponent.jsx';
// import CreateComplaintComponent from './client/components/CreateComplaintComponent.jsx';
// import ComplaintsViewComponent from './client/components/ComplaintsViewComponent.jsx';
import Register from './client/components/Register.jsx';
import App from './client/components/AppComponent.jsx';

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
    
ReactDOM.render(
 React.createElement(App), document.getElementById("appComponent"));
    
    
