import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavigationComponent from './NavigationComponent.jsx'
import MainComponent from './MainComponent.jsx'
import Register from '../components/Register.jsx';

class AppComponent extends React.Component{
  constructor() {
    super();
    
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
            <NavigationComponent />
            <MainComponent />
        </div>
        
        {/* <Switch>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
       <Route
          path="/contact"
          render={() => <h1>Contact Us</h1>} />
        <Route path="/blog" children={({match}) => (
          <li className={match ? 'active' : ''}>
            <Link to="/blog">Blog</Link>
          </li>)} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>*/}
        </BrowserRouter>
    );
  };
}
export default AppComponent
