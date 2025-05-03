
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { formatCurrency } from "@/utils/format";
import { CircularProgress } from "../charts/CircularProgress";
import { useChartData } from "@/hooks/useChartData";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function SalesDetailsCard() {
  const isMobile = useIsMobile();
  const { salesData } = useChartData();
  
  // Sales data for the pie chart
  const pieData = [
    { name: "Plano 50GB", value: 35, color: "#6E59A5" },
    { name: "Plano 100GB", value: 40, color: "#33C3F0" },
    { name: "Plano 200GB", value: 25, color: "#D6BCFA" }
  ];
  
  return (
    <Card className="p-6 shadow-sm h-[550px] w-full border-0 rounded-xl shadow-lg">
      <div className="flex items-start mb-4">
        <h3 className="text-lg font-bold text-black">Detalhe das Vendas</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[420px] h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, "Percentual"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 w-full">
          <div className="grid grid-cols-3 gap-4 mt-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full mb-2" style={{ backgroundColor: entry.color }}></div>
                <p className="text-sm text-gray-600 text-center">{entry.name}</p>
                <p className="text-lg font-bold text-center">{entry.value}%</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium text-gray-500">Total de Vendas</p>
                <p className="text-xl font-bold">{formatCurrency(salesData.actualSales)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-500">Meta Mensal</p>
                <p className="text-xl font-bold">{formatCurrency(salesData.targetSales)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
