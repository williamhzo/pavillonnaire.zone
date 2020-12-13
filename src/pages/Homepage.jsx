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
    })

    // Navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    // Search
    map.addControl(geocoder)

    // Clean up on unmount
    return () => map.remove()
  }, [isLaptop])

  return (
    <main className="h-screen w-screen relative">
      <h1 className="fixed font-serif text-lg text-white blend-difference text-center w-full mt-6 z-10">
        <a href="http://www.pavillonnaire.zone/">pavillonnaire.zone</a>
      </h1>
      <div className="map-container w-full h-full" ref={mapContainerRef}></div>
    </main>
  )
}
