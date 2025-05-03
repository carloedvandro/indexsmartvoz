
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { CircularProgress } from "../charts/CircularProgress";
import { useChartData } from "@/hooks/useChartData";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const { salesData } = useChartData();
  
  // Calculate percentage of target reached
  const percentageReached = Math.min(Math.round((salesData.actualSales / salesData.targetSales) * 100), 100);
  
  // Determine gauge color based on percentage
  const getGaugeColor = (percentage: number) => {
    if (percentage < 30) return "#FF5252"; // Red for low performance
    if (percentage < 70) return "#FFC107"; // Yellow for medium performance
    return "#4CAF50"; // Green for good performance
  };
  
  const gaugeColor = getGaugeColor(percentageReached);

  return (
    <div className="pl-0 h-[550px]">
      <div className="flex items-start mb-4 ml-[9px]">
        <h3 className="text-lg font-bold text-black pt-[4px]">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[420px] h-[300px] flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg w-full relative">
            <div className="text-white mb-2 flex justify-between items-center">
              <span className="text-sm">Project Cost Performance</span>
              <span className="text-sm">Actual Cost</span>
            </div>
            
            <div className="flex justify-center items-center flex-col mb-4">
              <CircularProgress
                percentage={percentageReached}
                size={180}
                strokeWidth={12}
                circleOneStroke="#3e4047"
                circleTwoStroke={gaugeColor}
              >
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Vendas do Mês</p>
                  <p className="text-white text-xl font-bold">
                    {formatCurrency(salesData.actualSales)}
                  </p>
                </div>
              </CircularProgress>
              
              <div className="mt-6 w-full">
                <div className="flex justify-between text-white">
                  <div>
                    <p className="text-xl font-bold">{formatCurrency(salesData.targetSales)}</p>
                    <p className="text-xs text-gray-400">Total budget</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{formatCurrency(salesData.actualSales)}</p>
                    <p className="text-xs text-gray-400">Actual Cost</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gauge markings */}
            <div className="absolute top-[168px] left-0 right-0 flex justify-between px-12 text-xs text-gray-500">
              <span>0k</span>
              <span>20k</span>
              <span>40k</span>
              <span>60k</span>
              <span>80k</span>
              <span>100k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
