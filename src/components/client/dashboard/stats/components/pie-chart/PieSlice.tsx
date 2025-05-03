
import React from "react";
import { Cell } from "recharts";
import { PieDataItem } from "../../types/salesTypes";

interface PieSliceProps {
  pieData: PieDataItem[];
  activeIndex: number | null;
  index: number;
  onClick: (index: number | null) => void;
}

export const PieSlice = ({ pieData, activeIndex, index, onClick }: PieSliceProps) => {
  const isActive = index === activeIndex;
  const scale = isActive ? 1.08 : 1;
  const zIndex = isActive ? 10 : 1;
  const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
  const offset = isActive ? 25 : 0; // 3D offset for active slice
  
  // Apply a 3D transform that pushes the active slice forward
  const transform = isActive 
    ? `translateZ(${offset}px) scale(${scale})` 
    : `scale(${scale})`;

  return (
    <Cell 
      key={`cell-${index}`} 
      fill={`url(#glossyGradient${index})`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: zIndex,
        opacity: opacity,
        filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.35))' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
        cursor: 'pointer',
      }}
      onClick={() => onClick(index === activeIndex ? null : index)}
    />
  );
};
