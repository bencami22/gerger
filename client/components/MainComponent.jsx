import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { complaints } from '../reducers/reducer-complaints';
import { activeUser } from '../reducers/reducer-activeUser';
import { socketConnection } from '../reducers/reducer-socketConnection';
import { sortComplaints } from '../reducers/reducer-sortComplaints';
import { setComplaints } from '../actions/action-complaints';
import { setActiveUser } from '../actions/action-activeUser';
import { setSocketConnection } from '../actions/action-socketConnection';

import Home from './HomeComponent.jsx';
import Login from './LoginComponent.jsx';
import Registration from './RegistrationComponent.jsx';
import ForgotPassword from './ForgotPasswordComponent.jsx';
import ResetPassword from './ResetPasswordComponent.jsx';
import CreateComplaint from './CreateComplaintComponent.jsx';
import ComplaintsView from './ComplaintsViewComponent.jsx';

const socket = io.connect();

class MainComponent extends React.Component {
    constructor(props) {
        super(props);

        this.props.setSocketConnection(socket);

        //because of redux-sessionstorage "sessionStorage.activeUser!=null" is redundant, but leaving it there anyway as should be harmless.
        if (sessionStorage.activeUser != null && (this.props == null || this.props.activeUser == null)) {
            this.props.setActiveUser(JSON.parse(sessionStorage.activeUser));
        }

        if (!firebase.apps.length) {
            var config = {
                apiKey: "AIzaSyB9vgSiajKvo85y6HBtM-k4pk32YS7T_ig",
                authDomain: "gergercomplaints.firebaseapp.com",
                databaseURL: "https://gergercomplaints.firebaseio.com",
                projectId: "gergercomplaints",
                storageBucket: "gergercomplaints.appspot.com",
                messagingSenderId: "486403153169"
            };

            firebase.initializeApp(config);
        }

        socket.on('complaintrec', function(data) {
            //console.log(data);
            var arrayvar;
            if (data.reset) {
                arrayvar = [];
            }
            else {
                if (this.props.complaints != null) {
                    arrayvar = Array.from(this.props.complaints); //Redux doesnt work if the data is mutated.
                }
                if (arrayvar == null) {
                    arrayvar = []
                }
            }

            let complaint = data.data;
            if (data.single && this.props.sortComplaints && this.props.sortComplaints.ordering == "desc") {
                arrayvar.unshift({ author: complaint.user.firstName, avatarUrl: complaint.user.avatarUrl, title: complaint.title, content: complaint.content, locality: complaint.locality, anon: complaint.anon, dtTimestamp: complaint.dtTimestamp, fileUrls: complaint.fileUrls });
            }
            else {
                arrayvar.push({ author: complaint.user.firstName, avatarUrl: complaint.user.avatarUrl, title: complaint.title, content: complaint.content, locality: complaint.locality, anon: complaint.anon, dtTimestamp: complaint.dtTimestamp, fileUrls: complaint.fileUrls });
            }
            this.props.setComplaints(arrayvar);
        }.bind(this))
    }

    render() {
        return (
            <main>
                 <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Register' component={Registration} />
                    <Route path='/ForgotPassword' component={ForgotPassword} />
                    <Route path='/ResetPassword' component={ResetPassword} />
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
        complaints: state.complaints,
        activeUser: state.activeUser,
        socketConnection: state.socketConnection,
        sortComplaints: state.sortComplaints
    }
}

// Get actions and pass them as props to to UserList
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setComplaints: setComplaints, setActiveUser: setActiveUser, setSocketConnection: setSocketConnection }, dispatch);
}

//this makes it a container, rather than a dumb component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
//In the latest beta API however they kind of went back to their previous way of doing things (that is using react context exclusively to communicate changes), connect() prevents that from working by ways of shouldComponentUpdate.

//They have provided again in the beta the withRouter() HOC that solves this nicely, just import it and do

//This should work just fine after that.
//Note that you would also need to wrap any redux connected component that has router components inside it with a withRouter(). That means if you have router Links in your redux connected Nav component for example, you would need to wrap it with withRouter() as well.
