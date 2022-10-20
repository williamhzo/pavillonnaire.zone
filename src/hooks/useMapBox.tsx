import useMediaQuery from './useMediaQuery';
import { useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Tooltip from '../components/Tooltip';

const MAPBOX_STYLE = 'mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up';
const MAPBOX_API_TOKEN =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw';
const INITIAL_LONGITUDE = 1.872;
const INITIAL_LATITUDE = 46.62;
const MOBILE_INITIAL_ZOOM = 4.2;
const DESKTOP_INITIAL_ZOOM = 4.4;
const ZOOM_LIMIT = 3;
const LAYERS = ['musique', 'audiovisuel', 'edition', 'photographie'];

export function useMapBox() {
  const isLaptop = useMediaQuery('(min-width: 1024px)');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const tooltipRef = useRef(new mapboxgl.Popup({ offset: [0, 0] }));

  useEffect(() => {
    const map: mapboxgl.Map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      accessToken: MAPBOX_API_TOKEN,
      style: MAPBOX_STYLE,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: isLaptop ? DESKTOP_INITIAL_ZOOM : MOBILE_INITIAL_ZOOM,
      minZoom: ZOOM_LIMIT,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: MAPBOX_API_TOKEN,
      countries: 'fr',
      language: 'fr-FR',
      placeholder: 'Recherche par lieu',
      mapboxgl: mapboxgl as any,
      collapsed: true,
      limit: 3,
      enableEventLogging: false,
      marker: { color: '#000' } as any,
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
        tooltipRef.current.remove();
        return;
      }

      const feature = features[0];

      // Create tooltip node
      const tooltipNode = document.createElement('div');
      ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

      // Set tooltip on map
      tooltipRef.current
        .setLngLat(event.lngLat)
        .setDOMContent(tooltipNode)
        .addTo(map);
    }

    // desktop
    map.on('mousemove', renderTooltip);
    // mobile
    map.on('touchstart', renderTooltip); // FIXME: should be toggled at click (not only touch start)

    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop]);

  return { mapContainerRef };
}
