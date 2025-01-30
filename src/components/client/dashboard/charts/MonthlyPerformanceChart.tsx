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
              <linearGradient id="colorGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FF4500">
                  <animate
                    attributeName="offset"
                    values="0;0.3;0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="25%" stopColor="#FF6B00">
                  <animate
                    attributeName="offset"
                    values="0.25;0.55;0.25"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#FF8C00">
                  <animate
                    attributeName="offset"
                    values="0.5;0.8;0.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="75%" stopColor="#FFA500">
                  <animate
                    attributeName="offset"
                    values="0.75;1;0.75"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#FFD700">
                  <animate
                    attributeName="offset"
                    values="1;1.25;1"
                    dur="3s"
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
