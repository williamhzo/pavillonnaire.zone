import { useEffect } from 'react';
import { useMapBox } from '~/hooks/useMapBox';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import DetailsModal from './DetailsModal';

type MapProps = {
  hide: boolean;
};

const Map: React.FC<MapProps> = ({ hide }) => {
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
    <div
      className={`map-container relative h-full w-full ${hide ? 'hidden' : ''}`}
      ref={mapContainerRef}
    >
      {feature ? <DetailsModal feature={feature} /> : null}
    </div>
  );
};

export default Map;
