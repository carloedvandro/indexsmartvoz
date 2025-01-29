import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

// Definindo nossa própria interface para o timing da animação
interface CustomAnimationTiming {
  duration: number;
  easing: string;
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [animationActive, setAnimationActive] = useState(true);

  // Efeito para reativar a animação periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(false);
      setTimeout(() => setAnimationActive(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const customAnimationTiming: CustomAnimationTiming = {
    duration: 2000,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div className="space-y-8 transform-gpu perspective-1000">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento</CardTitle>
      </CardHeader>
      <div 
        className="h-[280px] -mx-2 relative transform-gpu hover:scale-[1.02] transition-transform duration-300"
        style={{
          transform: "rotateX(5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6E59A5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6E59A5" stopOpacity={0.2} />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
              </filter>
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
              stroke="#6E59A5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#gradient)"
              isAnimationActive={animationActive}
              animationDuration={customAnimationTiming.duration}
              animationEasing={customAnimationTiming.easing}
              style={{ filter: "url(#shadow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};