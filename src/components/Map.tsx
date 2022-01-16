import React from 'react';
import { useMapBox } from '../hooks/useMapBox';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

type MapProps = {
  hide: boolean;
};

export default function Map({ hide }: MapProps) {
  const { mapContainerRef } = useMapBox();

  return (
    <div
      className={`map-container w-full h-full relative ${
        hide ? 'hidden' : null
      }`}
      ref={mapContainerRef}
    />
  );
}
