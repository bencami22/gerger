import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setComplaints } from '../actions/action-complaints';
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
            if (arrayvar == null) {
                arrayvar = []
            }
            arrayvar.push({ author: data.author, title: data.title, content: data.content });
            this.props.setComplaints(arrayvar);


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

//passes state into component as a prop
function mapStateToProps(state) {
    return {
        complaints: state.complaints
    }
}

// Get actions and pass them as props to to UserList
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setComplaints: setComplaints }, dispatch);
}

//this makes it a container, rather than a dumb component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
//In the latest beta API however they kind of went back to their previous way of doing things (that is using react context exclusively to communicate changes), connect() prevents that from working by ways of shouldComponentUpdate.

//They have provided again in the beta the withRouter() HOC that solves this nicely, just import it and do

//This should work just fine after that.
//Note that you would also need to wrap any redux connected component that has router components inside it with a withRouter(). That means if you have router Links in your redux connected Nav component for example, you would need to wrap it with withRouter() as well.
