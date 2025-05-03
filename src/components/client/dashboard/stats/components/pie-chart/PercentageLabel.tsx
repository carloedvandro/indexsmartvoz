
import React from "react";
import { PieDataItem } from "../../types/salesTypes";

interface PercentageLabelProps {
  props: any;
  pieData: PieDataItem[];
  activeIndex: number | null;
}

export const PercentageLabel = ({ props, pieData, activeIndex }: PercentageLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
  // Position the label inside the slice rather than outside
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
  // Only render if this slice is active or if there's no active slice
  if (activeIndex === null || activeIndex === index) {
    return (
      <text 
        x={x} 
        y={y} 
        fill="#FFFFFF" 
        textAnchor="middle" 
        dominantBaseline="central"
        style={{ 
          fontSize: '15px', 
          fontWeight: 'bold',
          filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.8))',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
        }}
      >
        {`${pieData[index].percentage}%`}
      </text>
    );
  }
  return null;
};
