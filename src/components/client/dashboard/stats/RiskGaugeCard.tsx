
import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeSegment {
  name: string;
  value: number;
  color: string;
  percentage: string;
}

export function RiskGaugeCard() {
  // Data for the risk gauge segments
  const gaugeData: GaugeSegment[] = [
    { name: "100%", value: 12.5, color: "#4CD964", percentage: "100%" }, // Green
    { name: "200%", value: 12.5, color: "#9DE14F", percentage: "200%" }, // Light Green
    { name: "300%", value: 12.5, color: "#D6F54F", percentage: "300%" }, // Yellow-Green
    { name: "400%", value: 12.5, color: "#F9F871", percentage: "400%" }, // Yellow
    { name: "500%", value: 12.5, color: "#FFE566", percentage: "500%" }, // Dark Yellow
    { name: "600%", value: 12.5, color: "#FFCC66", percentage: "600%" }, // Light Orange
    { name: "700%", value: 12.5, color: "#FFA94D", percentage: "700%" }, // Orange
    { name: "800%", value: 12.5, color: "#FF5252", percentage: "800%" }, // Red
  ];

  // Current position of the needle (between 100 and 800)
  const needleValue = 350; // Value between 100 and 800
  const needleAngle = ((needleValue - 100) / 700) * 180 - 90; // Converts to angle between -90 and 90 degrees

  return (
    <Card className="p-6 shadow-sm h-full border-0 rounded-xl shadow-lg mb-8 bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Indicador de Risco</h3>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Category text at the sides */}
        <div className="w-full flex justify-between mb-0 px-8">
          <span className="text-gray-600 text-sm font-medium">BAIXO</span>
          <span className="text-gray-600 text-sm font-medium text-center">MÉDIO</span>
          <span className="text-gray-600 text-sm font-medium">ALTO</span>
        </div>

        <div className="h-52 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {gaugeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Pie>
              
              {/* Percentage labels */}
              {gaugeData.map((entry, index) => {
                const RADIAN = Math.PI / 180;
                // Adjusted to spread the labels evenly across the semi-circle
                const angle = 180 - (index * 22.5 + 11.25);
                const radius = 125;
                const x = 200 + radius * Math.cos(-angle * RADIAN);
                const y = 250 + radius * Math.sin(-angle * RADIAN);
                
                return (
                  <text
                    key={`percentage-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#666666"
                    fontSize="12"
                  >
                    {entry.percentage}
                  </text>
                );
              })}

              {/* Central circle */}
              <circle 
                cx="50%" 
                cy="90%" 
                r="35" 
                fill="#444444" 
              />
              
              {/* RISK text in the center */}
              <text
                x="50%"
                y="90%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontWeight="bold"
                fontSize="16"
              >
                RISK
              </text>
              
              {/* Indicator/Needle */}
              <g transform={`translate(200, 250) rotate(${needleAngle})`}>
                <line 
                  x1="0" 
                  y1="0" 
                  x2="70" 
                  y2="0" 
                  stroke="#333333" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="6" fill="#333333" />
              </g>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Percentage markers below the gauge */}
        <div className="flex justify-between w-full px-4 mt-2">
          <div className="text-xs text-gray-600">100%</div>
          <div className="text-xs text-gray-600">200%</div>
          <div className="text-xs text-gray-600">300%</div>
          <div className="text-xs text-gray-600">400%</div>
          <div className="text-xs text-gray-600">500%</div>
          <div className="text-xs text-gray-600">600%</div>
          <div className="text-xs text-gray-600">700%</div>
          <div className="text-xs text-gray-600">800%</div>
        </div>
      </div>
    </Card>
  );
}
