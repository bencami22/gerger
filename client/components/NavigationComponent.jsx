import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';

const socket = io.connect();

class NavigationComponent extends React.Component {

  constructor() {
    super();
    this.state = { showNavigation: false }
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
                {this.props.activeUser ==null &&
                (
                  <div>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/forgotpassword'>Forgot Password</Link></li>
                  </div>
                )
                }
                {this.props.activeUser == 'regular' &&
                (
                  <div>
                    <li><Link to='/complaints/create'>Create a complaint</Link></li>
                    <li><Link to='/complaints'>View all</Link></li>
                    <li onClick={this.handleLogout}>Log out</li>
                  </div>
                  )
                }
                {this.props.activeUser == 'admin' &&
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
    socket.emit('logout'); { this.props.loggedInUser(null) };

  };
}

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    activeUser: state.activeUser
  }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(NavigationComponent);
