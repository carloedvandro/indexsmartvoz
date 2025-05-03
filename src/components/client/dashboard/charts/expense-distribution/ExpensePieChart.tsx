
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ExpenseItem } from "./types";
import { ExpenseTooltip } from "./ExpenseTooltip";

interface ExpensePieChartProps {
  expenseData: ExpenseItem[];
}

export const ExpensePieChart = ({ expenseData }: ExpensePieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="h-48 relative" style={{ zIndex: 10 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart style={{ border: '1px solid transparent' }}>
          <Pie
            data={expenseData}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-in-out"
            cursor="pointer"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            stroke="transparent"
            strokeWidth={0}
          >
            {expenseData.map((entry, index) => {
              const isActive = index === activeIndex;
              const scale = isActive ? 1.15 : 1;
              
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  strokeWidth={isActive ? 0 : 0}
                  stroke="transparent"
                  style={{
                    filter: isActive ? "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.2))" : "none",
                    transition: "all 0.3s ease-in-out",
                    transformOrigin: "center center",
                    transform: `scale(${scale})`,
                    zIndex: isActive ? 10 : 1,
                  }}
                />
              );
            })}
          </Pie>
          <Tooltip 
            content={<ExpenseTooltip />} 
            position={{ x: 0, y: 0 }}
            wrapperStyle={{ 
              zIndex: 9999, 
              position: 'fixed', 
              pointerEvents: 'auto',
              visibility: 'visible',
              top: 'auto',
              left: 'auto'
            }}
            allowEscapeViewBox={{ x: true, y: true }}
            offset={10}
            cursor={{ stroke: 'none', strokeWidth: 0 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
