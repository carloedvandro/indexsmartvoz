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
  { month: "SET", fullMonth: "SETEMBRO", value: 65000 },
  { month: "OUT", fullMonth: "OUTUBRO", value: 72000 },
  { month: "NOV", fullMonth: "NOVEMBRO", value: 85000 },
  { month: "DEZ", fullMonth: "DEZEMBRO", value: 112000 },
];

const colors = [
  "#3b82f6", // blue
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#7c3aed", // violet
];

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full space-y-4 p-6 flex flex-col items-center">
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-2xl font-bold">Faturamento Mensal</CardTitle>
      </CardHeader>
      <div className="h-[280px] w-full max-w-[1600px]">
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
              labelFormatter={(_, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullMonth;
                }
                return "";
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={35}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="value"
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