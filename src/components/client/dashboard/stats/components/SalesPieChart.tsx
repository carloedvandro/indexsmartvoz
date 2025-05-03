
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Text, Label } from "recharts";
import { formatCurrency } from "@/utils/format";
import { PieDataItem } from "../types/salesTypes";

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
  // Get angles for visual purposes only
  const getSliceAngles = (index: number) => {
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
  
  // For 3D effect, we'll create a uniform forward projection instead of radial
  const getPopOutOffset = (index: number) => {
    if (index !== activeIndex) return { x: 0, y: 0, z: 0 };
    
    // Instead of using angles for x/y movement, we'll use a simpler z-projection effect
    return {
      // Much smaller x/y offset - just enough for slight direction hint
      x: 0,
      y: 0,
      z: 25 // This will be used for the 3D transform
    };
  };

  // Custom label component to render only percentage labels inside pie slices
  const renderCustomizedLabel = (props: any) => {
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart style={{ background: 'transparent' }}>
        <defs>
          {pieData.map((entry, index) => (
            <React.Fragment key={`gradient-fragment-${index}`}>
              <linearGradient 
                key={`gradient-${index}`} 
                id={`glossyGradient${index}`} 
                x1="0%" 
                y1="0%" 
                x2="100%" 
                y2="100%"
              >
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="40%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={`${entry.color}dd`} stopOpacity={0.85} />
              </linearGradient>
              
              <linearGradient 
                key={`reflection-${index}`} 
                id={`reflectionGradient${index}`} 
                x1="0%" 
                y1="0%" 
                x2="0%" 
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.5} />
                <stop offset="30%" stopColor="#ffffff" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </React.Fragment>
          ))}
        </defs>
        
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
          label={renderCustomizedLabel}
        >
          {pieData.map((entry, index) => {
            const isActive = index === activeIndex;
            const scale = isActive ? 1.08 : 1;
            const zIndex = isActive ? 10 : 1;
            const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
            const offset = getPopOutOffset(index);
            
            // Apply a 3D transform that pushes the active slice forward
            const transform = isActive 
              ? `translateZ(${offset.z}px) scale(${scale})` 
              : `scale(${scale})`;
              
            // Get pie slice angles for label positioning
            const { midAngle, startAngle, endAngle } = getSliceAngles(index);
              
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
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              />
            );
          })}
        </Pie>
        
        {/* Reflection overlay pie for glossy effect */}
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
          {pieData.map((entry, index) => (
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
        
        <text
          x="50%"
          y="43%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-base"
          style={{ fontSize: '16px', fontWeight: 'normal' }}
          fill="#000000"
        >
          Vendas do Mês
        </text>
        <text
          x="50%"
          y="58%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold"
          style={{ fontWeight: 700, fontSize: '18px' }}
          fill="#13a302"
        >
          {formatCurrency(totalSalesAmount)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

