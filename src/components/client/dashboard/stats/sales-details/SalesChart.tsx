
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from "recharts";
import { formatCurrency } from "@/utils/format";

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
            style={{ outline: 'none', pointerEvents: 'none' }}
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
                    outline: 'none',
                    pointerEvents: 'none'
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
