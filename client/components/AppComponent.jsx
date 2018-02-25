import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavigationComponent from './NavigationComponent.jsx'
import MainComponent from './MainComponent.jsx'

class AppComponent extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <BrowserRouter>
      <div>
            <NavigationComponent />
            <MainComponent/>
      </div>
      </BrowserRouter>
    );
  };
}
export default AppComponent
