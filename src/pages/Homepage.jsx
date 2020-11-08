import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';

const INITIAL_POINT_LONGITUDE = 1.872;
const INITIAL_POINT_LATITUDE = 46.62;
const INITIAL_POINT_ZOOM = 46.62;

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw';

export default function Homepage() {
  const [longitude, setLongitude] = useState(INITIAL_POINT_LONGITUDE);
  const [latitude, setLatitude] = useState(INITIAL_POINT_LATITUDE);
  const [zoom, setZoom] = useState(INITIAL_POINT_ZOOM);

  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up',
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.on('move', () => {
      setLongitude(map.getCenter());
      setLatitude(map.getCenter());
      setZoom(map.getZoom());
    });
  }, [latitude, longitude, zoom]);

  // h1 {
  //   position: absolute;
  //   left: 50%;
  //   right: 50%;
  //   top: 1.5rem;
  //   color: white;
  //   mix-blend-mode: difference;
  //   font-family: 'Yoster-Island';
  //   font-size: 1.125rem;
  //   z-index: 10;
  // }

  return (
    <div>
      <h1>Pavillonnaire.zone</h1>
      <div
        className="mapContainer"
        ref={(el) => (mapContainer.current = el)}
      ></div>
    </div>
  );
}
