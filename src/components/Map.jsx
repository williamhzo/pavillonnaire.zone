import React from "react";
import Div100vh from "react-div-100vh";
import { useMapBox } from "../hooks/useMapBox";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function Map({ hide }) {
  const { mapContainerRef, lng, lat, zoom, flyToLocation } = useMapBox();

  console.log(`{lng, lat, zoom}`, { lng, lat, zoom });

  return (
    <div
      className={`map-container w-full h-full relative ${
        hide ? "hidden" : null
      }`}
      ref={mapContainerRef}
    ></div>
  );
}
