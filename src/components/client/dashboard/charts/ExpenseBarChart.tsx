import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { ExpenseData } from "./types";

const data = [
  { month: 'Jan', atual: 75, receita: 65 },
  { month: 'Fev', atual: 70, receita: 72 },
  { month: 'Mar', atual: 75, receita: 68 },
  { month: 'Abr', atual: 65, receita: 75 },
  { month: 'Mai', atual: 80, receita: 62 },
  { month: 'Jun', atual: 70, receita: 48 },
  { month: 'Jul', atual: 55, receita: 70 },
  { month: 'Ago', atual: 72, receita: 75 },
  { month: 'Set', atual: 62, receita: 78 },
  { month: 'Out', atual: 68, receita: 62 },
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
          dataKey="atual"
          name="Atual"
          fill="#5f0889"
          radius={[4, 4, 0, 0]}
          barSize={8}
        />
        <Bar
          dataKey="receita"
          name="Receita"
          fill="#00ffba"
          radius={[4, 4, 0, 0]}
          barSize={8}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);