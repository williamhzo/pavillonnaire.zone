import React from "react";

import SEO from "../components/SEO";
import Map from "../components/Map";

export default function Homepage() {
  return (
    <>
      <SEO />
      <main className="w-screen relative">
        <Map />
      </main>
    </>
  );
}
