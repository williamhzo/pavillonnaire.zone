'use client';

import { FC, useState } from 'react';
import { cn } from '@/utils';

import { LAYERS_CONFIG, LayerType } from '@/constants/layers';

import GolfIcon from '../assets/LegendIcons/golf_r.svg';
import IndiaIcon from '../assets/LegendIcons/india_r.svg';
import LimaIcon from '../assets/LegendIcons/lima_r.svg';
import OscarIcon from '../assets/LegendIcons/oscar_r.svg';
import RomeoIcon from '../assets/LegendIcons/romeo_r.svg';
import ZuluIcon from '../assets/LegendIcons/zulu_r.svg';

interface LegendProps {
  visibleLayers: Set<LayerType>;
  onToggle: (layer: LayerType) => void;
}

export const LegendFilter: FC<LegendProps> = ({ visibleLayers, onToggle }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return (
    <nav className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-4">
      {LAYERS_CONFIG.map(({ id, label, Icon }) => {
        const isActive = visibleLayers.has(id as LayerType);
        const isHovered = hoveredId === id;

        return (
          <button
            key={id}
            onClick={() => onToggle(id as LayerType)}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
            className={cn(
              'group relative flex items-center transition-all duration-300 ease-out outline-none',
              isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
            )}
            aria-label={`Filtrer ${label}`}
            aria-pressed={isActive}
          >
            <div
              className={cn(
                'transition-transform duration-300',
                isHovered ? 'scale-110' : 'scale-100'
              )}
            >
              <Icon className="h-9 w-9" />
            </div>

            <span
              className={cn(
                'absolute left-full ml-4 whitespace-nowrap border border-white bg-black px-3 py-1 text-xs text-white font-serif tracking-wider transition-all duration-300',
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-2 opacity-0 pointer-events-none'
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
