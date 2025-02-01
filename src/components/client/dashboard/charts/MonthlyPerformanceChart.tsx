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
  { month: "JAN", percentage: 10, color: "#D81B60" },
  { month: "FEB", percentage: 20, color: "#8E24AA" },
  { month: "MAR", percentage: 15, color: "#5E35B1" },
  { month: "APR", percentage: 25, color: "#3949AB" },
  { month: "MAY", percentage: 30, color: "#1E88E5" },
  { month: "JUN", percentage: 50, color: "#039BE5" },
  { month: "JUL", percentage: 60, color: "#00ACC1" },
  { month: "AUG", percentage: 70, color: "#00897B" },
  { month: "SEP", percentage: 65, color: "#43A047" },
  { month: "OCT", percentage: 80, color: "#FFB300" },
  { month: "NOV", percentage: 90, color: "#FB8C00" },
  { month: "DEC", percentage: 100, color: "#F4511E" },
];

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
                    stopColor={entry.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={entry.color}
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
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke={monthlyData[0].color}
              fill={`url(#gradient-${monthlyData[0].month})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};