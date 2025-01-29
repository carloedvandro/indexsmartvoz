import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { ExpenseData } from "./types";

interface ExpenseBarChartProps {
  data: ExpenseData[];
}

export const ExpenseBarChart = ({ data }: ExpenseBarChartProps) => (
  <div className="h-[200px] mt-12 w-full min-w-[300px] sm:min-w-[400px] md:min-w-[500px] bg-[#1a1a1a] rounded-xl p-6">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: 2, bottom: 5 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bf00ff" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8000ff" stopOpacity={0.6} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <XAxis 
          dataKey="category" 
          tick={{ fontSize: 12, fill: "#ffffff" }}
          stroke="#ffffff"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#ffffff" }}
          stroke="#ffffff"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            background: "#2a2a2a",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(191, 0, 255, 0.2)",
            color: "#ffffff"
          }}
          formatter={(value: number) => [`${value}%`, "Percentual"]}
          labelStyle={{ color: "#ffffff" }}
        />
        <Bar
          dataKey="percentage"
          fill="url(#barGradient)"
          radius={[4, 4, 0, 0]}
          barSize={30}
          style={{ filter: "url(#glow)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);