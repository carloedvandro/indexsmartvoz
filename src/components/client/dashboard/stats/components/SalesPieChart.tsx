
import React from "react";
import { ResponsiveContainer, PieChart } from "recharts";
import { PieDataItem } from "../types/salesTypes";
import { PieChartGradients } from "./PieChartGradients";
import { MainPieChart } from "./MainPieChart";
import { ReflectionPie } from "./ReflectionPie";
import { ChartCenterText } from "./ChartCenterText";
import { PieChartLabel } from "./PieChartLabel";

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
  // Custom label renderer to be passed to the Pie component
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
    
    return (
      <PieChartLabel 
        cx={cx}
        cy={cy}
        midAngle={midAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        index={index}
        pieData={pieData}
        activeIndex={activeIndex}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart 
        style={{ 
          background: 'transparent',
          border: '1px solid transparent'
        }}
      >
        <PieChartGradients pieData={pieData} />
        
        <MainPieChart 
          pieData={pieData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          renderCustomizedLabel={renderCustomizedLabel}
        />
        
        <ReflectionPie pieData={pieData} />
        
        <ChartCenterText 
          title="Vendas do Mês"
          amount={totalSalesAmount}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
