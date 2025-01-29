import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import type { ExpenseData } from "./types";

interface ExpenseBarChartProps {
  data: ExpenseData[];
}

export const ExpenseBarChart = ({ data }: ExpenseBarChartProps) => (
  <div className="h-[200px] mt-8 w-full min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
        <XAxis 
          dataKey="category" 
          tick={{ fontSize: 12, fill: "#000000" }}
          stroke="#000000"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#000000" }}
          stroke="#000000"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            background: "#ffffff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [`${value}%`, "Percentual"]}
        />
        <Bar
          dataKey="percentage"
          fill="#5f0889"
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);