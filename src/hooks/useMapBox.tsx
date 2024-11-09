'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom';
import mapboxgl, { MapboxGeoJSONFeature, Marker } from 'mapbox-gl';
import { Tooltip } from '@/components/Tooltip';

const INITIAL_LONGITUDE = 1.872;
const INITIAL_LATITUDE = 46.62;
const MOBILE_INITIAL_ZOOM = 4.2;
const DESKTOP_INITIAL_ZOOM = 4.4;
const ZOOM_LIMIT = 3;
const LAYERS = [
  'ville',
  'audiovisuel',
  'edition',
  'musique',
  'photographie',
  'initiative',
  // removed from mapbox
  // 'fashion',
  // 'bozarts',
  // 'sports',
  // 'numerique',
];

export function useMapBox() {
  const [feature, setFeature] = useState<MapboxGeoJSONFeature | undefined>();

  const isLaptop = useMediaQuery('(min-width: 1024px)');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: [0, 0] }));

  useEffect(() => {
    const map: mapboxgl.Map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: isLaptop ? DESKTOP_INITIAL_ZOOM : MOBILE_INITIAL_ZOOM,
      minZoom: ZOOM_LIMIT,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN as string,
      countries: 'fr',
      language: 'fr-FR',
      placeholder: 'Recherche par lieu',
      mapboxgl: mapboxgl,
      collapsed: true,
      limit: 3,
      enableEventLogging: false,
      marker: { color: '#000' } as unknown as Marker,
    });

    // Navigation control (zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: false }),
      'top-right'
    );

    // Search
    map.addControl(geocoder, 'bottom-right');

    // see https://docs.mapbox.com/help/tutorials/add-points-pt-3/ for more.
    // see https://github.com/mapbox/mapbox-react-examples/blob/master/react-tooltip/src/Map.js.

    function renderTooltip(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
      const features = map.queryRenderedFeatures(event.point, {
        layers: LAYERS,
      });

      if (!features.length) {
        map.getCanvas().style.cursor = 'inherit';
        tooltipRef.current.remove();
        return;
      }

      const feature = features[0];
      setFeature(feature);

      map.getCanvas().style.cursor = 'pointer';

      // Create tooltip node
      const tooltipNode = document.createElement('div');

      // TODO: replace deprecated ReactDOM.render below by createRoot.
      // eslint-disable-next-line react/no-deprecated
      ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

      // Set tooltip on map
      tooltipRef.current
        .setLngLat(event.lngLat)
        .setDOMContent(tooltipNode)
        .addTo(map);
    }

    // desktop
    map.on('mousemove', renderTooltip);

    function toggleDetailsDialog(
      event: mapboxgl.MapMouseEvent & mapboxgl.EventData
    ) {
      const dialog = document.getElementById('details-dialog');

      const features = map.queryRenderedFeatures(event.point, {
        layers: LAYERS,
      });

      if (!features.length) {
        dialog?.classList.add('hidden');
        setFeature(undefined);
        return;
      }

      dialog?.classList.remove('hidden');
    }

    map.on('click', toggleDetailsDialog);

    // Clean up on unmount
    return () => map.remove();
  }, [isLaptop]);

  return { mapContainerRef, feature };
}
