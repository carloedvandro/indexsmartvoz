import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomBar } from "./components/CustomBar";
import { monthlyData } from "./data/chartData";
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
              top: 45,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#000000">
                  <animate
                    attributeName="offset"
                    values="0;1;0"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="20%" stopColor="#ff0000">
                  <animate
                    attributeName="offset"
                    values="0.2;1.2;0.2"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="40%" stopColor="#0610ff">
                  <animate
                    attributeName="offset"
                    values="0.4;1.4;0.4"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="60%" stopColor="#5f0889">
                  <animate
                    attributeName="offset"
                    values="0.6;1.6;0.6"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="80%" stopColor="#ff01de">
                  <animate
                    attributeName="offset"
                    values="0.8;1.8;0.8"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#01ff57">
                  <animate
                    attributeName="offset"
                    values="1;2;1"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
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
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]} 
              barSize={40} 
              shape={(props) => <CustomBar {...props} fill="url(#colorGradient)" />}
            />
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