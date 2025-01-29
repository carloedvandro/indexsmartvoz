import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { ExpenseData } from "./types";

const data = [
  { month: 'Jan', actual: 75, revenue: 65 },
  { month: 'Feb', actual: 70, revenue: 72 },
  { month: 'Mar', actual: 75, revenue: 68 },
  { month: 'Apr', actual: 65, revenue: 75 },
  { month: 'May', actual: 80, revenue: 62 },
  { month: 'Jun', actual: 70, revenue: 48 },
  { month: 'Jul', actual: 55, revenue: 70 },
  { month: 'Aug', actual: 72, revenue: 75 },
  { month: 'Sep', actual: 62, revenue: 78 },
  { month: 'Oct', actual: 68, revenue: 62 },
];

export const ExpenseBarChart = () => (
  <div className="h-[200px] mt-12 w-full min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 2, bottom: 5 }}>
        <XAxis 
          dataKey="month" 
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
        />
        <Tooltip
          contentStyle={{
            background: "#ffffff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend />
        <Bar
          dataKey="actual"
          fill="#5f0889"
          radius={[4, 4, 0, 0]}
          barSize={8}
        />
        <Bar
          dataKey="revenue"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          barSize={8}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);