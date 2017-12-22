import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveUser } from '../actions/action-activeUser';
import { withRouter } from 'react-router-dom'
import humane from '../public/compiled_js/humane.min.js';
import validator from 'validator';

const socket = io.connect();

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      touched: {
        email: false,
        password: false,
        submit: false
      }
    };

    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {

    const errors = validate(this.state.username, this.state.password);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };

    return (
      <form id="login" onSubmit={this.handleSubmit}>
       <div className="overallDv"> 
       <div className="rowArea" > Username: <input type="text" className={shouldMarkError('username')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('username')} value={this.state.username} onChange={this.handleUsernameChange} /></div>
       <div className="rowArea" > Password: <input type="password" className={shouldMarkError('password')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('password')} value={this.state.password} onChange={this.handlePasswordChange} /></div>
        <button type="submit" className="myButton" onClick={this.handleBlur('submit')} disabled={isDisabled}>Login</button>
        </div>
      </form>
    );
  };

  handleSubmit(e) {
    e.preventDefault();

    socket.emit('authentication', { username: this.state.username, password: this.state.password }, function(data) {
      //if no user found, false will be returned and so anon menu will show, else show menu depending on role
      if (data != null && data != false) {
        humane.log('Welcome back ' + data.username + '.');

        this.props.setActiveUser(data);
        this.props.history.push('/complaints/create');

      }
      else {
        this.setState({ username: '', password: '' });
        humane.log('Wrong username or password.');
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

function validate(username, password) {
  // true means invalid, so our conditions got reversed
  return {
    username: validator.isEmpty(username),
    password: validator.isEmpty(password),
  };
}


// Get actions and pass them as props to to UserList
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveUser: setActiveUser }, dispatch);
}

//this makes it a container, rather than a dumb component.
export default withRouter(connect(null, mapDispatchToProps)(LoginComponent));
