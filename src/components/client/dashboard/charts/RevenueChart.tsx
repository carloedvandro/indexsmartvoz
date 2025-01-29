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
    <div className="space-y-8">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento</CardTitle>
      </CardHeader>
      <div className="h-[280px] -mx-0">
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
              width={80}
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