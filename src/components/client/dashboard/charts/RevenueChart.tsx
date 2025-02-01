import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <>
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold text-center">
          Faturamento Acumulado do Mês
        </CardTitle>
      </CardHeader>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={1}
              dy={10}
            />
            <YAxis
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={1}
              tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
              formatter={(value: number, name: string) => {
                if (name === "value") {
                  return [`R$ ${value.toLocaleString('pt-BR')}`, "Total Acumulado"];
                }
                return [`R$ ${value.toLocaleString('pt-BR')}`, "Valor do Dia"];
              }}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#9b87f5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
              name="value"
              dot={{ stroke: '#9b87f5', strokeWidth: 2, fill: '#ffffff', r: 3 }}
              activeDot={{ stroke: '#9b87f5', strokeWidth: 2, fill: '#ffffff', r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="dailyValue"
              stroke="#00d71c"
              strokeWidth={2}
              fillOpacity={0.2}
              fill="#00d71c"
              name="dailyValue"
              dot={{ stroke: '#00d71c', strokeWidth: 2, fill: '#ffffff', r: 3 }}
              activeDot={{ stroke: '#00d71c', strokeWidth: 2, fill: '#ffffff', r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};