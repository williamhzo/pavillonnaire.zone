import { FC } from 'react';
import { FormData } from '@/components/ContributionForm';

export const EmailTemplate: FC<Readonly<FormData>> = ({
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
    <p>title: {title}</p>
    <p>author: {author}</p>
    <p>coordinates: {coordinates}</p>
    <p>year: {year}</p>
    <p>editor: {editor}</p>
    <p>description: {description}</p>
    <p>image: {image}</p>
    <p>contributor: {contributor}</p>
    <p>email: {email}</p>
  </div>
);
