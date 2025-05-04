
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/utils/format";
import { PieDataItem } from "../types/salesTypes";

interface SalesPieChartProps {
  pieData: PieDataItem[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  totalSalesAmount: number;
}

export const SalesPieChart = ({ 
  pieData, 
  activeIndex, 
  setActiveIndex,
  totalSalesAmount
}: SalesPieChartProps) => {
  
  const formattedTotalSales = formatCurrency(totalSalesAmount);
  
  // Custom tooltip component for when hovering over pie slices
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as PieDataItem;
      return (
        <div 
          className="bg-white p-3 rounded-md shadow-lg border border-gray-200"
          style={{ zIndex: 50 }}
        >
          <p className="font-medium">{data.fullName}</p>
          <p>{data.salesCount} vendas = {formatCurrency(data.totalAmount)}</p>
          <p>{data.percentage}% do total</p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onClick = (_: any, index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            onClick={onClick}
            strokeWidth={3}
            stroke="#ffffff"
          >
            {pieData.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter: isActive ? 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2))' : 'none',
                    opacity: activeIndex === null || isActive ? 1 : 0.7,
                    strokeWidth: isActive ? 4 : 2,
                    transition: 'filter 0.3s ease-out, opacity 0.3s ease-out, stroke-width 0.3s ease-out',
                    cursor: 'pointer'
                  }}
                />
              );
            })}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />} 
            wrapperStyle={{ zIndex: 50, position: 'relative' }} 
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center -mt-[80px]">
        <p className="text-sm text-gray-500">Vendas Totais</p>
        <p className="text-xl font-bold">{formattedTotalSales}</p>
      </div>
    </div>
  );
};
