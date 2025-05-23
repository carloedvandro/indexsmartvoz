
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export function ActivationsCard() {
  // Complete year of sample data with varying trend
  const chartData = [
    { name: "Jan", value: 500 },
    { name: "Fev", value: 580 },
    { name: "Mar", value: 540 },
    { name: "Abr", value: 620 },
    { name: "Mai", value: 590 },
    { name: "Jun", value: 650 },
    { name: "Jul", value: 630 },
    { name: "Ago", value: 680 },
    { name: "Set", value: 640 },
    { name: "Out", value: 720 },
    { name: "Nov", value: 690 },
    { name: "Dez", value: 750 }
  ];
  
  const fullMonthNames = {
    "Jan": "Janeiro",
    "Fev": "Fevereiro",
    "Mar": "Março",
    "Abr": "Abril",
    "Mai": "Maio",
    "Jun": "Junho",
    "Jul": "Julho",
    "Ago": "Agosto", 
    "Set": "Setembro",
    "Out": "Outubro",
    "Nov": "Novembro",
    "Dez": "Dezembro"
  };
  
  return (
    <div className="">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-bold">Total de ativações ativas</h3>
      </div>
      <p className="text-sm text-black font-medium">1.932 ICCID's</p>
      
      <div className="mt-3 h-24">
        <ChartContainer config={{}} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="activationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, dy: 10, fontFamily: 'Arial' }}
                padding={{ left: 10, right: 10 }}
                interval={0}
              />
              <YAxis 
                hide={true}
                domain={['auto', 'auto']}
              />
              <ChartTooltip 
                content={({ active, payload, label }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    label={label}
                    hideIndicator={true}
                    labelFormatter={(name) => fullMonthNames[name] || name}
                    formatter={(value) => [`${value.toLocaleString('pt-BR')} Ativações`, '']}
                  />
                )}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#activationGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
