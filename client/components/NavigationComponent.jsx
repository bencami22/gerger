import React from 'react';
import { Link } from 'react-router-dom';

const socket=io.connect();

class NavigationComponent extends React.Component{
  
  constructor() {
    super();
    this.state = { showNavigation: false}
    this.handleLogout = ::this.handleLogout;
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
                {this.props.navigationDisplay == 'anon' &&
                (
                  <div>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/forgotpassword'>Forgot Password</Link></li>
                    
                  </div>
                )
                }
                {this.props.navigationDisplay == 'regular' &&
                (
                  <div>
                    <li><Link to='/complaints/create'>Create a complaint</Link></li>
                    <li><Link to='/complaints'>View all</Link></li>
                    <li onClick={this.handleLogout}>Log out</li>
                  </div>
                  )
                }
                {this.props.navigationDisplay == 'admin' &&
                (
                  <div>
                  <li onClick={this.handleLogout}>Log out</li>
                  </div>
                )
                }
                
                  
                </ul>
              </nav>
            )}
          </div>
        
      </header>
    );
  };
  
  handleLogout(e) {
    socket.emit('logout');
    {this.props.changeMenu('anon')};
  
};
}  
 export default NavigationComponent;