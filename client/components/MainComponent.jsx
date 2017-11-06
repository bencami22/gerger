import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './HomeComponent.jsx'
import Login from './LoginComponent.jsx'
import Registration from './RegistrationComponent.jsx'
import ForgotPassword from './ForgotPasswordComponent.jsx'
import CreateComplaint from './CreateComplaintComponent.jsx'
import ComplaintsView from './ComplaintsViewComponent.jsx'

class MainComponent extends React.Component {
    constructor() {
        super();
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

export default MainComponent
