import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Dot,
} from "recharts";
import { useEffect, useState } from "react";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const CustomDot = (props: any) => {
  const { cx, cy, payload, index } = props;
  const dotStyles = [
    { // Glowing purple dot
      className: "animate-pulse",
      r: 4,
      fill: "#6E59A5",
      filter: "url(#glow)",
    },
    { // Diamond shape
      className: "animate-bounce",
      points: `${cx-4},${cy} ${cx},${cy-4} ${cx+4},${cy} ${cx},${cy+4}`,
      fill: "#6E59A5",
    },
    { // Pulsing circle
      className: "animate-ping",
      r: 3,
      fill: "#6E59A5",
      opacity: 0.7,
    },
    { // Star shape
      className: "animate-spin",
      d: `M ${cx} ${cy-4} L ${cx+1} ${cy-1} L ${cx+4} ${cy-1} L ${cx+2} ${cy+1} L ${cx+3} ${cy+4} L ${cx} ${cy+2} L ${cx-3} ${cy+4} L ${cx-2} ${cy+1} L ${cx-4} ${cy-1} L ${cx-1} ${cy-1} Z`,
      fill: "#6E59A5",
    },
    { // Ripple effect
      className: "animate-gradient",
      r: 4,
      fill: "url(#rippleGradient)",
    },
  ];

  const style = dotStyles[index % 5];

  return style.points ? (
    <polygon {...style} />
  ) : style.d ? (
    <path {...style} />
  ) : (
    <circle cx={cx} cy={cy} {...style} />
  );
};

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(false);
      setTimeout(() => setAnimationActive(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#6E59A5" stopOpacity={1} />
                <stop offset="70%" stopColor="#6E59A5" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#6E59A5" stopOpacity={0} />
              </radialGradient>
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
              animationDuration={2000}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#6E59A5", filter: "url(#glow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};