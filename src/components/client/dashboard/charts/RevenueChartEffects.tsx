import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart
} from "recharts";
import { useEffect, useState } from "react";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
  }[];
  effect: "wave" | "float" | "flip" | "tilt" | "pulse";
  lineStyle?: "default" | "dashed" | "gradient" | "double" | "glow";
}

export const RevenueChartEffects = ({ data, effect, lineStyle = "glow" }: RevenueChartProps) => {
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(false);
      setTimeout(() => setAnimationActive(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 w-full max-w-[1600px] mx-auto">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento</CardTitle>
      </CardHeader>
      <div className="h-[280px] -mx-4 relative rounded-lg shadow-lg p-4 backdrop-blur-sm bg-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 0,
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6E59A5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6E59A5" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              style={{ transform: "translateY(8px)" }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value}`}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(4px)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fillOpacity={0.3}
              fill="url(#gradient)"
              isAnimationActive={animationActive}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6E59A5"
              strokeWidth={3}
              filter="url(#glow)"
              isAnimationActive={animationActive}
              animationDuration={2000}
              dot={{ 
                fill: "#fff",
                stroke: "#6E59A5",
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 6,
                fill: "#fff",
                stroke: "#6E59A5",
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};