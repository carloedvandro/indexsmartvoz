
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionMarkersProps {
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
  regionsData: Record<string, RegionData>;
}

export function RegionMarkers({ activeRegion, setActiveRegion, regionsData }: RegionMarkersProps) {
  const markers = [
    { key: 'norte', style: { top: '15%', left: '15%' } },
    { key: 'nordeste', style: { top: '25%', right: '10%' } },
    { key: 'centrooeste', style: { top: '45%', left: '10%' } },
    { key: 'sudeste', style: { top: '60%', right: '15%' } },
    { key: 'sul', style: { bottom: '15%', left: '25%' } }
  ];

  return (
    <>
      {markers.map(({ key, style }) => (
        <motion.div
          key={key}
          className="absolute cursor-pointer z-10"
          style={style}
          whileHover={{ scale: 1.1 }}
          onClick={() => setActiveRegion(activeRegion === key ? null : key)}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-300 flex flex-col items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-purple-600 rounded-full mb-1"></div>
              <span className="text-lg font-bold text-purple-600">{regionsData[key].percentage}%</span>
              <span className="text-xs text-purple-600 font-medium text-center leading-tight">
                {key === 'centrooeste' ? 'Centro-Oeste' : regionsData[key].name}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
