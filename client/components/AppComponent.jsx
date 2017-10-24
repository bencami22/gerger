import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavigationComponent from './NavigationComponent.jsx'
import MainComponent from './MainComponent.jsx'
class AppComponent extends React.Component{
  constructor() {
    super();
    
    this.state = { NavigationDisplay:'anon' }
  }
 
  changeMenu(newValue)
  {
    this.setState({
      NavigationDisplay: newValue,
    });
  };
  
  render() {
    return (
      <BrowserRouter>
      <div>
            <NavigationComponent navigationDisplay= {this.state.NavigationDisplay} changeMenu={this.changeMenu.bind(this)} />
            <MainComponent changeMenu={this.changeMenu.bind(this)}/>
      </div>
      </BrowserRouter>
    );
  };
}
export default AppComponent

