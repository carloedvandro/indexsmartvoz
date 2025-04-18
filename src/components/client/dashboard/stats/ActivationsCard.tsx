
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export function ActivationsCard() {
  // Complete year of sample data
  const chartData = [
    { name: "Jan", value: 500 },
    { name: "Mar", value: 480 },
    { name: "Mai", value: 520 },
    { name: "Jul", value: 490 },
    { name: "Set", value: 580 },
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
        <ChartContainer config={{}} className="h-full">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
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
              interval={0}
            />
            <ChartTooltip 
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  label={label}
                  hideIndicator={true}
                  formatter={(value) => [`${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Ativações']}
                  labelFormatter={(name) => `${name}`}
                />
              )}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4ADE80" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#4ADE80" }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
