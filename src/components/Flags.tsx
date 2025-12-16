import { FC, useState } from 'react';
import { LAYERS_CONFIG, LayerConfig } from '@/constants/layers';

export const Flags: FC = () => {
  const [hoveredFlag, setHoveredFlag] = useState<LayerConfig | null>(null);
  const [pinnedFlag, setPinnedFlag] = useState<LayerConfig | null>(null);

  const activeLayer = pinnedFlag || hoveredFlag;
  return (
    <div>
      <div className="mapbox-legend-container flex flex-wrap justify-center gap-4 py-8">
        {LAYERS_CONFIG.map((layer) => (
          <LegendIcon
            key={layer.id}
            config={layer}
            hoveredFlag={hoveredFlag}
            setHoveredFlag={setHoveredFlag}
            pinnedFlag={pinnedFlag}
            setPinnedFlag={setPinnedFlag}
          />
        ))}
      </div>
      <div className="mapbox-legend-item-description">
        <div className="text-center leading-relaxed italic">
          {activeLayer ? (
            <>
              <div className="mb-4">
                <p>
                  <strong>{activeLayer.types.join(', ')}</strong>
                </p>
              </div>
              <div>
                <p>{activeLayer.description}</p>
              </div>
            </>
          ) : (
            <p className="opacity-50">
              Survolez ou cliquez sur un pavillon pour voir la description.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const LegendIcon: FC<{
  config: LayerConfig;
  hoveredFlag: LayerConfig | null;
  setHoveredFlag: (layer: LayerConfig | null) => void;
  pinnedFlag: LayerConfig | null;
  setPinnedFlag: (layer: LayerConfig | null) => void;
}> = ({ config, hoveredFlag, setHoveredFlag, pinnedFlag, setPinnedFlag }) => {
  const { Icon, OutlineIcon = Icon } = config;

  const isPinned = pinnedFlag?.id === config.id;
  const isHovered = hoveredFlag?.id === config.id;
  const shouldShowFull = isPinned || isHovered;

  const CurrentIcon = shouldShowFull ? Icon : OutlineIcon || Icon;

  return (
    <div
      className="mapbox-legend-item cursor-pointer"
      onMouseEnter={() => {
        setHoveredFlag(config);
      }}
      onMouseLeave={() => {
        setHoveredFlag(null);
      }}
      onClick={() => {
        if (isPinned) {
          setPinnedFlag(null);
        } else {
          setPinnedFlag(config);
        }
        setHoveredFlag(null);
      }}
    >
      <CurrentIcon className="h-12 w-12 text-white" />
    </div>
  );
};
