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
  "#6366f1", // indigo
  "#d946ef", // purple
  "#ec4899", // pink
  "#f43f5e", // rose
  "#ef4444", // red
  "#eab308", // yellow
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#7c3aed", // violet
];

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full space-y-4 p-6 flex flex-col items-center">
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-2xl font-bold">Faturamento Mensal</CardTitle>
      </CardHeader>
      <div className="h-[280px] w-full max-w-[1700px]">
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
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <style type="text/css">
                {`
                  @keyframes pulse {
                    0% { r: 4; opacity: 1; }
                    50% { r: 6; opacity: 0.5; }
                    100% { r: 4; opacity: 1; }
                  }
                  .dot-pulse {
                    animation: pulse 1.5s ease-in-out infinite;
                  }
                `}
              </style>
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
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  style={{
                    filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#1f2937"
              strokeWidth={2}
              dot={{ 
                r: 4,
                fill: "#fff",
                stroke: "#1f2937",
                strokeWidth: 2,
                className: "dot-pulse",
                filter: "url(#glow)"
              }}
              activeDot={{ 
                r: 6,
                fill: "#fff",
                stroke: "#1f2937",
                strokeWidth: 2,
                className: "dot-pulse",
                filter: "url(#glow)"
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};