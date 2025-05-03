
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Text, Legend } from "recharts";
import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";

interface SalesChartProps {
  pieData: {
    name: string;
    fullName: string;
    value: number;
    price: number;
    totalAmount: number;
    color: string;
  }[];
  activeIndex: number | null;
  totalSalesAmount: number;
}

export function SalesChart({ pieData, activeIndex, totalSalesAmount }: SalesChartProps) {
  // Custom Legend renderer
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => {
          const isActive = index === activeIndex;
          return (
            <div 
              key={`legend-${index}`} 
              className={`flex items-center transition-all duration-300 ${isActive ? 'scale-105' : ''}`}
            >
              <div 
                className="w-3 h-3 mr-2 rounded-sm" 
                style={{ backgroundColor: entry.color }}
              />
              <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>
                {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[420px] h-[300px] relative flex items-center justify-center -mt-[2px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            innerRadius={90}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-in-out"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            strokeWidth={0}
          >
            {pieData.map((entry, index) => {
              const isActive = index === activeIndex;
              const scale = isActive ? 1.1 : 1;
              const zIndex = isActive ? 10 : 1;
              const opacity = activeIndex !== null && !isActive ? 0.7 : 1;
              
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: 'all 0.3s ease-in-out',
                    zIndex: zIndex,
                    opacity: opacity,
                    filter: isActive ? 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))' : 'none',
                    cursor: 'pointer',
                  }}
                />
              );
            })}
          </Pie>
          <Text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-medium"
            fill="#000000"
          >
            Vendas do Mês
          </Text>
          <Text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-base font-bold"
            fill="#000000"
          >
            {formatCurrency(totalSalesAmount)}
          </Text>
          <Legend 
            content={renderCustomLegend}
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
