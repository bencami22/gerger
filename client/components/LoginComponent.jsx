import React from 'react';
import session from 'express-session';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveUser } from '../actions/action-activeUser';
import { withRouter } from 'react-router-dom'

const socket = io.connect();


class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }


  render() {
    return (
      <form id="login" onSubmit={this.handleSubmit}>
       <div className="overallDv"> 
       <div className="lblStyle" > Username: <input type="text" className="inputStyle" value={this.state.username} onChange={this.handleUsernameChange} /></div>
       <div className="lblStyle" > Password: <input type="text" className="inputStyle" value={this.state.password} onChange={this.handlePasswordChange} /></div>
        <button type="submit" className="myButton">Login</button>
        </div>
      </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();

    socket.emit('authentication', { username: this.state.username, password: this.state.password }, function(data) {
      //if no user found, false will be returned and so anon menu will show, else show menu depending on role
      this.props.setActiveUser(data == false ? 'anon' : 'regular');
      if (data != 'anon') {
        this.props.history.push('/complaints/create');
      }
    }.bind((this)));
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
};


// Get actions and pass them as props to to UserList
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveUser: setActiveUser }, dispatch);
}

//this makes it a container, rather than a dumb component.
export default withRouter(connect(null, mapDispatchToProps)(LoginComponent));
