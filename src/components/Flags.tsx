import { FC, useState } from 'react';
import GolfIcon from '../assets/LegendIcons/golf_r.svg';
import IndiaIcon from '../assets/LegendIcons/india_r.svg';
import LimaIcon from '../assets/LegendIcons/lima_r.svg';
import OscarIcon from '../assets/LegendIcons/oscar_r.svg';
import RomeoIcon from '../assets/LegendIcons/romeo_r.svg';
import ZuluIcon from '../assets/LegendIcons/zulu_r.svg';

export const Flags: FC = () => {
  const [description, setDescription] = useState<string | null>(null);

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
  description: string;
  icon: FC;
  setDescription: (description: string | null) => void; // Add setDescription to props
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
    description:
      "J'ai besoin d'un pilote. Par un navire de pêche : « Je relève mes filets »",
    icon: GolfIcon,
  },
  {
    letter: 'I',
    title: 'Musique',
    description: 'Je viens sur bâbord',
    icon: IndiaIcon,
  },
  {
    letter: 'L',
    title: 'Sports et loisirs',
    description:
      "Stoppez votre navire immédiatement. Si à l'arrêt, signal de quarantaine",
    icon: LimaIcon,
  },
  {
    letter: 'M',
    title: 'Initiative',
    description: "Mon navire est stoppé et n'a plus d'erre",
    icon: OscarIcon,
  },
  {
    letter: 'O',
    title: 'Urbain',
    description: 'Homme à la mer',
    icon: RomeoIcon,
  },
  {
    letter: 'R',
    title: 'Audiovisuel',
    description: 'Signal de procédure',
    icon: ZuluIcon,
  },
];
