import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/map.css';

const MAPBOX_STYLE = 'mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up';
const INITIAL_POINT_LONGITUDE = 1.872;
const INITIAL_POINT_LATITUDE = 46.62;
const INITIAL_POINT_ZOOM = 5;

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw';

export default function Homepage() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLE,
      center: [INITIAL_POINT_LONGITUDE, INITIAL_POINT_LATITUDE],
      zoom: INITIAL_POINT_ZOOM,
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // map.on('move', () => {
    //   setLongitude(map.getCenter());
    //   setLatitude(map.getCenter());
    //   setZoom(map.getZoom());
    // });

    // clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <main className="h-screen w-screen relative">
      <h1 className="text-2xl text-white blend-difference w-full text-center fixed mt-6 z-10">
        Pavillonnaire.zone
      </h1>
      <div className="map-container w-full h-full" ref={mapContainerRef}></div>
    </main>
  );
}
