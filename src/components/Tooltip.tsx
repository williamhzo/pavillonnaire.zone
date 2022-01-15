import React from 'react';

type TooltipProps = {
  feature: {
    [key: string]: any; // FIXME: fix my type.
  };
};

export default function Tooltip({ feature }: TooltipProps) {
  const { title, type, author, director, artist, album, editor, year, place } =
    feature.properties || {};

  return (
    <div id={feature.id}>
      <h3>{title}</h3>
      <p>{type}</p>
      <p>{author || director}</p>
      <p>{editor}</p>
      <p>{year}</p>
      <p>{place}</p>
    </div>
  );
}
