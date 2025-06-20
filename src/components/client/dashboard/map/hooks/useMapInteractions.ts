
import { useState, useCallback } from 'react';

export const useMapInteractions = (isMobile: boolean) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    setHoveredRegion(null);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleRegionHover = useCallback((regionKey: string) => {
    if (!isMobile && !isDragging) {
      setHoveredRegion(regionKey);
    }
  }, [isMobile, isDragging]);

  const handleRegionLeave = useCallback(() => {
    if (!isMobile) {
      setHoveredRegion(null);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setHoveredRegion(null);
    setIsDragging(false);
  }, []);

  return {
    hoveredRegion,
    mousePosition,
    isDragging,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleRegionHover,
    handleRegionLeave,
    handleMouseLeave
  };
};
