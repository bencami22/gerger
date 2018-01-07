import React from 'react';
import { withRouter } from 'react-router-dom'
import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator';

const queryString = require('query-string');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socketConnection } from '../reducers/reducer-socketConnection';


class ResetPasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(location.search);

        this.state = {
            newPassword: '',
            resetPasswordToken: parsed.token,
            touched: {
                newPassword: false,
                submit: false
            }
        };

        this.handleNewPasswordChange = ::this.handleNewPasswordChange;
        this.handleSubmit = ::this.handleSubmit;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    render() {

        const errors = validate(this.state.newPassword);
        const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = (field) => {
            return errors[field] && (this.state.touched[field] || isDisabled);
        };

        return (
            <form id="login" onSubmit={this.handleSubmit}>
               <div className="overallDv"> 
               <div className="rowArea" > Password: <input type="password" className={shouldMarkError('newPassword')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('newPassword')} value={this.state.newPassword} onChange={this.handleNewPasswordChange} /></div>
                <button type="submit" className="myButton"onClick={this.handleBlur('submit')} disabled={isDisabled}>Change Password</button>
             </div>
      </form>
        );
    };

    handleSubmit(e) {
        e.preventDefault();

        this.props.socketConnection.emit('changePassword', { resetPasswordToken: this.state.resetPasswordToken, newPassword: this.state.newPassword }, function(data) {
            if (data != null && data) {
                humane.log('Successfully reset your password.');
                this.props.history.push('/login');
            }
            else {
                humane.log('Oops, something went wrong.');
            }
        });
    }

    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }
};


function validate(newPassword) {
    // true means invalid, so our conditions got reversed
    return {
        newPassword: validator.isEmpty(newPassword)
    };
}

//passes state into component as a prop
function mapStateToProps(state) {
    return {
        socketConnection: state.socketConnection
    }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(ResetPasswordComponent);
