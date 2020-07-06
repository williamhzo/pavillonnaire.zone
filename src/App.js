import React, { useEffect, useState, useRef } from 'react';
// import ReactMapboxGl from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import './App.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw';

function App() {
  const [longitude, setLongitude] = useState(1.87211111);
  const [latitude, setLatitude] = useState(46.6211111);
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
        setLongitude(map.getCenter().longitude);
        setLatitude(map.getCenter().latitude);
        setZoom(map.getZoom());
      })
      .addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.NavigationControl());
  }, []);

  console.log(longitude, latitude, zoom);
  return (
    <div className="App">
      <div className="map-container">
        <h1 className="map-title">Pavillonnaire.zone</h1>
        <div
          className="mapContainer"
          ref={(el) => (mapContainer.current = el)}
        ></div>
      </div>
    </div>
  );
}

export default App;

// const MapboxGLMap = () => {
//   const [map, setMap] = useState(null);
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
//     const initializeMap = ({ setMap, mapContainer }) => {
//       const map = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
//         center: [0, 0],
//         zoom: 5
//       });

//       map.on("load", () => {
//         setMap(map);
//         map.resize();
//       });
//     };

//     if (!map) initializeMap({ setMap, mapContainer });
//   }, [map]);

//   return <div ref={el => (mapContainer.current = el)} style={styles} />;
// };

// geo loc
// map.addControl(new mapboxgl.NavigationControl(), 'bottom-right').addControl(
//   new mapboxgl.GeolocateControl({
//     positionOptions: {
//       enableHighAccuracy: true,
//     },
//     trackUserLocation: true,
//   }),
//   'bottom-right'
// );
