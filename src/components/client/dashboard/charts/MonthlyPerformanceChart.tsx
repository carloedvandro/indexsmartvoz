import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";

const monthlyData = [
  { month: "JAN", percentage: 10 },
  { month: "FEB", percentage: 20 },
  { month: "MAR", percentage: 15 },
  { month: "APR", percentage: 25 },
  { month: "MAY", percentage: 30 },
  { month: "JUN", percentage: 50 },
  { month: "JUL", percentage: 60 },
  { month: "AUG", percentage: 70 },
  { month: "SEP", percentage: 65 },
  { month: "OCT", percentage: 80 },
  { month: "NOV", percentage: 90 },
  { month: "DEC", percentage: 100 },
];

const getGradientColor = (percentage: number) => {
  const colors = [
    { threshold: 20, color: "#9C27B0" },    // Purple for lower values
    { threshold: 40, color: "#2196F3" },    // Blue
    { threshold: 60, color: "#4CAF50" },    // Green
    { threshold: 80, color: "#FFC107" },    // Yellow
    { threshold: 100, color: "#FF5722" },   // Orange/Red for higher values
  ];

  for (const { threshold, color } of colors) {
    if (percentage <= threshold) return color;
  }
  return colors[colors.length - 1].color;
};

export const MonthlyPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              {monthlyData.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`gradient-${entry.month}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={getGradientColor(entry.percentage)}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={getGradientColor(entry.percentage)}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              style={{
                fontWeight: 'bold'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontWeight: 'bold'
              }}
              formatter={(value: number) => [`${value}%`, 'Performance']}
              labelFormatter={(label) => `${label}`}
              cursor={{ stroke: getGradientColor(50), strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke={(data: any) => getGradientColor(data.percentage)}
              fill={(data: any) => `url(#gradient-${data.month})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};