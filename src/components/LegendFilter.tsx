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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return (
    <nav className="absolute left-6 inset-y-0 flex flex-col justify-center gap-4">
      {LAYERS_CONFIG.map((layer) => {
        const { id, label, Icon, IconOutline } = layer;

        const isSelected = selectedLayers.has(id);
        const CurrentIcon = isSelected ? Icon : IconOutline || Icon;
        const isHovered = hoveredId === id;

        return (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
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
                isHovered || isSelected
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
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
