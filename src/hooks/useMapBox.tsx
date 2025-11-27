'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactDOM from 'react-dom';
import mapboxgl, { MapboxGeoJSONFeature, Marker } from 'mapbox-gl';
import { Tooltip } from '@/components/Tooltip';
import { LAYER_IDS, LayerType } from '@/constants/layers';

const INITIAL_LONGITUDE = 1.872;
const INITIAL_LATITUDE = 46.62;
const MOBILE_INITIAL_ZOOM = 4.2;
const DESKTOP_INITIAL_ZOOM = 4.4;
const ZOOM_LIMIT = 3;

export function useMapBox() {
  const [feature, setFeature] = useState<MapboxGeoJSONFeature | undefined>();
  const [visibleLayers, setVisibleLayers] = useState<Set<LayerType>>(
    new Set(LAYER_IDS as LayerType[])
  );
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const isLaptop = useMediaQuery('(min-width: 1024px)');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: [0, 0] }));
  const visibleLayersRef = useRef<Set<LayerType>>(
    new Set(LAYER_IDS as LayerType[])
  );

  useEffect(() => {
    const map: mapboxgl.Map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: isLaptop ? DESKTOP_INITIAL_ZOOM : MOBILE_INITIAL_ZOOM,
      minZoom: ZOOM_LIMIT,
    });

    mapRef.current = map;

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
    map.once('styledata', () => {
      setIsMapLoaded(true);
    });

    function getVisibleFeatures(point: mapboxgl.Point) {
      return map.queryRenderedFeatures(point, {
        layers: Array.from(visibleLayersRef.current),
      });
    }

    // see https://docs.mapbox.com/help/tutorials/add-points-pt-3/ for more.
    // see https://github.com/mapbox/mapbox-react-examples/blob/master/react-tooltip/src/Map.js.

    function renderTooltip(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
      const features = getVisibleFeatures(event.point);

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

      const features = getVisibleFeatures(event.point);

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

  const toggleLayer = (layerId: LayerType) => {
    setVisibleLayers((prev) => {
      const newSet = new Set(prev);
      const willBeVisible = !newSet.has(layerId);

      if (willBeVisible) {
        newSet.add(layerId);
      } else {
        newSet.delete(layerId);
      }

      visibleLayersRef.current = newSet;

      if (mapRef.current?.getLayer(layerId)) {
        mapRef.current.setLayoutProperty(
          layerId,
          'visibility',
          willBeVisible ? 'visible' : 'none'
        );
      }

      return newSet;
    });
  };

  return { mapContainerRef, feature, toggleLayer, visibleLayers, isMapLoaded };
}
