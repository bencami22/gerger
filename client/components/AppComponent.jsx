import React from 'react'
import reactCSS from 'reactcss';
import { BrowserRouter } from 'react-router-dom'
import NavigationComponent from './NavigationComponent.jsx'
import MainComponent from './MainComponent.jsx'

class AppComponent extends React.Component{
  constructor() {
    super();
    
  }
  
  render() {
    const styles = reactCSS({
      'default': {
        mainForm: {
          
          
        },
      },
    });
    
    return (
      <BrowserRouter>
        <div>
            <NavigationComponent />
            <MainComponent />
        </div>
        </BrowserRouter>
    );
  };
  
}

export default AppComponent
