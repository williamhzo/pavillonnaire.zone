'use client';

import { FC, useState } from 'react';
import { cn } from '@/utils';

import { LAYERS_CONFIG, LayerType } from '@/constants/layers';

interface LegendFilterProps {
  selectedLayers: Set<LayerType>;
  onFilterChange: (layerId: LayerType) => void;
}

export const LegendFilter: FC<LegendFilterProps> = ({
  selectedLayers,
  onFilterChange,
}) => {
  return (
    <nav className="absolute left-6 inset-y-0 flex flex-col justify-center gap-4">
      {LAYERS_CONFIG.map((layer) => {
        const { id, label, Icon, IconOutline } = layer;

        const isSelected = selectedLayers.has(id);
        const CurrentIcon = isSelected ? Icon : IconOutline || Icon;

        return (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={cn(
              'pointer-events-auto group relative flex items-center outline-none'
            )}
            aria-label={`Filtrer ${label}`}
            aria-pressed={isSelected}
          >
            <div className={cn(!isSelected && 'mix-blend-difference', 'z-20')}>
              <CurrentIcon className="h-6 w-6 text-white" />
            </div>

            <span
              className={cn(
                'absolute flex h-6 items-center left-full ml-4 whitespace-nowrap border border-white/20 bg-black px-3 text-xs text-white font-serif tracking-wider z-20 backdrop-blur-sm bg-neutral-800/50',
                'opacity-0 pointer-events-none',
                'group-hover:[@media(hover:hover)]:opacity-100 group-hover:[@media(hover:hover)]:pointer-events-auto',
                isSelected && 'opacity-100 pointer-events-auto'
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
