'use client';

import { cn } from '@/utils';
import { ComponentProps, FC } from 'react';

function Text({ children, className }: ComponentProps<'p'>) {
  return <p className={cn('text-center text-sm', className)}>{children}</p>;
}

type TooltipProps = {
  feature: mapboxgl.MapboxGeoJSONFeature['state'];
};

export const Tooltip: FC<TooltipProps> = ({ feature }) => {
  const { title, type, author, director, artist, album, editor, year, place } =
    feature.properties || {};

  const types: string[] = type.split(' ; ').join(', ');

  return (
    <div id={title} className="min-w-fit max-w-sm font-body scrollbar-hide">
      <h3 className="mb-2 text-center font-serif text-base leading-6">
        {title}
      </h3>
      <Text className="italic lowercase">{types}</Text>
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
