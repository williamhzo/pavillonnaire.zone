import { FC } from 'react';
import GolfIcon from '@/assets/LegendIcons/golf_r.svg';
import GolfOutlineIcon from '@/assets/LegendIcons/golf_outline.svg';
import IndiaIcon from '@/assets/LegendIcons/india_r.svg';
import IndiaOutlineIcon from '@/assets/LegendIcons/india_outline.svg';
import LimaIcon from '@/assets/LegendIcons/lima_r.svg';
import LimaOutlineIcon from '@/assets/LegendIcons/lima_outline.svg';
import OscarIcon from '@/assets/LegendIcons/oscar_r.svg';
import OscarOutlineIcon from '@/assets/LegendIcons/oscar_outline.svg';
import RomeoIcon from '@/assets/LegendIcons/romeo_r.svg';
import RomeoOutlineIcon from '@/assets/LegendIcons/romeo_outline.svg';
import ZuluIcon from '@/assets/LegendIcons/zulu_r.svg';
import ZuluOutlineIcon from '@/assets/LegendIcons/zulu_outline.svg';

export interface LayerConfig {
  id: string;
  label: string;
  Icon: FC<{ className?: string }>;
  IconOutline?: FC<{ className?: string }>;
}

export const LAYERS_CONFIG = [
  {
    id: 'edition',
    label: 'Édition',
    Icon: GolfIcon,
    IconOutline: GolfOutlineIcon,
  },
  {
    id: 'musique',
    label: 'Musique',
    Icon: IndiaIcon,
    IconOutline: IndiaOutlineIcon,
  },
  {
    id: 'photographie',
    label: 'Photographie',
    Icon: LimaIcon,
    IconOutline: LimaOutlineIcon,
  },
  {
    id: 'audiovisuel',
    label: 'Audiovisuel',
    Icon: OscarIcon,
    IconOutline: OscarOutlineIcon,
  },
  {
    id: 'ville',
    label: 'Ville',
    Icon: RomeoIcon,
    IconOutline: RomeoOutlineIcon,
  },
  {
    id: 'initiative',
    label: 'Initiative',
    Icon: ZuluIcon,
    IconOutline: ZuluOutlineIcon,
  },
] as const;

export const LAYER_IDS = LAYERS_CONFIG.map((layer) => layer.id);

export type LayerType = (typeof LAYERS_CONFIG)[number]['id'];
