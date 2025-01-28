import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-4">
      <CardTitle>Faturamento</CardTitle>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6E59A5" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#6E59A5" stopOpacity={0} />
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
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6E59A5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};