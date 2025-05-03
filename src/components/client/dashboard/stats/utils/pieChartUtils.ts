
/**
 * Helper functions for pie chart calculations and effects
 */

import { PieDataItem } from "../types/salesTypes";

/**
 * Calculate the slice angles for a pie chart
 */
export const getSliceAngles = (pieData: PieDataItem[], index: number) => {
  const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
  let startAngle = 90; // Start at top (90 degrees in recharts coordinates)
  
  // Calculate start angle by summing up angles of previous slices
  for (let i = 0; i < index; i++) {
    startAngle -= (pieData[i].value / total) * 360;
  }
  
  // Calculate end angle
  const sliceAngle = (pieData[index].value / total) * 360;
  const endAngle = startAngle - sliceAngle;
  
  // Middle angle is the direction the slice should move when selected
  const midAngle = (startAngle + endAngle) / 2;
  
  return { midAngle, startAngle, endAngle };
};

/**
 * Get offset position for active pie slice
 */
export const getPopOutOffset = (index: number, activeIndex: number | null) => {
  if (index !== activeIndex) return { x: 0, y: 0, z: 0 };
  
  // Instead of using angles for x/y movement, we'll use a simpler z-projection effect
  return {
    // Much smaller x/y offset - just enough for slight direction hint
    x: 0,
    y: 0,
    z: 25 // This will be used for the 3D transform
  };
};
