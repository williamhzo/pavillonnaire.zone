import { useEffect } from 'react';
import { useMapBox } from '../hooks/useMapBox';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DetailsModal from './DetailsModal';

type MapProps = {
  hide: boolean;
};

export default function Map({ hide }: MapProps) {
  const { mapContainerRef, feature } = useMapBox();

  function hideDetailsModal(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      document.getElementById('details-dialog')?.classList.add('hidden');
    }

    return;
  }

  useEffect(() => {
    document.body.addEventListener('keydown', hideDetailsModal);

    return () => {
      document.body.removeEventListener('keydown', hideDetailsModal);
    };
  }, []);

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
