
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
  // For demonstration, setting to a fixed value (around 350%)
  const pointerAngle = -90; // Positioned around 350%
  const pointerLength = 65;
  
  // Calculate pointer coordinates
  const centerX = 200;
  const centerY = 200;
  const pointerEndX = centerX + pointerLength * Math.cos((pointerAngle * Math.PI) / 180);
  const pointerEndY = centerY + pointerLength * Math.sin((pointerAngle * Math.PI) / 180);

  return (
    <div className="risk-gauge-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Semi-circular gauge chart */}
          <Pie
            data={gaugeData}
            innerRadius={90}
            outerRadius={120}
            paddingAngle={3}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            stroke="#ffffff"
            strokeWidth={2}
            cy={200} // Position the center lower to make it semi-circular
            className="risk-gauge"
          >
            {gaugeData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#ffffff"
                strokeWidth={1}
                className="risk-gauge-segment"
              />
            ))}
          </Pie>
          
          {/* Percentage labels */}
          {gaugeData.map((entry, index) => {
            // Calculate position for each percentage label
            const angle = 180 - (index * (180 / gaugeData.length) + (180 / gaugeData.length / 2));
            const radius = 145; // Position labels outside the segments
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
                fontWeight="600"
                fontSize="12px"
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
            fill="#444444" 
            stroke="#333333" 
            strokeWidth={2}
            className="risk-gauge-center"
          />
          
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontWeight="bold"
            fontSize="14px"
          >
            R
          </text>
          <text
            x={centerX}
            y={centerY + 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#33C3F0"
            fontWeight="bold"
            fontSize="14px"
          >
            K
          </text>
          
          {/* Needle pointer */}
          <line
            x1={centerX}
            y1={centerY}
            x2={pointerEndX}
            y2={pointerEndY}
            stroke="#333333"
            strokeWidth={3}
            strokeLinecap="round"
            className="risk-gauge-needle"
          />
          
          {/* Needle base circle */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={6} 
            fill="#222222" 
            stroke="#111111" 
            strokeWidth={1}
          />

          {/* Data summary below gauge */}
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
            y={centerY + 95}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold"
            fill="#000000"
          >
            {formatCurrency(totalSalesAmount)}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
