
import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
  { name: "Jan", value: 150000 },
  { name: "Fev", value: 165000 },
  { name: "Mar", value: 158000 },
  { name: "Abr", value: 172000 },
  { name: "Mai", value: 168000 },
  { name: "Jun", value: 179542 },
  { name: "Jul", value: 185000 },
  { name: "Ago", value: 190000 },
  { name: "Set", value: 188000 },
  { name: "Out", value: 195000 },
  { name: "Nov", value: 205000 },
  { name: "Dez", value: 215000 }
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

export function IncomeCard() {
  return (
    <div className="mt-5">
      <h3 className="text-lg font-bold">Histórico de Rendimentos</h3>
      <ChartContainer config={{}} className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#94a3b8', 
                fontSize: 10,
                dy: 10,
                fontFamily: 'Arial'
              }}
              interval={0}
              padding={{ left: 10, right: 10 }}
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
                  formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '']}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#818CF8"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              dot={{
                r: 4,
                stroke: '#818CF8',
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
