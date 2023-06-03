'use client';

import Map from 'components/Map';
import About from 'components/About';
import Instagram from 'components/Instagram';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ROOT_PATH = '/';
const ABOUT_PATH = '/?view=about';

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

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <Link
        href={view === 'about' ? ROOT_PATH : ABOUT_PATH}
        className="group absolute left-6 top-6 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border border-white fill-current text-white mix-blend-difference"
      >
        <div className="h-3 w-3 rotate-45 transform bg-white transition duration-300 ease-in-out group-hover:rotate-0" />
      </Link>

      <h1 className="flyToTextButton fixed z-10 mt-7 w-full text-center font-serif text-lg text-white mix-blend-difference">
        <Link href={ROOT_PATH}>pavillonnaire.zone</Link>
      </h1>

      {view === 'about' && (
        <div className="flex h-full w-full items-start justify-center p-6 py-20 md:p-20">
          <About />
        </div>
      )}

      <Map />
      <Instagram />
    </main>
  );
}
