
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { useChartData } from "@/hooks/useChartData";

export function RechargesCard() {
  const { barData } = useChartData();
  const totalRecharges = 0;
  
  const months = ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"];
  
  const chartData = months.map(month => {
    return {
      name: month,
      value: Math.floor(Math.random() * 40)
    };
  });
  
  return (
    <Card className="p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Total Recargas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-700 mb-2">{totalRecharges} ICCID</p>
      
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="rechargeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4ADE80" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              dy={10}
            />
            <Bar 
              dataKey="value" 
              fill="url(#rechargeGradient)" 
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
