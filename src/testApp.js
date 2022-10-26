
import React, {Component} from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './Components/Navigation/Navigation.js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';

class App extends Component  {
    constructor(){
        super();
        this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        }
        }
    }


  //route is used in a conditional statement in render() for app to display either signin, register or home pages.
  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false}); //state used for Navigation component to display the sign in and register buttons
    }else if (route === 'home'){
      this.setState({isSignedIn: true}); //state used for Navigation component to display the sign out button
    }  
    this.setState({route:route});
  }

  render() {
    const {isSignedIn, route} = this.state ;
    return (
      
      <div className="App">
        <ParticlesBg type="fountain" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'?
          <div >
            <Logo />
            <Rank
            />

          </div>
        :(
          route === 'signin'?
          <Signin onRouteChange={this.onRouteChange}/>
          :
          <Register 
          
          onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
