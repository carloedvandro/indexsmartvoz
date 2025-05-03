
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/utils/format";
import { PieChartItem } from "./salesDetailsData";

interface SalesPieChartProps {
  pieData: PieChartItem[];
  activeIndex: number | null;
  onButtonClick: (index: number, event: React.MouseEvent) => void;
  totalSalesAmount: number;
}

export const SalesPieChart: React.FC<SalesPieChartProps> = ({
  pieData,
  activeIndex,
  onButtonClick,
  totalSalesAmount,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          {pieData.map((entry, index) => (
            <linearGradient 
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              x1="0%" 
              y1="0%" 
              x2="100%" 
              y2="100%"
            >
              <stop 
                offset="0%" 
                stopColor={entry.color} 
                stopOpacity={1}
              />
              <stop 
                offset="100%" 
                stopColor={entry.color} 
                stopOpacity={0.7}
              />
            </linearGradient>
          ))}
        </defs>
        
        <Pie
          data={pieData}
          innerRadius={60}
          outerRadius={130}
          paddingAngle={2}
          dataKey="value"
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-out"
          startAngle={90}
          endAngle={-270}
          stroke="#ffffff"
          strokeWidth={3}
          style={{ 
            filter: 'drop-shadow(2px 4px 12px rgba(0, 0, 0, 0.25))',
          }}
        >
          {pieData.map((entry, index) => {
            const isActive = index === activeIndex;
            const scale = isActive ? 1.08 : 1;
            const translateX = isActive ? Math.cos((90 - index * 72) * Math.PI / 180) * 10 : 0;
            const translateY = isActive ? -Math.sin((90 - index * 72) * Math.PI / 180) * 10 : 0;
            
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient-${index})`}
                stroke="#ffffff"
                strokeWidth={3}
                style={{
                  transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                  transformOrigin: 'center center',
                  transition: 'all 0.4s ease-out',
                  filter: isActive ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))',
                  cursor: 'pointer',
                }}
                onClick={(e) => onButtonClick(index, e as unknown as React.MouseEvent)}
              />
            );
          })}
          
          {/* Porcentagens mais destacadas no centro de cada segmento */}
          {pieData.map((entry, index) => {
            const angle = 90 - (index * 360 / pieData.length) - (360 / pieData.length / 2);
            const radius = 95; // Posicionamento mais para o centro do segmento
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = -Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <text
                key={`percentage-${index}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontWeight="bold"
                fontSize="16px"
                style={{
                  filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))',
                  textShadow: '0px 1px 2px rgba(0,0,0,0.5)'
                }}
                pointerEvents="none"
              >
                {entry.percentage}
              </text>
            );
          })}
        </Pie>
        
        {/* Círculo central com informações */}
        <circle 
          cx="50%" 
          cy="50%" 
          r="55" 
          fill="#ffffff" 
          stroke="#f0f0f0" 
          strokeWidth={2}
          filter="url(#shadow)"
        />
        
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>
        
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium"
          fill="#666666"
        >
          Vendas do Mês
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold"
          fill="#000000"
        >
          {formatCurrency(totalSalesAmount)}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};
