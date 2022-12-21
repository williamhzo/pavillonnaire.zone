import SEO from '../components/SEO';
import Map from '../components/Map';
import About from '../components/About';
import AboutIcon from '../components/AboutIcon';
import Instagram from '../components/Instagram';
import useToggle from '../hooks/useToggle';

export default function Homepage() {
  const { value: showAbout, toggle: toggleAbout } = useToggle(false);

  return (
    <>
      <SEO />
      <main className="h-[100dvh] w-full relative bg-black overflow-hidden">
        <AboutIcon handleClick={toggleAbout} />

        <h1 className="flyToTextButton fixed font-serif text-lg text-white blend-difference text-center w-full mt-7 z-10">
          <a href="http://www.pavillonnaire.zone/">pavillonnaire.zone</a>
        </h1>

        <Map hide={showAbout} />

        {showAbout && (
          <div className="h-full w-full flex justify-center items-start p-6 py-20 md:p-20">
            <About />
          </div>
        )}

        <Instagram />
      </main>
    </>
  );
}
