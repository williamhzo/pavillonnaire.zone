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
      <div className="map-container">
        <h1 className="map-title">Pavillonnaire.zone</h1>
        <Map
          style="mapbox://styles/sabrimyllaud/ckal2ef6g3fat1ir1jnzuyh6q"
          containerStyle={{
            height: '100vh',
            width: '100vw',
            // center: [3.92, 46.62], //   [longitude,latitude]
            // zoom: 4,
          }}
        ></Map>
      </div>
    </div>
  );
}

export default App;
