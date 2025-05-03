
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";
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
    
    return { midAngle };
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          innerRadius={75}
          outerRadius={120}
          paddingAngle={0}
          dataKey="value"
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-in-out"
          startAngle={90}
          endAngle={-270}
          stroke="none" 
          strokeWidth={0}
          style={{ 
            filter: 'drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.25))',
            transform: 'perspective(800px) rotateX(25deg) scale3d(1.05, 1.05, 1.05)',
            transformOrigin: 'center center',
            transition: 'transform 0.5s ease-out',
          }}
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
              
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
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
        <text
          x="50%"
          y="43%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-base font-semibold"
          style={{ fontWeight: 600, fontSize: '16px' }}
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
          fill="#000000"
        >
          {formatCurrency(totalSalesAmount)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
