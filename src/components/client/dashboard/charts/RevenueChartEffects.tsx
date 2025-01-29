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
import { motion } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(false);
      setTimeout(() => setAnimationActive(true), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHoverEffect = () => {
    switch (effect) {
      case "wave":
        return {
          whileHover: {
            rotateX: [0, 15, 0],
            rotateY: [-5, 5, -5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case "float":
        return {
          whileHover: {
            scale: 1.02,
            rotateX: 10,
            y: -10,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }
        };
      case "flip":
        return {
          whileHover: {
            rotateY: 180,
            transition: {
              duration: 0.6,
              ease: "easeInOut"
            }
          }
        };
      case "tilt":
        return {
          whileHover: {
            rotateX: 20,
            rotateY: isHovered ? 10 : -10,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }
        };
      case "pulse":
        return {
          whileHover: {
            scale: [1, 1.02, 1],
            rotateX: 15,
            transition: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return {};
    }
  };

  const getLineStyle = () => {
    return {
      stroke: "#6E59A5",
      strokeWidth: 3,
      filter: "url(#glow)",
    };
  };

  return (
    <div className="space-y-8 transform-gpu perspective-1000 w-full max-w-[1600px] mx-auto">
      <CardHeader className="p-0 pl-4">
        <CardTitle>Faturamento - Efeito {effect}</CardTitle>
      </CardHeader>
      <motion.div 
        className="h-[280px] -mx-4 relative transform-gpu bg-white rounded-lg shadow-lg p-4"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...getHoverEffect()}
      >
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
              {...getLineStyle()}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};