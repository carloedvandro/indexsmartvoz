import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

const data = [
  { month: "JAN", value: 65000, trend: 45000 },
  { month: "FEV", value: 72000, trend: 52000 },
  { month: "MAR", value: 45000, trend: 48000 },
  { month: "ABR", value: 85000, trend: 55000 },
  { month: "MAI", value: 95000, trend: 65000 },
  { month: "JUN", value: 102000, trend: 75000 },
  { month: "JUL", value: 98000, trend: 82000 },
  { month: "AGO", value: 88000, trend: 80000 },
  { month: "SET", value: 72000, trend: 68000 },
  { month: "OUT", value: 85000, trend: 71000 },
  { month: "NOV", value: 95000, trend: 78000 },
  { month: "DEZ", value: 112000, trend: 85000 },
];

const colors = [
  "#4ade80", // green
  "#4ade80", // green
  "#d946ef", // purple
  "#d946ef", // purple
  "#ec4899", // pink
  "#f43f5e", // rose
  "#ef4444", // red
  "#eab308", // yellow
  "#3b82f6", // blue
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#7c3aed", // violet
];

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full space-y-4 rounded-lg p-6 mx-[-9mm]">
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-2xl font-bold">Performance Mensal</CardTitle>
      </CardHeader>
      <div className="h-[280px] w-full bg-gray-900 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="month"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                color: "#ffffff",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Valor"]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={35}
              fill={(entry, index) => colors[index % colors.length]}
            />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#ffffff"
              strokeWidth={2}
              dot={{ fill: "#ffffff", r: 4 }}
              activeDot={{ r: 6, fill: "#ffffff" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};