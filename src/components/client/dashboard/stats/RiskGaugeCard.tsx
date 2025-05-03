
import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface GaugeSegment {
  name: string;
  value: number;
  color: string;
  percentage: string;
  // Propriedades para efeito 3D
  shadowColor: string;
  highlightColor: string;
}

export function RiskGaugeCard() {
  // Dados aprimorados para o medidor de risco com cores 3D
  const gaugeData: GaugeSegment[] = [
    { 
      name: "100%", 
      value: 12.5, 
      color: "#4CD964", 
      percentage: "100%",
      shadowColor: "#3AAB4E",
      highlightColor: "#60E278"
    },
    { 
      name: "200%", 
      value: 12.5, 
      color: "#8FE14F", 
      percentage: "200%",
      shadowColor: "#76C53F",
      highlightColor: "#A0F066"
    },
    { 
      name: "300%", 
      value: 12.5, 
      color: "#C5F550", 
      percentage: "300%",
      shadowColor: "#A7D43C",
      highlightColor: "#D4FF60"
    },
    { 
      name: "400%", 
      value: 12.5, 
      color: "#F9F871", 
      percentage: "400%",
      shadowColor: "#E1E15E",
      highlightColor: "#FFFF85"
    },
    { 
      name: "500%", 
      value: 12.5, 
      color: "#FFE566", 
      percentage: "500%",
      shadowColor: "#E5CC51",
      highlightColor: "#FFF07A"
    },
    { 
      name: "600%", 
      value: 12.5, 
      color: "#FFCC66", 
      percentage: "600%",
      shadowColor: "#E5B454",
      highlightColor: "#FFD87A"
    },
    { 
      name: "700%", 
      value: 12.5, 
      color: "#FFA94D", 
      percentage: "700%",
      shadowColor: "#E5933C",
      highlightColor: "#FFBD67"
    },
    { 
      name: "800%", 
      value: 12.5, 
      color: "#FF5252", 
      percentage: "800%",
      shadowColor: "#E53E3E",
      highlightColor: "#FF7070"
    },
  ];

  // Valor atual do ponteiro (entre 100 e 800)
  const needleValue = 350; // Valor entre 100 e 800
  const needleAngle = ((needleValue - 100) / 700) * 180 - 90; // Converte para ângulo entre -90 e 90 graus

  // Função para criar o efeito 3D nos segmentos do medidor
  const create3DSegment = (index: number, active: boolean) => {
    const segment = gaugeData[index];
    return {
      fill: active ? segment.highlightColor : segment.color,
      stroke: segment.shadowColor,
      filter: active ? "url(#shadow-filter)" : "none",
      strokeWidth: 1.5,
      // Adiciona transformações para dar o efeito 3D
      style: {
        transform: active 
          ? `scale(1.05) translateY(-3px)` 
          : `scale(1) translateY(0)`,
        transformOrigin: "center bottom",
        transition: "all 0.3s ease-out"
      }
    };
  };

  // Determina qual segmento está ativo com base no valor do ponteiro
  const getActiveSegmentIndex = () => {
    const percentageValue = needleValue;
    const segmentIndex = Math.floor((percentageValue - 100) / 100);
    return Math.min(Math.max(segmentIndex, 0), 7);
  };

  const activeSegment = getActiveSegmentIndex();

  return (
    <Card className="p-6 shadow-sm h-full border-0 rounded-xl shadow-lg mb-8 bg-white overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black">Indicador de Risco</h3>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Categorias nos lados */}
        <div className="w-full flex justify-between mb-0 px-4">
          <span className="text-gray-600 text-sm font-bold">BAIXO</span>
          <span className="text-gray-600 text-sm font-bold text-center">MÉDIO</span>
          <span className="text-gray-600 text-sm font-bold">ALTO</span>
        </div>

        <div className="h-60 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Filtro SVG para sombras */}
              <defs>
                <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow 
                    dx="0" 
                    dy="3" 
                    stdDeviation="3" 
                    floodColor="#00000033" 
                  />
                </filter>
                <linearGradient id="risk-center-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#555555" />
                  <stop offset="100%" stopColor="#333333" />
                </linearGradient>
              </defs>

              {/* Medidor de risco principal */}
              <Pie
                data={gaugeData}
                cx="50%"
                cy="75%"
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={130}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                strokeLinejoin="round"
              >
                {gaugeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    {...create3DSegment(index, index === activeSegment)}
                  />
                ))}
              </Pie>
              
              {/* Porcentagens nos segmentos */}
              {gaugeData.map((entry, index) => {
                const RADIAN = Math.PI / 180;
                // Calculando a posição para colocar as percentagens no meio de cada segmento
                const angle = 180 - (index * 22.5 + 11.25);
                const radius = 105;
                const x = 200 + radius * Math.cos(-angle * RADIAN);
                const y = 240 + radius * Math.sin(-angle * RADIAN);
                
                return (
                  <text
                    key={`percentage-${index}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#444444"
                    fontWeight="bold"
                    fontSize="14"
                    filter={index === activeSegment ? "drop-shadow(0 1px 1px rgba(255,255,255,0.7))" : "none"}
                  >
                    {entry.percentage}
                  </text>
                );
              })}

              {/* Círculo central com efeito 3D */}
              <circle 
                cx="50%" 
                cy="75%" 
                r="40" 
                fill="url(#risk-center-gradient)" 
                stroke="#222222"
                strokeWidth="2"
                filter="url(#shadow-filter)"
              />
              
              {/* Texto RISK no centro */}
              <text
                x="50%"
                y="75%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontWeight="bold"
                fontSize="18"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
              >
                RISK
              </text>
              
              {/* Ponteiro com efeito 3D */}
              <g transform={`translate(200, 240) rotate(${needleAngle})`}>
                <line 
                  x1="0" 
                  y1="0" 
                  x2="85" 
                  y2="0" 
                  stroke="#333333" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                />
                <circle cx="0" cy="0" r="8" fill="#555555" stroke="#222222" strokeWidth="2" />
                <circle cx="0" cy="0" r="4" fill="#222222" />
              </g>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Marcadores de percentagem abaixo do medidor */}
        <div className="flex justify-between w-full px-2 mt-4 mb-2">
          {gaugeData.map((segment, index) => (
            <div 
              key={`marker-${index}`} 
              className={`text-xs ${index === activeSegment ? 'font-bold' : 'text-gray-600'}`}
            >
              {segment.name}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
