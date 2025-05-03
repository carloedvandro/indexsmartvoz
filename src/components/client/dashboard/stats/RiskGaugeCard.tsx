
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
  // Dados para os segmentos do medidor de risco
  const gaugeData: GaugeSegment[] = [
    { name: "100%", value: 20, color: "#4CD964", percentage: "100%" }, // Verde escuro
    { name: "200%", value: 20, color: "#9DE14F", percentage: "200%" }, // Verde claro
    { name: "300%", value: 20, color: "#D6F54F", percentage: "300%" }, // Verde-amarelo
    { name: "400%", value: 20, color: "#F9F871", percentage: "400%" }, // Amarelo
    { name: "500%", value: 20, color: "#FFE566", percentage: "500%" }, // Amarelo mais escuro
    { name: "600%", value: 20, color: "#FFCC66", percentage: "600%" }, // Laranja claro
    { name: "700%", value: 20, color: "#FFA94D", percentage: "700%" }, // Laranja
    { name: "800%", value: 20, color: "#FF5252", percentage: "800%" }, // Vermelho
  ];

  // Posição atual do indicador (entre 0 e 360 graus)
  const needleValue = 600; // Valor entre 100 e 800
  const needleAngle = ((needleValue - 100) / 700) * 180 - 90; // Converte para ângulo entre -90 e 90 graus

  return (
    <Card className="p-6 shadow-sm h-full border-0 rounded-xl shadow-lg mb-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Indicador de Risco</h3>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Texto de categorias nos lados */}
        <div className="w-full flex justify-between mb-0 px-8">
          <span className="text-gray-600 text-2xl font-medium">LOW</span>
          <span className="text-gray-600 text-2xl font-medium text-center">MEDIUM</span>
          <span className="text-gray-600 text-2xl font-medium">HIGH</span>
        </div>

        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius={100}
                outerRadius={140}
                paddingAngle={1}
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={1}
              >
                {gaugeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))",
                    }}
                  />
                ))}
              </Pie>
              
              {/* Rótulos dos percentuais */}
              {gaugeData.map((entry, index) => {
                const RADIAN = Math.PI / 180;
                const radius = 120;
                const x = Math.cos(-RADIAN * ((index * 22.5) + 180)) * radius + 200;
                const y = -Math.sin(-RADIAN * ((index * 22.5) + 180)) * radius + 250;
                
                return (
                  <text
                    key={`percentage-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#666666"
                    fontWeight="bold"
                    fontSize="16px"
                  >
                    {entry.percentage}
                  </text>
                );
              })}

              {/* Círculo central */}
              <circle 
                cx="50%" 
                cy="90%" 
                r="45" 
                fill="#444444" 
                stroke="#333333" 
                strokeWidth={1}
                filter="url(#shadow)"
              />
              
              {/* Texto RISK no centro */}
              <text
                x="50%"
                y="90%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontWeight="bold"
                fontSize="22px"
              >
                RISK
              </text>
              
              {/* Ponteiro/Indicador */}
              <g transform={`translate(200, 250) rotate(${needleAngle})`}>
                <line 
                  x1="0" 
                  y1="0" 
                  x2="80" 
                  y2="0" 
                  stroke="#333333" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="8" fill="#333333" />
              </g>
              
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
                </filter>
              </defs>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
