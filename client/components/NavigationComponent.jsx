import React from 'react';
import { Link } from 'react-router-dom';

class NavigationComponent extends React.Component{
  constructor() {
    super();
  }
  
  render() {
    return (
       <header>
        <nav className="menu-styling">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  

};
 
 export default NavigationComponent;