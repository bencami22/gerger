import React from 'react';
import session from 'express-session';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveUser } from '../actions/action-activeUser';

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
        Username: <input value={this.state.username} onChange={this.handleUsernameChange} />
        Password: <input value={this.state.password} onChange={this.handlePasswordChange} />
        <button type="submit" className="myButton">Login</button>
      </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();

    socket.emit('authentication', { username: this.state.username, password: this.state.password }, function(data) {
      //if no user found, false will be returned and so anon menu will show, else show menu depending on role
      this.props.setActiveUser(data == false ? 'anon' : 'regular');
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
export default connect(null, mapDispatchToProps)(LoginComponent);
