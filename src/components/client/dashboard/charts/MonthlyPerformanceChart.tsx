import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from "recharts";
import { ChartHeader } from "./components/ChartHeader";
import { monthlyData } from "./data/chartData";

export const MonthlyPerformanceChart = () => {
  return (
    <>
      <ChartHeader title="Performance Mensal" />
      <div className="h-[320px] w-full mt-12">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#2d2d2d" 
              vertical={false} 
            />
            <XAxis
              dataKey="month"
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#404040' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <YAxis
              stroke="#ffffff"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#404040' }}
              style={{
                fontWeight: 'bold'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid #404040",
                borderRadius: "8px",
                color: "#ffffff",
                fontWeight: 'bold'
              }}
              cursor={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                color: "#ffffff",
                fontWeight: 'bold'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#colorValue)"
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Vendas"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", r: 4 }}
              filter="url(#glow)"
            />
            <Line
              type="monotone"
              dataKey="trend"
              name="Comissões"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: "#F97316", r: 4 }}
              filter="url(#glow)"
            />
            <Line
              type="monotone"
              dataKey="projected"
              name="Projeção"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={{ fill: "#0EA5E9", r: 4 }}
              filter="url(#glow)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};