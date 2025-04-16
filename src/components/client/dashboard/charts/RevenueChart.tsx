import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <>
      <CardHeader className="p-0">
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
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
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
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, "Total Acumulado"]}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
              name="value"
              dot={{ stroke: '#4F46E5', strokeWidth: 1, fill: '#ffffff', r: 2 }}
              activeDot={{ stroke: '#4F46E5', strokeWidth: 2, fill: '#ffffff', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
