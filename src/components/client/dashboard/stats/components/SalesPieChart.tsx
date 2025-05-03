
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieDataItem } from "../types/salesTypes";
import { ChartGradients } from "./ChartGradients";
import { renderCustomizedLabel } from "./PieChartLabel";
import { ChartCenterContent } from "./ChartCenterContent";
import { ReflectionPie } from "./ReflectionPie";
import { getPopOutOffset } from "../utils/chartAngles";

interface SalesPieChartProps {
  pieData: PieDataItem[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  totalSalesAmount: number;
}

export const SalesPieChart = ({ 
  pieData, 
  activeIndex, 
  setActiveIndex, 
  totalSalesAmount 
}: SalesPieChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart style={{ background: 'transparent' }}>
        <ChartGradients pieData={pieData} />
        
        {/* Main pie with glossy gradients */}
        <Pie
          data={pieData}
          innerRadius={85}
          outerRadius={135}
          paddingAngle={0}
          dataKey="value"
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-in-out"
          startAngle={90}
          endAngle={-270}
          stroke="#ffffff"
          strokeWidth={2}
          style={{ 
            filter: 'drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.25))',
            transform: 'perspective(800px) rotateX(25deg) scale3d(1.05, 1.05, 1.05) translateY(5px)',
            transformOrigin: 'center center',
            transition: 'transform 0.5s ease-out',
          }}
          labelLine={false}
          label={(props) => renderCustomizedLabel(props, pieData, activeIndex)}
          onMouseEnter={(_, index) => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {pieData.map((entry, index) => {
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            const scale = isActive ? 1.12 : isHovered ? 1.06 : 1;
            const zIndex = isActive ? 10 : isHovered ? 5 : 1;
            const opacity = (activeIndex !== null && !isActive && !isHovered) ? 0.7 : 1;
            const offset = getPopOutOffset(index, activeIndex);
            
            // Apply a 3D transform that pushes the active slice forward
            const transform = isActive 
              ? `translateZ(${offset.z}px) scale(${scale})` 
              : isHovered 
                ? `translateZ(10px) scale(${scale})` 
                : `scale(${scale})`;
            
            // Apply enhanced filter for active or hovered state
            const filter = isActive 
              ? 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.4))' 
              : isHovered 
                ? 'drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.3))' 
                : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))';
                
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#glossyGradient${index})`}
                style={{
                  transform,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: filter,
                  cursor: 'pointer',
                  stroke: isHovered && !isActive ? '#ffffff' : undefined,
                  strokeWidth: isHovered && !isActive ? 3 : 2,
                }}
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              />
            );
          })}
        </Pie>
        
        {/* Reflection overlay pie for glossy effect */}
        <ReflectionPie pieData={pieData} />
        
        {/* Center chart content */}
        <ChartCenterContent totalSalesAmount={totalSalesAmount} />
      </PieChart>
    </ResponsiveContainer>
  );
};
