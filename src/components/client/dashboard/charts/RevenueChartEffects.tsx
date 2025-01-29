import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
  }[];
  effect: "wave" | "float" | "flip" | "tilt" | "pulse";
}

export const RevenueChartEffects = ({ data, effect }: RevenueChartProps) => {
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(false);
      setTimeout(() => setAnimationActive(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getEffectStyles = () => {
    switch (effect) {
      case "wave":
        return {
          animate: {
            y: [0, -10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case "float":
        return {
          animate: {
            scale: [1, 1.02, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case "flip":
        return {
          animate: {
            rotateX: [0, 360],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case "tilt":
        return {
          animate: {
            rotateY: [-5, 5, -5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case "pulse":
        return {
          animate: {
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return {};
    }
  };

  return (
    <div className="space-y-8 transform-gpu perspective-1000 w-full max-w-[1600px] mx-auto">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento - Efeito {effect}</CardTitle>
      </CardHeader>
      <motion.div 
        className="h-[280px] -mx-4 relative transform-gpu"
        style={{
          transformStyle: "preserve-3d",
        }}
        {...getEffectStyles()}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
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
              animationDuration={2000}
              style={{ filter: "url(#shadow)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};