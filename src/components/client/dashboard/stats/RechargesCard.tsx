
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export function RechargesCard() {
  // Complete year of sample data with updated March value
  const chartData = [
    { name: "Jan", value: 13500 },
    { name: "Fev", value: 13200 },
    { name: "Mar", value: 12900 },
    { name: "Abr", value: 12700 },
    { name: "Mai", value: 12500 },
    { name: "Jun", value: 12200 },
    { name: "Jul", value: 11900 },
    { name: "Ago", value: 11600 },
    { name: "Set", value: 11300 },
    { name: "Out", value: 11000 },
    { name: "Nov", value: 10700 },
    { name: "Dez", value: 10400 }
  ];
  
  return (
    <Card className="p-6 shadow-sm h-full w-full">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-bold">Total Recargas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-700 font-medium">12982 ICCID's</p>
      
      <div className="mt-3 h-32">
        <ChartContainer config={{}} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rechargeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                dy={10}
                interval={0}
                padding={{ left: 10, right: 10 }}
                tickCount={12}
                tickFormatter={(tick) => tick}
              />
              <YAxis 
                hide={true}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    hideIndicator={true}
                    formatter={(value) => [`R$${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Recargas`, null]}
                    labelFormatter={(name) => `${name}`}
                  />
                )}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4ADE80"
                strokeWidth={2}
                fill="url(#rechargeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
}
