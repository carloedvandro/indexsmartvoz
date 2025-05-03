
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
  // Alterando o esquema de cores para seguir o padrão da imagem fornecida
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
  const needleValue = 750; // Alterado para 750 para corresponder à imagem (perto de 800%)
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
        {/* Gauge percentages around the gauge */}
        <div className="relative w-full h-60">
          {/* Percentages positioned strategically around the dial */}
          <div className="absolute top-10 left-5 text-gray-700 font-medium">100%</div>
          <div className="absolute top-2 left-1/4 text-gray-700 font-medium">200%</div>
          <div className="absolute top-0 left-1/3 text-gray-700 font-medium">300%</div>
          <div className="absolute top-0 left-1/2 text-gray-700 font-medium">400%</div>
          <div className="absolute top-0 right-1/3 text-gray-700 font-medium">500%</div>
          <div className="absolute top-2 right-1/4 text-gray-700 font-medium">600%</div>
          <div className="absolute top-10 right-5 text-gray-700 font-medium">700%</div>
          <div className="absolute top-20 right-0 text-gray-700 font-medium">800%</div>

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
      </div>
    </Card>
  );
}
