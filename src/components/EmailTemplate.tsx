import { FC } from 'react';
import { ContributionFormData } from '@/components/ContributionForm';

export const EmailTemplate: FC<Readonly<ContributionFormData>> = ({
  title,
  author,
  coordinates,
  year,
  editor,
  description,
  image,
  contributor,
  email,
}) => (
  <div>
    <h1 className="text-3xl font-semibold">
      Nouvelle contrib de {contributor} ({email}) !
    </h1>

    <p>Titre: {title}</p>
    <p>Auteur.ice: {author}</p>
    <p>Coordonnées: {coordinates}</p>
    <p>Année: {year}</p>
    <p>Editeur.ice: {editor}</p>
    <p>Description: {description}</p>
    <p>Image: {image}</p>
    <p>Contributeur: {contributor}</p>
    <p>Email: {email}</p>
  </div>
);
