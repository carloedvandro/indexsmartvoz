import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { monthlyData, chartColors } from "./data/chartData";
import { formatCurrency } from "@/utils/format";

export const MonthlyPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              {chartColors.map((color, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => formatCurrency(value)}
              style={{
                fontWeight: 'bold'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontWeight: 'bold'
              }}
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'vendas' ? 'Vendas' :
                name === 'comissoes' ? 'Comissões' :
                'Projeção'
              ]}
              labelFormatter={(label) => label}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="vendas"
              stroke={chartColors[0]}
              fill={`url(#gradient-0)`}
              strokeWidth={2}
              name="Vendas"
            />
            <Area
              type="monotone"
              dataKey="comissoes"
              stroke={chartColors[1]}
              fill={`url(#gradient-1)`}
              strokeWidth={2}
              name="Comissões"
            />
            <Area
              type="monotone"
              dataKey="projecao"
              stroke={chartColors[2]}
              fill={`url(#gradient-2)`}
              strokeWidth={2}
              name="Projeção"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};