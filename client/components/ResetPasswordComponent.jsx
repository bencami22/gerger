import React from 'react';
import { withRouter } from 'react-router-dom'

const queryString = require('query-string');
const socket = io.connect();


class ResetPasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        const parsed = queryString.parse(location.search);

        this.state = { newPassword: '', resetPasswordToken: parsed.token };

        this.handleNewPasswordChange = ::this.handleNewPasswordChange;
        this.handleSubmit = ::this.handleSubmit;
    }


    render() {
        return (
            <form id="login" onSubmit={this.handleSubmit}>
               <div className="overallDv"> 
               <div className="rowArea" > Password: <input type="text" className="inputStyle" value={this.state.newPassword} onChange={this.handleNewPasswordChange} /></div>
                <button type="submit" className="myButton">Change Password</button>
             </div>
      </form>
        );
    };

    handleSubmit(e) {
        e.preventDefault();

        socket.emit('changePassword', { resetPasswordToken: this.state.resetPasswordToken, newPassword: this.state.newPassword }, function(data) {
            if (data != 'undefined') {
                this.props.history.push('/complaints/create');
            }
        });
    }

    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }
};
export default ResetPasswordComponent;
