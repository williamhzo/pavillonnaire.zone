import useMediaQuery from "./useMediaQuery";
import { useEffect, useRef, useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import ReactDOM from "react-dom";

import Tooltip from "../components/Tooltip";

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
  mapboxgl = require("mapbox-gl");

  const tooltipRef = useRef(new mapboxgl.Popup({ offset: [0, 0] }));

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
    // see https://github.com/mapbox/mapbox-react-examples/blob/master/react-tooltip/src/Map.js.

    map.on("mousemove", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["edition"],
      });

      if (!features.length) {
        return;
      }

      const feature = features[0];
      console.log(`feature.properties`, feature.properties);

      // Create tooltip node
      const tooltipNode = document.createElement("div");
      ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

      // Set tooltip on map
      tooltipRef.current
        .setLngLat(event.lngLat)
        .setDOMContent(tooltipNode)
        .addTo(map);
    });

    // TODO: clear tooltip at mouse leave
    map.on("mouseleave", (event) => {});

    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop, mapboxgl]);

  return { mapContainerRef, lng, lat, zoom };
}
