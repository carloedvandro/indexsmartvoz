import {
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { formatCurrency } from "@/utils/format";
import { monthlyData } from "./data/chartData";

interface RevenueChartProps {
  data?: {
    month: string;
    value: number;
    trend: number;
    projected: number;
  }[];
}

export const RevenueChart = ({ data = monthlyData }: RevenueChartProps) => {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <XAxis
            dataKey="month"
            stroke="#1A1F2C"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#1A1F2C"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => formatCurrency(value)}
            width={100}
          />
          <Line
            type="monotone"
            dataKey="value"
            name=""
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ fill: "#8B5CF6", r: 4 }}
            filter="url(#glow)"
          />
          <Line
            type="monotone"
            dataKey="trend"
            name="Comissões"
            stroke="#F97316"
            strokeWidth={3}
            dot={{ fill: "#F97316", r: 4 }}
            filter="url(#glow)"
          />
          <Line
            type="monotone"
            dataKey="projected"
            name="Projeção"
            stroke="#0EA5E9"
            strokeWidth={3}
            dot={{ fill: "#0EA5E9", r: 4 }}
            filter="url(#glow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};