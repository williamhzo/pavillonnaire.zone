import { FC } from 'react';

export const Flags: FC = () => {
  return (
    <div className="my-12">
      {data.map(({ letter, title, description }) => (
        <Text key={letter} title={title} description={description} />
      ))}
    </div>
  );
};

const Text: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="flex flex-col items-center">
    <p className="font-serif">{title}</p>
    <p className="text-muted italic text-center">{description}</p>
  </div>
);

const data = [
  {
    letter: 'G',
    title: 'Édition',
    description:
      "J'ai besoin d'un pilote. Par un navire de pêche : « Je relève mes filets »",
  },
  {
    letter: 'I',
    title: 'Musique',
    description: 'Je viens sur bâbord',
  },
  {
    letter: 'L',
    title: 'Sports et loisirs',
    description:
      "Stoppez votre navire immédiatement. Si à l'arrêt, signal de quarantaine",
  },
  {
    letter: 'M',
    title: 'Initiative',
    description: "Mon navire est stoppé et n'a plus d'erre",
  },
  {
    letter: 'O',
    title: 'Urbain',
    description: 'Homme à la mer',
  },
  {
    letter: 'R',
    title: 'Audiovisuel',
    description: 'Signal de procédure',
  },
  {
    letter: 'W',
    title: 'Photographie',
    description: "Demande d'assistance médicale",
  },
  {
    letter: 'Y',
    title: 'Design et mode',
    description: 'Mon ancre chasse',
  },
  {
    letter: 'Z',
    title: 'Beaux-arts',
    description:
      "J'ai besoin d'un remorqueur. Par un navire de pêche : « Je mets mes filets à l'eau ».",
  },
];
