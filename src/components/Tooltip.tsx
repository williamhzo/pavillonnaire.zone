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
    <div id={feature.id} className="max-w-sm">
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p className="text-base">{type}</p>
      <p className="text-base">{author || director}</p>
      <p className="text-base">{editor}</p>
      <p className="text-base">{year}</p>
      <p className="text-base">{place}</p>
    </div>
  );
}
