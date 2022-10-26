
import React, {Component} from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation.js';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';

//Particles config
let config = {
  num: [1,],
  rps: 1,
  radius: [0, 25],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-50, 50],
  alpha: [0.6, 0],
  scale: [.1, 0.9],
 // body: icon,
  position: "all",
  color: ["#ffffff", "#ffffff"],
  cross: "dead",
  random: 10

};

const initialState = {
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

  //loads current user from sign in and registry form. routing from registry form is not working properly.
  loadUser = (data) => {
    this.setState({
        user : {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      }
    )
    
  }
  //funcion is called in the onButtonSubmit() where it...
  //takes the json file from the Clarifai FACE DETECTION API and returns the row and col in px.
  //It will be used by dipslayFaceBox to create a <div> around the face.
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width =  Number(image.width);
    const height = Number (image.height);
    return {      
      leftCol: clarifaiFace.left_col* width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height) 
    }
  }

  //funcion is called in the onButtonSubmit() where it... 
  //receives data from calculateFaceLocation to update the box state...
  //box state is used in FaceRecognition component to create a div around the face
  displayFaceBox =(box) => {
    this.setState({box});
    //same as above-->  this.setState({box: box});
  }

  //Detects inputs from the imageLinkForm 
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  //used in ImageLinkForm to submit imageUrl to the Clarifai FACEDETECT API.
  //Clarifai returns json file where we apply functions facecalculate then display facebox.
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input }); 
    fetch('http://localhost:3000/imageurl',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(json=>{ 
      //updates entries state if there is a response.
      if(json){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user,{entries: count})))
        .catch(err => console.log('err: ', err));          
      }
      //json file received from Clarifai API.
      this.displayFaceBox(this.calculateFaceLocation(json));
    })
    .catch(error => console.log('error', error));
  }

  //route is used in a conditional statement in render() for app to display either signin, register or home pages.
  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState(initialState); 
    }else if (route === 'home'){
      this.setState({isSignedIn: true}); //state used for Navigation component to display the sign out button
    }  
    this.setState({route:route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box, user} = this.state ;
    return (
      <div className="App">
        <ParticlesBg type="fountain" config={config} bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'?
          <div >
            <Logo />
            <Rank name ={user.name} entries={user.entries}
            />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        :(
          route === 'signin'?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
          <Register 
          loadUser={this.loadUser} 
          onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
