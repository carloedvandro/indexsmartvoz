import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", atual: 4000, anterior: 2400, line1: 3200, line2: 2800 },
  { month: "Fev", atual: 3000, anterior: 1398, line1: 2900, line2: 2100 },
  { month: "Mar", atual: 2000, anterior: 9800, line1: 2300, line2: 2400 },
  { month: "Abr", atual: 2780, anterior: 3908, line1: 2600, line2: 2900 },
  { month: "Mai", atual: 1890, anterior: 4800, line1: 2100, line2: 2300 },
  { month: "Jun", atual: 2390, anterior: 3800, line1: 2800, line2: 2500 },
  { month: "Jul", atual: 3490, anterior: 4300, line1: 3100, line2: 2700 },
  { month: "Ago", atual: 2490, anterior: 4300, line1: 2700, line2: 3000 },
  { month: "Set", atual: 3490, anterior: 4300, line1: 3200, line2: 2800 },
  { month: "Out", atual: 2490, anterior: 4300, line1: 2900, line2: 3100 },
];

export const ExpenseBarChart = () => {
  return (
    <Card className="w-full p-4">
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar 
              dataKey="atual" 
              fill="#60A5FA" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
              name="Atual"
            />
            <Bar 
              dataKey="anterior" 
              fill="#818CF8" 
              radius={[4, 4, 0, 0]} 
              barSize={20}
              name="Anterior"
            />
            <Line
              type="monotone"
              dataKey="line1"
              stroke="#E879F9"
              strokeWidth={2}
              dot={false}
              name="Tendência 1"
            />
            <Line
              type="monotone"
              dataKey="line2"
              stroke="#38BDF8"
              strokeWidth={2}
              dot={false}
              name="Tendência 2"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};