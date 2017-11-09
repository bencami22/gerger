import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setComplaint } from '../actions/action-complaints';
import { complaints } from '../reducers/reducer-complaints';

import Home from './HomeComponent.jsx'
import Login from './LoginComponent.jsx'
import Registration from './RegistrationComponent.jsx'
import ForgotPassword from './ForgotPasswordComponent.jsx'
import CreateComplaint from './CreateComplaintComponent.jsx'
import ComplaintsView from './ComplaintsViewComponent.jsx'

const socket = io.connect();


class MainComponent extends React.Component {
    constructor() {
        super();

        socket.on('complaint', (data) => {
            var arrayvar = this.props.complaints;
            if (arrayvar != null) {
                arrayvar.push({ author: data.author, title: data.title, content: data.content });
                this.props.setComplaint(arrayvar);
            }

        });
    }

    render() {
        return (
            <main>
                 <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Register' component={Registration} />
                    <Route path='/ForgotPassword' component={ForgotPassword} />
                    <Route path='/complaints/create' component={CreateComplaint} />
                    <Route path='/complaints' component={ComplaintsView} />
                </Switch>
            </main>
        );
    };
}
/*
//passes state into component as a prop
function mapStateToProps(state) {
    return {
        complaints: state.complaints
    }
}

// Get actions and pass them as props to to UserList
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setComplaint: setComplaint }, dispatch);
}
*/
//this makes it a container, rather than a dumb component.
export default withRouter(connect(null, null)(MainComponent));
