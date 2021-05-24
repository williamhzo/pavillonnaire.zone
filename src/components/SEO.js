import React from "react";

import Head from "next/head";

// TODO: SEO!

export default function SEO() {
  return (
    <Head>
      <title>pavillonnaire.zone</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <meta
        name="description"
        content="Une Map pour l'épanouissement d'une culture pavillonnaire 🏡"
      />
      <meta property="og:title" content="pavillonnaire.zone" />
      <meta
        property="og:description"
        content="Une Map pour l'épanouissement d'une culture pavillonnaire 🏡"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:url" content="https://www.pavillonnaire.zone.com/" />
      <link rel="canonical" href="https://www.pavillonnaire.zone.com/" />
      {/* 
        <meta property="og:image" content="https://www.mywebsite.com/image.jpg" />
        <meta property="og:image:alt" content="Image description" />
        <meta name="twitter:card" content="summary_large_image" />
      */}

      <link rel="icon" href="./favicon.ico/favicon.ico" />
      <link rel="icon" href="./favicon.ico/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#FF00FF" />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="./favicon.ico/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="./favicon.ico/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="./favicon.ico/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="./favicon.ico/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="./favicon.ico/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="./favicon.ico/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="./favicon.ico/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="./favicon.ico/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./favicon.ico/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="./favicon.ico/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="./favicon.ico/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="./favicon.ico/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="./favicon.ico/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />

      {/* <link rel="stylesheet" href="/assets/css/styles.css" />
          <link rel="stylesheet" href="/assets/css/print.css" media="print" /> */}
    </Head>
  );
}
