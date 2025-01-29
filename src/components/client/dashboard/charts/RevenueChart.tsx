import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/utils/format";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="space-y-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
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
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5f0889" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#5f0889" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number, name: string) => {
                if (name === "value") {
                  return [formatCurrency(value), "Total Acumulado"];
                }
                return [formatCurrency(value), "Valor do Dia"];
              }}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5f0889"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
              name="value"
            />
            <Area
              type="monotone"
              dataKey="dailyValue"
              stroke="#00d71c"
              strokeWidth={2}
              fillOpacity={0.3}
              fill="#00d71c"
              name="dailyValue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};