import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { CustomBar } from "./components/CustomBar";
import { monthlyData, chartColors } from "./data/chartData";
import { ChartHeader } from "./components/ChartHeader";

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full flex flex-col items-center max-w-[1800px] mx-auto">
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={monthlyData}
            margin={{
              top: 40,
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
              width={90}
              tick={{ dx: -15 }}
              ticks={[0, 20000, 40000, 60000, 80000, 100000, 120000]}
              domain={[0, 120000]}
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
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40} shape={(props) => <CustomBar {...props} />}>
              {monthlyData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index]}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="trend"
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