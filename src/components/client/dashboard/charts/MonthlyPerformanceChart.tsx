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
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000000">
                  <animate
                    attributeName="offset"
                    values="0;1;0"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="5%" stopColor="#8E9196">
                  <animate
                    attributeName="offset"
                    values="0.05;1.05;0.05"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="10%" stopColor="#9b87f5">
                  <animate
                    attributeName="offset"
                    values="0.1;1.1;0.1"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="15%" stopColor="#7E69AB">
                  <animate
                    attributeName="offset"
                    values="0.15;1.15;0.15"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="20%" stopColor="#6E59A5">
                  <animate
                    attributeName="offset"
                    values="0.2;1.2;0.2"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="25%" stopColor="#1A1F2C">
                  <animate
                    attributeName="offset"
                    values="0.25;1.25;0.25"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="30%" stopColor="#D6BCFA">
                  <animate
                    attributeName="offset"
                    values="0.3;1.3;0.3"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="35%" stopColor="#8B5CF6">
                  <animate
                    attributeName="offset"
                    values="0.35;1.35;0.35"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="40%" stopColor="#D946EF">
                  <animate
                    attributeName="offset"
                    values="0.4;1.4;0.4"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="45%" stopColor="#F97316">
                  <animate
                    attributeName="offset"
                    values="0.45;1.45;0.45"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#0EA5E9">
                  <animate
                    attributeName="offset"
                    values="0.5;1.5;0.5"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="55%" stopColor="#403E43">
                  <animate
                    attributeName="offset"
                    values="0.55;1.55;0.55"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="60%" stopColor="#1EAEDB">
                  <animate
                    attributeName="offset"
                    values="0.6;1.6;0.6"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="65%" stopColor="#221F26">
                  <animate
                    attributeName="offset"
                    values="0.65;1.65;0.65"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="70%" stopColor="#33C3F0">
                  <animate
                    attributeName="offset"
                    values="0.7;1.7;0.7"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="75%" stopColor="#ea384c">
                  <animate
                    attributeName="offset"
                    values="0.75;1.75;0.75"
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
                <stop offset="85%" stopColor="#01ff57">
                  <animate
                    attributeName="offset"
                    values="0.85;1.85;0.85"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="90%" stopColor="#0610ff">
                  <animate
                    attributeName="offset"
                    values="0.9;1.9;0.9"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="95%" stopColor="#5f0889">
                  <animate
                    attributeName="offset"
                    values="0.95;1.95;0.95"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#000000">
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