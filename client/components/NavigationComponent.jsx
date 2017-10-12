import React from 'react';
import { Link } from 'react-router-dom';
import Registration from '../components/RegistrationComponent.jsx';
import ForgotPassword from '../components/ForgotPasswordComponent.jsx';

class NavigationComponent extends React.Component{
  
  constructor() {
    super();
    this.state = { showNavigation: false }
  }
  

  render() {
    const { showNavigation } = this.state
    return (
       <header>
        
          <div className="cursor">
            <span onClick={() => this.setState({ showNavigation: !showNavigation })}>
             <i className="material-icons">keyboard_arrow_down</i>
            </span>
            { showNavigation && 
            (
              <nav>
                <ul className="menu-styling">
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/register'>Register</Link></li>
                  <li><Link to='/forgotpassword'>Forgot Password</Link></li>
                </ul>
              </nav>
            )}
          </div>
        
      </header>
    );
  };
  
};
 
 export default NavigationComponent;