import SEO from '~/components/SEO';
import Map from '~/components/Map';
import About from '~/components/About';
import AboutIcon from '~/components/AboutIcon';
import Instagram from '~/components/Instagram';
import useToggle from '~/hooks/useToggle';
import { useEffect } from 'react';

export default function Homepage() {
  const { value: showAbout, toggle: toggleAbout } = useToggle(false);

  useEffect(() => {
    function hideAbout(e: KeyboardEvent) {
      if (showAbout && e.key === 'Escape') {
        toggleAbout();
      }

      return;
    }

    document.body.addEventListener('keydown', hideAbout);

    return () => {
      document.body.removeEventListener('keydown', hideAbout);
    };
  }, [showAbout, toggleAbout]);

  return (
    <>
      <SEO />
      <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
        <AboutIcon handleClick={toggleAbout} />

        <h1 className="fixed flyToTextButton z-10 mt-7 w-full text-center font-serif text-lg text-white mix-blend-difference">
          <a href="http://www.pavillonnaire.zone/">pavillonnaire.zone</a>
        </h1>

        <Map hide={showAbout} />

        {showAbout && (
          <div className="flex h-full w-full items-start justify-center p-6 py-20 md:p-20">
            <About />
          </div>
        )}

        <Instagram />
      </main>
    </>
  );
}
