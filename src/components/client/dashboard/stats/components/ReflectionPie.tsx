
import React from "react";
import { Pie, Cell } from "recharts";
import { PieDataItem } from "../types/salesTypes";

interface ReflectionPieProps {
  pieData: PieDataItem[];
}

export const ReflectionPie: React.FC<ReflectionPieProps> = ({ pieData }) => {
  return (
    <Pie
      data={pieData}
      innerRadius={85}
      outerRadius={135}
      paddingAngle={0}
      dataKey="value"
      startAngle={90}
      endAngle={-270}
      stroke="none"
      style={{
        pointerEvents: 'none', // Make this pie non-interactive
        opacity: 0.6,
        mixBlendMode: 'overlay',
      }}
    >
      {pieData.map((_, index) => (
        <Cell 
          key={`reflection-${index}`} 
          fill={`url(#reflectionGradient${index})`}
          style={{
            transformOrigin: 'center center',
            pointerEvents: 'none', // Ensure clicks pass through to the main pie
          }}
        />
      ))}
    </Pie>
  );
};
