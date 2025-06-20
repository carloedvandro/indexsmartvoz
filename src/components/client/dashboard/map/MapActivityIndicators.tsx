
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface MapActivityIndicatorsProps {
  regionsData: Record<string, RegionData>;
  isMobile: boolean;
}

export function MapActivityIndicators({ regionsData, isMobile }: MapActivityIndicatorsProps) {
  const getIndicatorPositions = () => ({
    norte: { 
      top: isMobile ? 'calc(25% + 85px)' : 'calc(25% + 90px)',
      left: 'calc(50% - 30px)', 
      transform: 'translate(-50%, -50%)' 
    },
    nordeste: { 
      top: 'calc(42% + 11.5px)', 
      right: 'calc(23.5% + 1.5px)', 
      transform: 'translate(50%, -50%)' 
    },
    centrooeste: { 
      top: 'calc(49%)', 
      left: '50%', 
      transform: 'translate(-50%, -50%)' 
    },
    sudeste: { 
      top: 'calc(62% - 62px)', 
      right: 'calc(26% + 40px)', 
      transform: 'translate(50%, -50%)' 
    },
    sul: { 
      bottom: isMobile ? 'calc(41% + 5px)' : 'calc(41% + 7px)',
      left: 'calc(51.5% - 3px)', 
      transform: 'translate(-50%, 50%)' 
    }
  });

  const positions = getIndicatorPositions();

  return (
    <>
      {Object.entries(regionsData).map(([key, region], index) => {
        const pos = positions[key as keyof typeof positions];
        
        return (
          <motion.div
            key={key}
            className="absolute w-1.5 h-1.5 bg-white rounded-full border border-gray-800 pointer-events-none"
            style={pos}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.4
            }}
          />
        );
      })}
    </>
  );
}
