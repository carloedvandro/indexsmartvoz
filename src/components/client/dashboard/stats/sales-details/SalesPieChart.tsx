
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Rectangle } from "recharts";
import { formatCurrency } from "@/utils/format";
import { PieChartItem } from "./salesDetailsData";

interface SalesPieChartProps {
  pieData: PieChartItem[];
  activeIndex: number | null;
  onButtonClick: (index: number, event: React.MouseEvent) => void;
  totalSalesAmount: number;
}

// Componente para as barras na parte inferior
const BarChart = ({ data }: { data: PieChartItem[] }) => {
  return (
    <div className="flex justify-between w-full mt-4 px-6">
      {data.map((entry, index) => (
        <div key={`bar-${index}`} className="flex flex-col items-center">
          <div className="h-36 w-14 bg-gray-200 relative flex items-end">
            <div 
              className="w-full absolute bottom-0" 
              style={{ 
                backgroundColor: entry.color, 
                height: entry.percentage,
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px'
              }}
            />
          </div>
          <p className="text-gray-500 mt-2 font-medium text-lg">{entry.percentage}</p>
        </div>
      ))}
    </div>
  );
};

export const SalesPieChart: React.FC<SalesPieChartProps> = ({
  pieData,
  activeIndex,
  onButtonClick,
  totalSalesAmount,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-56 mt-10"> {/* Added mt-10 here to move the chart 10px down */}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={80}
              outerRadius={130}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
              stroke="#ffffff"
              strokeWidth={2}
              style={{ 
                filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))',
              }}
            >
              {pieData.map((entry, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{
                      filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))' : 'none',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => onButtonClick(index, e as unknown as React.MouseEvent)}
                  />
                );
              })}
              
              {/* Percentagens destacadas */}
              {pieData.map((entry, index) => {
                const RADIAN = Math.PI / 180;
                const radius = 105;
                const x = Math.cos(-RADIAN * ((index * 40) + 170)) * radius + 200;
                const y = Math.sin(-RADIAN * ((index * 40) + 170)) * radius + 120;
                
                return (
                  <text
                    key={`percentage-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontWeight="bold"
                    fontSize="30px"
                    style={{
                      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                    }}
                    pointerEvents="none"
                  >
                    {entry.percentage}
                  </text>
                );
              })}
            </Pie>
            
            {/* Círculo central */}
            <circle 
              cx="50%" 
              cy="120" 
              r="70" 
              fill="#f5f5f5" 
              stroke="#e0e0e0" 
              strokeWidth={1}
              filter="url(#shadow)"
            />
            
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
              </filter>
            </defs>
            
            <text
              x="50%"
              y="110"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-bold"
              fill="#1D4E89"
            >
              PERCENTAGE
            </text>
            <text
              x="50%"
              y="135"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm"
              fill="#666666"
            >
              infographic
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <BarChart data={pieData} />
    </div>
  );
};
