import React from 'react';
import clsx from 'clsx';

type TooltipProps = {
  feature: mapboxgl.MapboxGeoJSONFeature['state'];
};

function Text({ children, className }: React.ComponentProps<'p'>) {
  return (
    <p className={clsx(['text-center', 'text-sm', className])}>{children}</p>
  );
}

const Tooltip: React.FC<TooltipProps> = ({ feature }) => {
  const { title, type, author, director, artist, album, editor, year, place } =
    feature.properties || {};

  return (
    <div id={title} className="min-w-fit max-w-sm font-body scrollbar-hide">
      <h3 className="font-serif text-center text-base leading-6 mb-2">
        {title}
      </h3>
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
};

export default Tooltip;
