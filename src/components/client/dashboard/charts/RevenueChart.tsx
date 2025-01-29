import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="space-y-8 rounded-lg p-6 mx-[-9mm]">
      <CardHeader className="pt-6">
        <CardTitle className="text-2xl font-bold">Faturamento</CardTitle>
      </CardHeader>
      <div className="h-[280px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -9,
              bottom: 0,
            }}
          >
            <defs>
              {/* Gradient 1 - Original Purple */}
              <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5f0889" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#5f0889" stopOpacity={0.1} />
              </linearGradient>
              
              {/* Gradient 2 - Rainbow */}
              <linearGradient id="colorGradient2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#4ecdc4" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#45b7d1" stopOpacity={0.6} />
              </linearGradient>
              
              {/* Gradient 3 - Neon */}
              <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff87" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#60efff" stopOpacity={0.2} />
              </linearGradient>
              
              {/* Gradient 4 - Sunset */}
              <linearGradient id="colorGradient4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff9a9e" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#fad0c4" stopOpacity={0.1} />
              </linearGradient>
              
              {/* Gradient 5 - Deep Ocean */}
              <linearGradient id="colorGradient5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4facfe" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity={0.1} />
              </linearGradient>

              {/* Pattern for dashed line */}
              <pattern id="pattern1" patternUnits="userSpaceOnUse" width="6" height="6">
                <path d="M 0 3 l 6 0" stroke="#5f0889" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value}`}
              width={70}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`R$ ${value}`, "Valor"]}
              labelFormatter={(label) => `${label}`}
            />
            {/* Line Style 1 - Original Purple with Solid Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5f0889"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient1)"
              style={{ display: "none" }}
            />
            {/* Line Style 2 - Rainbow Gradient with Thicker Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient2)"
              strokeWidth={3}
              fillOpacity={0.8}
              fill="url(#colorGradient2)"
              style={{ display: "none" }}
            />
            {/* Line Style 3 - Neon with Dotted Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00ff87"
              strokeWidth={2}
              strokeDasharray="3 3"
              fillOpacity={0.7}
              fill="url(#colorGradient3)"
              style={{ display: "none" }}
            />
            {/* Line Style 4 - Sunset with Curved Line */}
            <Area
              type="natural"
              dataKey="value"
              stroke="#ff9a9e"
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#colorGradient4)"
              style={{ display: "none" }}
            />
            {/* Line Style 5 - Deep Ocean with Double Line */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4facfe"
              strokeWidth={4}
              fillOpacity={0.5}
              fill="url(#colorGradient5)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};