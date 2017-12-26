import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveUser } from '../actions/action-activeUser';
import { justLoggedOut } from '../reducers/reducer-justLoggedOut';
import { withRouter } from 'react-router-dom'
import humane from '../public/compiled_js/humane.min.js';
import validator from 'validator';
import firebase from 'firebase';

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
    this.handleFacebookLogin = ::this.handleFacebookLogin;
    this.handleGoogleLogin = ::this.handleGoogleLogin;

    if (!this.props.justLoggedOut) {
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          var user = result.user;
          var additionalUserInfo = result.additionalUserInfo;
          if (token && additionalUserInfo) {
            socket.emit('authenticationOrCreate', {
              email: additionalUserInfo.profile.email,
              firstName: additionalUserInfo.profile.first_name != null ? additionalUserInfo.profile.first_name : additionalUserInfo.profile.given_name,
              lastName: additionalUserInfo.profile.last_name != null ? additionalUserInfo.profile.last_name : additionalUserInfo.profile.family_name,
              uid: additionalUserInfo.profile.id,
              provider: additionalUserInfo.providerId,
              token: token
            }, function(data) {
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
        }
      }.bind(this)).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

      });
    }
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
        
        <button type="button" className="myButton" onClick={this.handleFacebookLogin}>Facebook</button>
        <button type="button" className="myButton" onClick={this.handleGoogleLogin}>Google</button>
        </div>
      </form>
    );
  };

  handleFacebookLogin(e) {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithRedirect(provider);
  }

  handleGoogleLogin(e) {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }


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

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    justLoggedOut: state.justLoggedOut
  }
}

//this makes it a container, rather than a dumb component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
