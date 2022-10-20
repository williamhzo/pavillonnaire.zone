import React from 'react';
import { useMapBox } from '../hooks/useMapBox';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DetailsModal from './DetailsModal';

type MapProps = {
  hide: boolean;
};

export default function Map({ hide }: MapProps) {
  const { mapContainerRef, feature } = useMapBox();

  return (
    <>
      <div
        className={`map-container w-full h-full relative ${
          hide ? 'hidden' : ''
        }`}
        ref={mapContainerRef}
      >
        {feature ? <DetailsModal feature={feature} /> : null}
      </div>
    </>
  );
}
