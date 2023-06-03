'use client';

import { FC, useEffect } from 'react';
import { useMapBox } from 'hooks/useMapBox';
import DetailsModal from 'components/DetailsModal';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map: FC = () => {
  const { mapContainerRef, feature } = useMapBox();

  function hideDetailsModal(e: KeyboardEvent) {
    if (e.key === 'Escape')
      document.getElementById('details-dialog')?.classList.add('hidden');
  }

  useEffect(() => {
    document.body.addEventListener('keydown', hideDetailsModal);
    return () => {
      document.body.removeEventListener('keydown', hideDetailsModal);
    };
  }, []);

  return (
    <div className="map-container relative h-full w-full" ref={mapContainerRef}>
      {feature ? <DetailsModal feature={feature} /> : null}
    </div>
  );
};

export default Map;
