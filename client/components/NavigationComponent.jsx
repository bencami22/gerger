import React from 'react';
import reactCSS from 'reactcss';
import { Link } from 'react-router-dom';

class NavigationComponent extends React.Component{
  constructor() {
    super();
  }
  
  render() {
    const styles = reactCSS({
      'default': {
          ul:{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            backgroundColor: '#333'
          },
          li:{
            float: 'left'
          },
          'li a':{
            display: 'block',
            color: 'white',
            textAlign: 'center',
            padding: '14px 16px',
            textDecoration: 'none'
          }
        },
        'hover':
        {
          'li a':
          {
            backgroundColor: '#111'
          }
        }
      },
    });
    
    return (
       <header>
        <nav>
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