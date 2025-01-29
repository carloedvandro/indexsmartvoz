import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { ChartContainer } from "./components/ChartContainer";
import { monthlyData, chartColors, tooltipStyles } from "./data/monthlyData";

export const MonthlyPerformanceChart = () => {
  return (
    <ChartContainer>
      <ChartHeader />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={monthlyData}
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
            contentStyle={tooltipStyles}
            formatter={(value: number) => [`R$ ${value.toLocaleString()}`]}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={35}>
            {monthlyData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={chartColors.barColors[index % chartColors.barColors.length]} 
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};