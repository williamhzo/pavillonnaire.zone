import Div100vh from 'react-div-100vh'
import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/map.css'

import useMediaQuery from '../hooks/useMediaQuery'

const MAPBOX_STYLE = 'mapbox://styles/sabrimyllaud/ckcavaw0y4hx81ipjdzbdw1up'
const MAPBOX_API_TOKEN =
  'pk.eyJ1Ijoic2FicmlteWxsYXVkIiwiYSI6ImNrYWwyYmxmbzA3cnQyeW15cTY0aTd4cTgifQ.6OY0hboWqf4zuhVXdYtFxw'
const INITIAL_LONGITUDE = 1.872
const INITIAL_LATITUDE = 46.62
const MOBILE_INITIAL_ZOOM = 4
const DESKTOP_INITIAL_ZOOM = 5
const ZOOM_LIMIT = 3.5

export default function Homepage() {
  const isLaptop = useMediaQuery('(min-width: 1024px)')

  const mapContainerRef = useRef(null)
  const geocoderContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      accessToken: MAPBOX_API_TOKEN,
      style: MAPBOX_STYLE,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: isLaptop ? DESKTOP_INITIAL_ZOOM : MOBILE_INITIAL_ZOOM,
      minZoom: ZOOM_LIMIT,
    })

    const geocoder = new MapboxGeocoder({
      container: geocoderContainerRef.current,
      accessToken: MAPBOX_API_TOKEN,
      countries: 'fr',
      language: 'fr-FR',
      placeholder: 'Recherche par lieu',
      mapboxgl: mapboxgl,
      collapsed: true,
      limit: 3,
      enableEventLogging: false,
    })

    // Navigation control (zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({ showZoom: isLaptop }),
      'top-right'
    )

    // Search
    map.addControl(geocoder, 'bottom-right')

    // Clean up on unmount
    return () => map.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="w-screen relative">
      <Div100vh className="w-full">
        <h1 className="fixed font-serif text-lg text-white blend-difference text-center w-full mt-7 z-10">
          <a href="http://www.pavillonnaire.zone/">pavillonnaire.zone</a>
        </h1>
        <div
          className="map-container w-full h-full relative"
          ref={mapContainerRef}
        >
          <a
            href="https://www.instagram.com/pavillonnaire.zone/"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              className="fill-current text-white blend-difference absolute z-10 w-9 h-9 left-6 bottom-16"
            >
              <path
                height="100%"
                width="100%"
                d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36z"
              />
            </svg>
          </a>
        </div>
      </Div100vh>
    </main>
  )
}
