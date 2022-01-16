import React from 'react';

type TooltipProps = {
  feature: {
    [key: string]: any; // FIXME: fix my type.
  };
};

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

function Text({ children, className }: TextProps) {
  return <p className={`text-center text-base ${className}`}>{children}</p>;
}

export default function Tooltip({ feature }: TooltipProps) {
  const { title, type, author, director, artist, album, editor, year, place } =
    feature.properties || {};

  return (
    <div id={feature.id} className="max-w-sm">
      <h3 className="font-serif text-center text-lg font-semibold">{title}</h3>
      <Text className="italic">{type}</Text>
      <Text>{author}</Text>
      <Text>{director}</Text>
      <Text>{artist}</Text>
      <Text>{editor}</Text>
      <Text>{album}</Text>
      <Text>{year}</Text>
      <Text>{place}</Text>
    </div>
  );
}
