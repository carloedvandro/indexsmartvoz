
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
    dailyValue: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Generate full year data if not provided
  const yearData = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ].map((month, index) => ({
    name: month,
    value: data[index]?.value || Math.floor(Math.random() * 1000),
    dailyValue: data[index]?.dailyValue || Math.floor(Math.random() * 500)
  }));

  return (
    <>
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold text-center">
          Faturamento Acumulado do Mês
        </CardTitle>
      </CardHeader>
      <div className="h-[280px]">
        <ChartContainer config={{}} className="h-full">
          <AreaChart
            data={yearData}
            margin={{
              top: 20,
              right: 40,
              left: 0,
              bottom: 40, // Increased bottom margin
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={0.5}
              dy={25} // Increased dy to move labels lower
              tick={{ fill: '#888888' }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={true}
              strokeWidth={0.5}
              tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              width={120}
              tick={{ fill: '#888888' }}
            />
            <ChartTooltip 
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  label={label}
                  hideIndicator={true}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, "Total Acumulado"]}
                  labelFormatter={(label) => `Mês ${label}`}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
              name="value"
              dot={{ stroke: '#4F46E5', strokeWidth: 1, fill: '#ffffff', r: 2 }}
              activeDot={{ stroke: '#4F46E5', strokeWidth: 2, fill: '#ffffff', r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </>
  );
};
