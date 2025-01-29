import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

export const MonthlyPerformanceChart = () => {
  const data = [
    { name: "Jan", value: 45000 },
    { name: "Fev", value: 52000 },
    { name: "Mar", value: 48000 },
    { name: "Abr", value: 61000 },
    { name: "Mai", value: 55000 },
    { name: "Jun", value: 67000 },
    { name: "Jul", value: 52000 },
    { name: "Ago", value: 58000 },
    { name: "Set", value: 63000 },
    { name: "Out", value: 72000 },
    { name: "Nov", value: 68000 },
    { name: "Dez", value: 75000 },
  ];

  const colors = [
    "#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981",
    "#3B82F6", "#6366F1", "#8B5CF6", "#D946EF", "#F97316",
    "#06B6D4", "#14B8A6"
  ];

  return (
    <div className="w-full space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Performance Mensal</CardTitle>
      </CardHeader>
      <div className="h-[280px] w-full bg-white rounded-lg p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="name"
              scale="band"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value)}
              width={100}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Valor"]}
              labelFormatter={(label) => `Mês: ${label}`}
            />
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
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                </linearGradient>
              ))}
            </defs>
            <Bar
              dataKey="value"
              barSize={40}
              radius={[4, 4, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index})`}
                  filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};