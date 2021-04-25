import React from 'react'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/map.css'

import Map from '../components/Map/Map'

export default function Homepage() {
  return (
    <main className="w-screen relative">
      <Map />
    </main>
  )
}
