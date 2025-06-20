
import React from 'react';
import { motion } from 'framer-motion';

interface MapRegionProps {
  regionKey: string;
  activeRegion: string | null;
  onRegionClick: (region: string | null) => void;
  onRegionHover: (regionKey: string) => void;
  onRegionLeave: () => void;
  position: React.CSSProperties;
  isMobile: boolean;
}

export function MapRegion({
  regionKey,
  activeRegion,
  onRegionClick,
  onRegionHover,
  onRegionLeave,
  position,
  isMobile
}: MapRegionProps) {
  const regionNames = {
    norte: 'NORTE',
    nordeste: 'NORDESTE',
    centrooeste: 'CENTRO-OESTE',
    sudeste: 'SUDESTE',
    sul: 'SUL'
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={position}
      whileHover={{ scale: 1.02 }}
      onClick={() => onRegionClick(activeRegion === regionKey ? null : regionKey)}
      onMouseEnter={() => onRegionHover(regionKey)}
      onMouseLeave={onRegionLeave}
    >
      <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-white/10">
        {activeRegion === regionKey && (
          <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
            {regionNames[regionKey as keyof typeof regionNames]}
          </div>
        )}
      </div>
    </motion.div>
  );
}
