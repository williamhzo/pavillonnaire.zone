import useMediaQuery from "./useMediaQuery";
import { useEffect, useRef } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const MAPBOX_STYLE = "mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up";
const MAPBOX_API_TOKEN =
  "pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw";
const INITIAL_LONGITUDE = 1.872;
const INITIAL_LATITUDE = 46.62;
const MOBILE_INITIAL_ZOOM = 4;
const DESKTOP_INITIAL_ZOOM = 5;
const MOBILE_FLY_TO_TEXT_ZOOM = 4;
const DESKTOP_FLY_TO_TEXT_ZOOM = 5;
const ZOOM_LIMIT = 3.5;
const FLY_TO_TEXT_LONGITUDE = 46.62;
const FLY_TO_TEXT_LATITUDE = 1.872;

// function defineTargetPosition(isMapToInitialPosition) {
//   return isMapToInitialPosition
//     ? [FLY_TO_TEXT_LONGITUDE, FLY_TO_TEXT_LATITUDE]
//     : [INITIAL_LONGITUDE, INITIAL_LATITUDE];
// }

// function defineTargetZoom(isMapToInitialPosition, isLaptop) {
//   if (isLaptop) {
//     return isMapToInitialPosition
//       ? DESKTOP_FLY_TO_TEXT_ZOOM
//       : DESKTOP_INITIAL_ZOOM;
//   } else {
//     return isMapToInitialPosition
//       ? MOBILE_FLY_TO_TEXT_ZOOM
//       : MOBILE_INITIAL_ZOOM;
//   }
// }

export function useMapBox() {
  // const [isMapToInitialPosition, toggleMapPosition] = useToggle()
  // const [isMapToInitialPosition, toggleMapPosition] = useState(true)

  const isLaptop = useMediaQuery("(min-width: 1024px)");

  const mapContainerRef = useRef(null);
  const geocoderContainerRef = useRef(null);

  let mapboxgl;

  useEffect(() => {
    mapboxgl = require("mapbox-gl");

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
    });

    // Navigation control (zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: isLaptop }),
      "top-right"
    );

    // Search
    map.addControl(geocoder, "bottom-right");

    // Fly to
    // function flyToText() {
    //   map.flyTo({
    //     // These options control the ending camera position: centered at
    //     // the target, at zoom level 9, and north up.
    //     center: defineTargetPosition(isMapToInitialPosition),
    //     zoom: defineTargetZoom(isMapToInitialPosition, isLaptop),
    //     bearing: 0,

    //     // These options control the flight curve, making it move
    //     // slowly and zoom out almost completely before starting
    //     // to pan.
    //     speed: 0.8, // make the flying slow
    //     curve: 1.4, // change the speed at which it zooms out

    //     // This can be any easing function: it takes a number between
    //     // 0 and 1 and returns another number between 0 and 1.
    //     easing: function (t) {
    //       return t
    //     },
    //     essential: true,
    //   })

    //   toggleMapPosition(!isMapToInitialPosition)
    // }

    // Fit to
    // function fitBoundsToText(){
    //   map.fitBounds([
    //     [32.958984, -5.353521],
    //     [43.50585, 5.615985]
    //   ]);

    //   toggleMapPosition(!isMapToInitialPosition)
    // }

    // document.querySelectorAll('.flyToTextButton').forEach((element) => {
    //   // element.addEventListener('click', flyToText)
    //   element.addEventListener('click', fitBoundsToText)
    // })

    // Clean up on unmount
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptop, mapboxgl]);

  return mapContainerRef;
}
