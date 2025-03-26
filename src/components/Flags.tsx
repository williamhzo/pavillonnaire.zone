import { FC, useState } from 'react';
import GolfIcon from '../assets/LegendIcons/golf_r.svg';
import IndiaIcon from '../assets/LegendIcons/india_r.svg';
import LimaIcon from '../assets/LegendIcons/lima_r.svg';
import OscarIcon from '../assets/LegendIcons/oscar_r.svg';
import RomeoIcon from '../assets/LegendIcons/romeo_r.svg';
import ZuluIcon from '../assets/LegendIcons/zulu_r.svg';

export const Flags: FC = () => {
  const [description, setDescription] = useState<JSX.Element | null>(null);

  return (
    <div>
      <div className="mapbox-legend-container">
        {data.map(({ letter, title, description, icon }) => (
          <LegendIcon
            key={letter}
            letter={letter}
            title={title}
            description={description}
            icon={icon}
            setDescription={setDescription}
          />
        ))}
      </div>
      <div className="mapbox-legend-item-description">
        <p className="italic text-center">{description || ''}</p>
      </div>
    </div>
  );
};

const LegendIcon: FC<{
  letter: string;
  title: string;
  description: JSX.Element;
  icon: FC;
  setDescription: (description: JSX.Element | null) => void;
}> = ({ letter, title, description, icon: Icon, setDescription }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <div
      className={`mapbox-legend-item ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => {
        setHovered(true);
        setDescription(description);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setDescription(null);
      }}
    >
      <Icon />
    </div>
  );
};

const data = [
  {
    letter: 'G',
    title: 'Édition',
    description: (
      <>
        <div>
          <p>
            ici on a toutes les échelles de l&apos;<strong>architecture</strong>
            , du <strong>mobilier</strong> au <strong>lotissement</strong>, dès
            lors qu&apos;elles travaillent à partir des existants
            pavillonnaires, et dans une logique de soin, de réparation, de
            détournement ou d&apos;ajout.
          </p>
        </div>
        <div className="mt-4">
          <p>
            Maison, raquette, extension, garage, préfiguration, quartiers
            pionniers
          </p>
        </div>
      </>
    ),
    icon: RomeoIcon,
  },
  {
    letter: 'I',
    title: 'Musique',
    description: (
      <>
        <div>
          <p>
            ici on trouve l&apos;<strong>image</strong> dans toutes ses nuances,
            du papier à l&apos;écran, animé ou pas, du moment qu&apos;elle
            documente en même temps qu&apos;elle développe une{' '}
            <strong>esthétique</strong> propre à la zone et ses imaginaires.
          </p>
        </div>
        <div className="mt-4">
          <p>
            Série photographique, illustration, arts numériques, jeux vidéos,
            sculpture
          </p>
        </div>
      </>
    ),
    icon: LimaIcon,
  },
  {
    letter: 'L',
    title: 'Sports et loisirs',
    description: (
      <>
        <div>
          <p>
            ici on écoute la <strong>radio</strong> le soir avant de dormir, on
            regarde les <strong>clips</strong> en rentrant à la maison, ou dans
            le <strong>mp3</strong> à l&apos;arrière de la voiture sur la
            rocade.
          </p>
        </div>
        <div className="mt-4">
          <p>Musique, clip, concert, podcast, mix, radio</p>
        </div>
      </>
    ),
    icon: IndiaIcon,
  },
  {
    letter: 'M',
    title: 'Initiative',
    description: (
      <>
        <div>
          <p>
            ici on rend visible le <strong>cinéma</strong> dans toutes ces
            durées, la multiplicité et la singularité des regards posés sur le
            pavillonnaire, ou qui en expriment le quotidien et ses drames par
            l&apos;image mouvement et la <strong>narration</strong>.
          </p>
        </div>
        <div className="mt-4">
          <p>Cinéma, long métrage, court métrage, série, vidéo</p>
        </div>
      </>
    ),
    icon: OscarIcon,
  },
  {
    letter: 'O',
    title: 'Urbain',
    description: (
      <>
        <div>
          <p>
            ici on range les <strong>écrits</strong>, qu&apos;ils soient
            théoriques, fictionnels, universitaires, amateurs, sur papier ou à
            l&apos;écran, du moment qu&apos;ils posent les mots sans idées
            préconçues, et <strong>décrivent</strong> l&apos;état des choses
            pavillonnaires.
          </p>
        </div>
        <div className="mt-4">
          <p>Roman, thèse, essai, BD, poésie, article</p>
        </div>
      </>
    ),
    icon: GolfIcon,
  },
  {
    letter: 'R',
    title: 'Audiovisuel',
    description: (
      <>
        <div>
          <p>
            ici on rassemble les <strong>actions</strong> vivantes, physiques et{' '}
            <strong>performatives</strong>, qui transforment les lieux le temps
            de l&apos;éphémère ou les regards et imaginaires de façon durable.
          </p>
        </div>
        <div className="mt-4">
          <p>Théâtre, exposition, performance, sport, initiative, cuisine</p>
        </div>
      </>
    ),
    icon: ZuluIcon,
  },
];
