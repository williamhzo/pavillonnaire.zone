import useMediaQuery from "./useMediaQuery";
import { useEffect, useRef, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const MAPBOX_STYLE = "mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up";
const MAPBOX_API_TOKEN =
  "pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw";
const INITIAL_LONGITUDE = 1.872;
const INITIAL_LATITUDE = 46.62;
const MOBILE_INITIAL_ZOOM = 4.2;
const DESKTOP_INITIAL_ZOOM = 4.4;
const ZOOM_LIMIT = 3;

export function useMapBox() {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const isLaptop = useMediaQuery("(min-width: 1024px)");

  const mapContainerRef = useRef(null);
  const geocoderContainerRef = useRef(null);

  let mapboxgl;

  // FIXME:
  mapboxgl = require("mapbox-gl");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_API_TOKEN,
      style: MAPBOX_STYLE,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: isLaptop ? DESKTOP_INITIAL_ZOOM : MOBILE_INITIAL_ZOOM,
      minZoom: ZOOM_LIMIT,
    });

    const geocoder = new MapboxGeocoder({
      container: geocoderContainerRef.current,
      accessToken: MAPBOX_API_TOKEN,
      countries: "fr",
      language: "fr-FR",
      placeholder: "Recherche par lieu",
      mapboxgl: mapboxgl,
      collapsed: true,
      limit: 3,
      enableEventLogging: false,
      marker: { color: "#000" },
    });

    // Navigation control (zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: false }),
      "top-right"
    );

    // Search
    map.addControl(geocoder, "bottom-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // see https://docs.mapbox.com/help/tutorials/add-points-pt-3/ for more.

    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["edition"],
      });

      if (!features.length) {
        return;
      }

      const feature = features[0];

      console.log(`features`, features);

      const popup = new mapboxgl.Popup({ offset: [0, 0] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.Titre}</h3><p>${feature.properties.Type}</p>`
        )
        .addTo(map);
    });

    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop, mapboxgl]);

  return { mapContainerRef, lng, lat, zoom };
}
