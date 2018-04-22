import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';
import { setActiveUser } from '../actions/action-activeUser';
import { setComplaints } from '../actions/action-complaints';
import { setJustLoggedOut } from '../actions/action-justLoggedOut';
import { setSortComplaints } from '../actions/action-sortComplaints';

import { withRouter } from 'react-router-dom'
import firebase from 'firebase';


import { socketConnection } from '../reducers/reducer-socketConnection';

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
          <div className="navigation cursor">
            <span onClick={() => this.setState({ showNavigation: !showNavigation })}>
            {showNavigation && (
             <i className="material-icons">keyboard_arrow_up</i>)}
             {!showNavigation &&(
             <i className="material-icons">keyboard_arrow_down</i>)}
            </span>
            { showNavigation && 
            (
            
              <nav>
                <ul className="menu-styling">
                  <li><Link to='/'>Home</Link></li>
                  {(this.props.activeUser ==null || this.props.activeUser.role ==null )&&
                  (
                    <span>
                      <li><Link to='/login'>Login</Link></li>
                      <li><Link to='/register'>Register</Link></li>
                      <li><Link to='/forgotpassword'>Forgot Password</Link></li>
                      <li><Link to='/complaints/create'>Create a complaint</Link></li>
                      <li><Link to='/complaints'>View all</Link></li>
                    </span>
                  )
                  }
                  {this.props.activeUser!=null && this.props.activeUser.role == 'regular' &&
                  (
                    <span>
                      <li><Link to='/complaints/create'>Create a complaint</Link></li>
                      <li><Link to='/complaints'>View all</Link></li>
                      <li onClick={this.handleLogout}>Log out</li>
                    </span>
                    )
                  }
                  {this.props.activeUser!=null && this.props.activeUser.role == 'admin' &&
                  (
                    <span>
                    <li onClick={this.handleLogout}>Log out</li>
                    </span>
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
    this.props.socketConnection.emit('logout');
    this.props.setActiveUser(null);
    this.props.setComplaints(null);
    this.props.setSortComplaints(null);

    firebase.auth().signOut().then(function() {
        this.props.setJustLoggedOut(true);
        // Sign-out successful.
      }.bind(this))
      .catch(function(error) {
        var xxx = 8;
        // An error happened.
      });
    this.props.history.push('/');
  };

}

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    activeUser: state.activeUser,
    socketConnection: state.socketConnection
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActiveUser: setActiveUser,
    setComplaints: setComplaints,
    setJustLoggedOut: setJustLoggedOut,
    setSortComplaints: setSortComplaints
  }, dispatch);
}


//this makes it a container, rather than a dumb component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationComponent));
