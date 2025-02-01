import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/utils/format";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
  variant?: 'gradient' | 'neon' | 'minimal' | 'wave' | 'classic';
}

export const RevenueChart = ({ data, variant = 'gradient' }: RevenueChartProps) => {
  const renderChart = () => {
    switch (variant) {
      case 'gradient':
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#9b87f5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#1A1F2C"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#1A1F2C"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6E59A5"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        );

      case 'neon':
        return (
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
              dataKey="name"
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
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #D6BCFA",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", r: 4 }}
              filter="url(#glow)"
            />
          </LineChart>
        );

      case 'minimal':
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#8E9196"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8E9196"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7E69AB"
              strokeWidth={1.5}
              dot={{ fill: "#7E69AB", r: 3 }}
            />
          </LineChart>
        );

      case 'wave':
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D6BCFA" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#D6BCFA" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
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
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #E5DEFF",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
            />
            <Area
              type="natural"
              dataKey="value"
              stroke="#9b87f5"
              strokeWidth={2}
              fill="url(#waveGradient)"
            />
          </AreaChart>
        );

      case 'classic':
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis
              dataKey="name"
              stroke="#1A1F2C"
              fontSize={12}
              tickLine={true}
            />
            <YAxis
              stroke="#1A1F2C"
              fontSize={12}
              tickLine={true}
              tickFormatter={(value) => formatCurrency(value)}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6E59A5"
              strokeWidth={2}
              dot={{ fill: "#6E59A5", r: 4 }}
            />
          </LineChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold text-center">
          Faturamento Mensal
        </CardTitle>
      </CardHeader>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};