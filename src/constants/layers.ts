import { FC } from 'react';
import GolfIcon from '@/assets/LegendIcons/golf_r.svg';
import IndiaIcon from '@/assets/LegendIcons/india_r.svg';
import LimaIcon from '@/assets/LegendIcons/lima_r.svg';
import OscarIcon from '@/assets/LegendIcons/oscar_r.svg';
import RomeoIcon from '@/assets/LegendIcons/romeo_r.svg';
import ZuluIcon from '@/assets/LegendIcons/zulu_r.svg';

export interface LayerConfig {
  id: string;
  label: string;
  Icon: FC<{ className?: string }>;
}

export const LAYERS_CONFIG = [
  { id: 'edition', label: 'Édition', Icon: GolfIcon },
  { id: 'musique', label: 'Musique', Icon: IndiaIcon },
  { id: 'photographie', label: 'Photographie', Icon: LimaIcon },
  { id: 'audiovisuel', label: 'Audiovisuel', Icon: OscarIcon },
  { id: 'ville', label: 'Ville', Icon: RomeoIcon },
  { id: 'initiative', label: 'Initiative', Icon: ZuluIcon },
] as const;

export const LAYER_IDS = LAYERS_CONFIG.map((layer) => layer.id);

export type LayerType = (typeof LAYERS_CONFIG)[number]['id'];
