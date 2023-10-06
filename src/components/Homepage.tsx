'use client';

import { About } from '@/components/About';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ABOUT_PATH, ROOT_PATH } from '@/paths';
import { useMapBox } from '@/hooks/useMapBox';
import { DetailsModal } from '@/components/DetailsModal';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function Homepage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  useEffect(() => {
    function hideAbout(e: KeyboardEvent) {
      if (view === 'about' && e.key === 'Escape') router.push(ROOT_PATH);
    }

    document.body.addEventListener('keydown', hideAbout);
    return () => {
      document.body.removeEventListener('keydown', hideAbout);
    };
  }, [router, view]);

  useEffect(() => {
    function hideDetailsModal(e: KeyboardEvent) {
      if (e.key === 'Escape')
        document.getElementById('details-dialog')?.classList.add('hidden');
    }

    document.body.addEventListener('keydown', hideDetailsModal);
    return () => {
      document.body.removeEventListener('keydown', hideDetailsModal);
    };
  }, []);

  const { mapContainerRef, feature } = useMapBox();

  return (
    <>
      <Link
        href={view === 'about' ? ROOT_PATH : ABOUT_PATH}
        className="group absolute left-6 top-6 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border border-white fill-current text-white mix-blend-difference"
      >
        <div className="h-3 w-3 rotate-45 transform bg-white transition duration-300 ease-in-out group-hover:rotate-0" />
      </Link>

      {view === 'about' && (
        <div className="flex h-full w-full items-start justify-center p-6 py-20 md:p-20">
          <About />
        </div>
      )}

      {mapContainerRef && (
        <div
          className="map-container relative h-full w-full"
          ref={mapContainerRef}
        >
          <DetailsModal feature={feature} />
        </div>
      )}
    </>
  );
}
