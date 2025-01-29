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
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="space-y-8 rounded-lg p-6 mx-[-12mm]">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento</CardTitle>
      </CardHeader>
      <div className="h-[280px] -mx-2">
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
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value}`}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`R$ ${value}`, "Valor"]}
              labelFormatter={(label) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5f0889"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};