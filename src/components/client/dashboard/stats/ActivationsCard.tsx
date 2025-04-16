
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from "recharts";
import { useChartData } from "@/hooks/useChartData";

export function ActivationsCard() {
  // Sample data for the line chart
  const months = ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"];
  
  const chartData = [
    { name: "Jan", value: 500 },
    { name: "Fev", value: 480 },
    { name: "Mar", value: 520 },
    { name: "Abr", value: 490 },
    { name: "Mai", value: 540 },
    { name: "Jun", value: 510 },
    { name: "Jul", value: 560 },
    { name: "Ago", value: 530 },
    { name: "Set", value: 580 },
    { name: "Out", value: 550 },
    { name: "Nov", value: 600 },
  ];
  
  return (
    <Card className="p-5 shadow-sm h-full w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Total Ativações</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-700 font-medium">582 ICCID's</p>
      
      <div className="mt-4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="activationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity={1} />
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
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px"
              }}
              formatter={(value) => [`valor : ${value.toLocaleString('pt-BR')}`, '']}
              labelFormatter={(name) => `${name}`}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4ADE80" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#4ADE80" }}
              fill="url(#activationGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
