
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
  // Create a gauge-style data with fixed segments
  const gaugeData = [
    { name: "100%", value: 1, color: "#5bbc3f" },
    { name: "200%", value: 1, color: "#97c653" },
    { name: "300%", value: 1, color: "#bbde56" },
    { name: "400%", value: 1, color: "#f0ee7e" },
    { name: "500%", value: 1, color: "#f1e157" },
    { name: "600%", value: 1, color: "#f5cb57" },
    { name: "700%", value: 1, color: "#f7a758" },
    { name: "800%", value: 1, color: "#f56e54" },
  ];

  // Calculate pointer angle based on data
  // For demonstration, setting to a fixed value (around 300%)
  const pointerAngle = -120; // Positioned around 300% 
  const pointerLength = 65;
  
  // Calculate pointer coordinates
  const centerX = 200; // Center of the chart
  const centerY = 200;
  const pointerEndX = centerX + pointerLength * Math.cos((pointerAngle * Math.PI) / 180);
  const pointerEndY = centerY + pointerLength * Math.sin((pointerAngle * Math.PI) / 180);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          {gaugeData.map((entry, index) => (
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
                stopOpacity={0.8}
              />
            </linearGradient>
          ))}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset dx="0" dy="1" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
        </defs>
        
        {/* Semi-circular gauge chart */}
        <Pie
          data={gaugeData}
          innerRadius={90}
          outerRadius={130}
          paddingAngle={2}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          stroke="#ffffff"
          strokeWidth={2}
          cy={200} // Position the center lower to make it semi-circular
        >
          {gaugeData.map((entry, index) => {
            // Add 3D effect with highlight and shadow
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#gradient-${index})`}
                stroke="#ffffff"
                strokeWidth={1}
                style={{
                  filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </Pie>
        
        {/* Percentage labels */}
        {gaugeData.map((entry, index) => {
          // Calculate position for each percentage label
          const angle = 180 - (index * (180 / gaugeData.length) + (180 / gaugeData.length / 2));
          const radius = 110; // Position labels inside the segments
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <text
              key={`percentage-${index}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#555"
              fontWeight="bold"
              fontSize="14px"
              style={{
                filter: 'drop-shadow(0px 1px 1px rgba(255,255,255,0.5))',
              }}
            >
              {entry.name}
            </text>
          );
        })}
        
        {/* Center circle with "RISK" text */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={40} 
          fill="#555555" 
          stroke="#444444" 
          strokeWidth={2}
          filter="url(#shadow)"
        />
        
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontWeight="bold"
          fontSize="16px"
        >
          RISK
        </text>
        
        {/* Needle pointer */}
        <line
          x1={centerX}
          y1={centerY}
          x2={pointerEndX}
          y2={pointerEndY}
          stroke="#333333"
          strokeWidth={4}
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
            transformOrigin: `${centerX}px ${centerY}px`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        
        {/* Needle base circle */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={8} 
          fill="#222222" 
          stroke="#111111" 
          strokeWidth={1}
        />
        
        {/* Data summary in bottom */}
        <text
          x={centerX}
          y={centerY + 70}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium"
          fill="#666666"
        >
          Vendas do Mês
        </text>
        <text
          x={centerX}
          y={centerY + 90}
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
