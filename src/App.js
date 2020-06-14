import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import './App.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw',
});

function App() {
  return (
    <div className="App">
      <Map
        style="mapbox://styles/sabrimyllaud/ckal2ef6g3fat1ir1jnzuyh6q"
        containerStyle={{
          height: '100vh',
          width: '100vw',
          center: [2.351027, 48.856669], //   [longitude,latitude]
          zoom: 12,
          attributionControl: false,
        }}
      ></Map>
    </div>
  );
}

export default App;
