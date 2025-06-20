
import React from 'react';
import { RegionData } from './types';
import { MapTooltip } from './MapTooltip';
import { MapRegion } from './MapRegion';
import { MapActivityIndicators } from './MapActivityIndicators';
import { useMapInteractions } from './hooks/useMapInteractions';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapOverlayProps {
  regionsData: Record<string, RegionData>;
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
}

export function MapOverlay({ regionsData, activeRegion, setActiveRegion }: MapOverlayProps) {
  const isMobile = useIsMobile();
  const {
    hoveredRegion,
    mousePosition,
    isDragging,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleRegionHover,
    handleRegionLeave,
    handleMouseLeave
  } = useMapInteractions(isMobile);

  const getRegionPositions = () => ({
    norte: {
      top: isMobile ? 'calc(8% + 85px)' : 'calc(8% + 90px)',
      left: 'calc(15% - 30px)',
      width: '70%',
      height: '35%',
    },
    nordeste: {
      top: 'calc(25% + 11.5px)',
      right: 'calc(12.5% + 1.5px)',
      width: '45%',
      height: '35%',
    },
    centrooeste: {
      top: '35%',
      left: '35%',
      width: '30%',
      height: '25%',
    },
    sudeste: {
      top: 'calc(50% - 62px)',
      right: 'calc(15% + 40px)',
      width: '40%',
      height: '25%',
    },
    sul: {
      bottom: isMobile ? 'calc(32.5% + 5px)' : 'calc(32.5% + 7px)',
      left: 'calc(51% - 3px)',
      width: '35%',
      height: '15%',
    }
  });

  const regionPositions = getRegionPositions();

  return (
    <>
      <div 
        className="absolute inset-0 w-full h-full" 
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render all regions */}
        {Object.keys(regionsData).map((regionKey) => (
          <MapRegion
            key={regionKey}
            regionKey={regionKey}
            activeRegion={activeRegion}
            onRegionClick={setActiveRegion}
            onRegionHover={handleRegionHover}
            onRegionLeave={handleRegionLeave}
            position={regionPositions[regionKey as keyof typeof regionPositions]}
            isMobile={isMobile}
          />
        ))}

        {/* Activity indicators */}
        <MapActivityIndicators 
          regionsData={regionsData} 
          isMobile={isMobile} 
        />
      </div>

      {/* Tooltip */}
      <MapTooltip
        region={hoveredRegion ? regionsData[hoveredRegion] : null}
        position={mousePosition}
        isVisible={!!hoveredRegion}
        isDragging={isDragging}
      />
    </>
  );
}
