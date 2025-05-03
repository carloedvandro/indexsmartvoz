
import React from "react";
import { PieDataItem } from "../types/salesTypes";

interface PieChartLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  pieData: PieDataItem[];
  activeIndex: number | null;
}

export const PieChartLabel: React.FC<PieChartLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
  pieData,
  activeIndex
}) => {
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

export const renderCustomizedLabel = (props: any, pieData: PieDataItem[], activeIndex: number | null) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
  return (
    <PieChartLabel 
      cx={cx}
      cy={cy}
      midAngle={midAngle}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      index={index}
      pieData={pieData}
      activeIndex={activeIndex}
    />
  );
};
