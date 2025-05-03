
import React from "react";
import { ResponsiveContainer, PieChart } from "recharts";
import { PieDataItem } from "../types/salesTypes";
import { PieChartGradients } from "./pie-chart/PieChartGradients";
import { MainPieChart } from "./pie-chart/MainPieChart";
import { ReflectionOverlay } from "./pie-chart/ReflectionOverlay";
import { PieChartLabel } from "./pie-chart/PieChartLabel";

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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart style={{ background: 'transparent' }}>
        {/* Gradients for the pie slices */}
        <PieChartGradients pieData={pieData} />
        
        {/* Main pie chart with interactive slices */}
        <MainPieChart 
          pieData={pieData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        
        {/* Reflection overlay for glossy effect */}
        <ReflectionOverlay pieData={pieData} />
        
        {/* Center label showing total sales amount */}
        <PieChartLabel totalSalesAmount={totalSalesAmount} />
      </PieChart>
    </ResponsiveContainer>
  );
};
