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
  Cell,
  defs,
  linearGradient,
  stop,
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
  "#4ade80",
  "#4ade80",
  "#d946ef",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#ef4444",
  "#eab308",
  "#3b82f6",
  "#3b82f6",
  "#6366f1",
  "#7c3aed",
];

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full space-y-4 rounded-lg p-6 mx-[-9mm]">
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-2xl font-bold">Performance Mensal</CardTitle>
      </CardHeader>
      <div className="h-[280px] w-full bg-white rounded-lg p-4 border border-gray-200">
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
            <defs>
              {colors.map((color, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.2} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="month"
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                color: "#1f2937",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Valor"]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index})`}
                  filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#1f2937"
              strokeWidth={2}
              dot={{ fill: "#1f2937", r: 4 }}
              activeDot={{ r: 6, fill: "#1f2937" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};