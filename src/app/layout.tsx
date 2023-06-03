import { ReactNode } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '~/styles/global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.min.js" />

      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'pavillonnaire.zone',
  description: "Une Map pour l'épanouissement d'une culture pavillonnaire 🏡",
  viewport: 'width=device-width',
  openGraph: {
    title: 'pavillonnaire.zone',
    description: "Une Map pour l'épanouissement d'une culture pavillonnaire 🏡",
    locale: 'fr_FR',
    type: 'website',
    url: 'https://www.pavillonnaire.zone.com/',
  },
  icons: {
    icon: './favicon.ico/favicon.ico',
    apple: './apple-touch-icon.png',
  },
  themeColor: '#FF00FF',
};
