import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DailyRevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
}

export const DailyRevenueChart = ({ data }: DailyRevenueChartProps) => {
  return (
    <>
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold text-center">
          Faturamento Acumulado do Mês
        </CardTitle>
      </CardHeader>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 40,
              left: 0,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333EA" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={0.5}
              dy={10}
              tick={{ fill: '#888888' }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={0.5}
              tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              width={120}
              tick={{ fill: '#888888' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
              formatter={(value: number, name: string) => {
                if (name === "value") {
                  return [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, "Total Acumulado"];
                }
                return [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, "Valor do Dia"];
              }}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9333EA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#purpleGradient)"
              name="value"
              dot={{ stroke: '#9333EA', strokeWidth: 1, fill: '#ffffff', r: 2 }}
              activeDot={{ stroke: '#9333EA', strokeWidth: 2, fill: '#ffffff', r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="dailyValue"
              stroke="#22C55E"
              strokeWidth={1.5}
              fillOpacity={0.15}
              fill="url(#greenGradient)"
              name="dailyValue"
              dot={{ stroke: '#22C55E', strokeWidth: 1, fill: '#ffffff', r: 2 }}
              activeDot={{ stroke: '#22C55E', strokeWidth: 2, fill: '#ffffff', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
