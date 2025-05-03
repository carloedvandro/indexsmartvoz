
import { PieChart, Pie, Cell, ResponsiveContainer, text } from "recharts";
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
  // Calculate start and end angles for each slice
  const getSliceAngles = (index: number) => {
    const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
    const startAngle = 90; // Top position (in degrees)
    
    // Calculate the start angle for the specific slice
    let currentStartAngle = startAngle;
    for (let i = 0; i < index; i++) {
      currentStartAngle -= (pieData[i].value / total) * 360;
    }
    
    // Calculate the end angle for the specific slice
    const sliceAngle = (pieData[index].value / total) * 360;
    const endAngle = currentStartAngle - sliceAngle;
    
    // Calculate the middle angle of the slice (for the pop-out direction)
    const midAngle = (currentStartAngle + endAngle) / 2;
    
    return {
      startAngle: currentStartAngle,
      endAngle: endAngle,
      midAngle: midAngle
    };
  };

  // Calculate the offset position for the active slice
  const getPopOutOffset = (index: number) => {
    if (index !== activeIndex) return { x: 0, y: 0 };
    
    // Get the middle angle of the slice in radians
    const { midAngle } = getSliceAngles(index);
    const midAngleRad = (midAngle * Math.PI) / 180;
    
    // Distance to pop out
    const distance = 10;
    
    // Calculate the offset using the correct direction
    return {
      x: Math.cos(midAngleRad) * distance,
      y: Math.sin(midAngleRad) * distance
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
            const scale = isActive ? 1.1 : 1;
            const zIndex = isActive ? 10 : 1;
            const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
            const offset = getPopOutOffset(index);
            
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#ffffff"
                strokeWidth={2}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.35))' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
                  outline: 'none',
                }}
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
