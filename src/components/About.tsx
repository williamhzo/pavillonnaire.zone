import { FC } from 'react';

const About: FC = () => {
  return (
    <div className="h-full overflow-auto text-white scrollbar-hide sm:w-11/12 md:w-3/4 lg:w-1/2">
      <div className="flex w-full justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-40"
        >
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="5"
            strokeMiterlimit="10"
            d="M350.345 383.414c-6.536-3.1-4.12-30.707-4.12-38.904 0-15.016-.471-29.215-4.171-43.834-8.88-35.078-11.092-70.56-31.772-103.357-15.878-25.181-48.837-48.157-80.607-60.711-25.358-10.02-49.727-19.585-77.932-22.13-2.657 21.1 20.924 42.882 24.169 63.915-3.6-12.462-13.609-24.203-18.178-36.248-3.33-8.784-6.428-19.754-8.079-28.451 18.307-.711 37.379 1.427 55.293-1.726 13.279-2.338 26.508-6.671 40.35-7.125"
          />
        </svg>
      </div>
      <p className="mb-4">
        Le pavillonnaire est un territoire dont on connaît trop peu la culture.
        Nous sommes beaucoup à y avoir grandi ou vécu, et pourtant l&apos;idée
        d&apos;une culture pavillonnaire reste encore discrète et fragile. Que
        se cache-t-il derrière ces maisons que beaucoup croient toutes
        identiques ? qu&apos;en pensent leurs habitants, et quel univers y
        ont-ils développé ?
      </p>
      <p className="mb-4">
        pavillonnaire.zone (v1.0) est un outil contributif dont le but est de
        faire émerger les éléments d&apos;une culture pavillonnaire, en même
        temps qu&apos;il permet de les situer. La page web rassemblera bientôt
        (future v2.0) les éléments d&apos;une archive et ceux d&apos;une
        cartographie de façon interactive. Elle deviendra le support cliquable à
        une archive géolocalisée.
      </p>
      <p className="mb-4">
        La map donne à voir, sans ambiguïté, et pour la première fois, la
        silhouette du pavillonnaire sur le territoire français. Pixels noirs,
        éparpillés entre campagnes et centres-villes. La trace est issue
        d&apos;un traitement de{' '}
        <a
          className="underline"
          href="https://www.insee.fr/fr/statistiques/2520034"
        >
          données carroyées
        </a>{' '}
        de l&apos;INSEE. Chaque pixel correspond à un carreau de 200/200 mètres,
        estimé à dominante pavillonnaire suivant les{' '}
        <a
          className="underline"
          href="http://www.donnees.normandie.developpement-durable.gouv.fr/pavillonnaire/details.html"
        >
          critères de sélection
        </a>{' '}
        de la DREAL Normandie pour sa démarche « devenir des zones
        pavillonnaires ».
      </p>
      <p className="mb-4">
        L&apos;archive explore l&apos;idée d&apos;une culture pavillonnaire, au
        travers des travaux ou des expériences qui en émanent. Elle rassemble un
        imaginaire en constellation, sans souci de hiérarchie entre les
        différents items qui la composent. Une sélection contributive, à prendre
        comme une exploration, pour la visibilité d&apos;une culture discrète,
        vécue de l&apos;intérieure.
      </p>
      <p className="mb-4">
        <span className="mr-2">🏡</span> Le tout est le fruit de la
        collaboration entre{' '}
        <a
          className="underline"
          href="https://www.linkedin.com/in/samy-brillaud-b94234199/"
        >
          Samy Brillaud
        </a>{' '}
        (curation, QGIS) et{' '}
        <a
          className="underline"
          href="https://www.linkedin.com/in/williamhermozo/"
        >
          William Hermozo
        </a>{' '}
        (développement web) qui ont eux même grandi dans la{' '}
        <a
          className="underline"
          href="https://goo.gl/maps/FFbuSHsMo4TDCq3e8"
          target="_blank"
          rel="noreferrer"
        >
          zone
        </a>
        .
      </p>
      <p className="mb-4">
        <span className="mr-2">✉️</span> Ecrivez-nous si vous voulez{' '}
        <a className="underline" href="mailto:contribuer@pavillonnaire.zone">
          contribuer@pavillonnaire.zone
        </a>
        .
      </p>

      <p>
        <span className="mr-2">💾</span>{' '}
        <a
          className="underline"
          href="./assets/guide-contribution.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Guide contribution
        </a>
      </p>
    </div>
  );
};

export default About;
