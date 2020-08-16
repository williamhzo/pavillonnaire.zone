import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw';

function App() {
  const [longitude, setLongitude] = useState(1.872);
  const [latitude, setLatitude] = useState(46.62);
  const [zoom, setZoom] = useState(4.5);

  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up',
      center: [longitude, latitude],
      zoom: zoom,
    });
    map
      .on('move', () => {
        setLongitude(map.getCenter());
        setLatitude(map.getCenter());
        setZoom(map.getZoom());
      })
  }, []);

  return (
    <div className="App">
        <h1 className="map-title">Pavillonnaire.zone</h1>
        <div className="mapContainer"
          ref={(el) => (mapContainer.current = el)}
        ></div>
    </div>
  );
}

export default App;