import React, {useState} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Registration/Register';
import 'tachyons';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '403c28375aea4433be71d153dd109d37'
});

const particleParams = {
  "particles": {
      "number": {
          "value": 150
      },
      "density": {
        "enable": true,
        "value_area": 800
      }
  }
}

const App = () => {
  const [input, setInput] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [boxes, setBox] = useState([]);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    score: 0,
    joined: ''
  });

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  function calculateBoxLocation(data) {
    const image = document.getElementById('input_img');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    let new_boxes = []

    data.forEach(thing => {
      const box = thing.region_info.bounding_box;
      const new_box = {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
      new_boxes.push(new_box);
    })

    setBox(new_boxes);
    return new_boxes.length;
  }

  const onButtonSubmit = async () => {
    setImageUrl(input);
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        input)
      .then(response => {
        let count = calculateBoxLocation(response.outputs[0].data.regions);
        console.log(count);
        fetch('https://boiling-beyond-21456.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
              id: user.id,
              count: count,
          })
        })
        .then(response => response.json())
        .then(score => {
          const new_user = {
            id: user.id,
            name: user.name,
            email: user.email,
            score: score,
            joined: user.joined
          }
          setUser(new_user);
        })
      },
      function(err) {
        console.log("There was an error");
      }
    );
  }

  const onRouteChange = (route) => {
    if(route === "signin") {
      setInput('');
      setImageUrl('');
      setBox([]);
      setUser({
        id: '',
        name: '',
        email: '',
        score: 0,
        joined: ''
      })
    }
    setRoute(route);
  }
  return (
    <div className="App">
      <Particles params={particleParams} className='particles'/>
      <Navigation onRouteChange={onRouteChange} route={route}/>
      { route === 'home' ? 
        <div className="">
          <Logo />
          <Rank name={user.name} score={user.score}/>
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition image_url={image_url} boxes={boxes} calculateBoxLocation={calculateBoxLocation}/>
      </div>
        :
        route === 'signin' ?
        <SignIn onRouteChange={onRouteChange} setUser={setUser}/>
        :
        <Register onRouteChange={onRouteChange} setUser={setUser}/>
      }
      
    </div>
  );
}


export default App;
