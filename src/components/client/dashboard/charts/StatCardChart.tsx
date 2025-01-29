import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface StatCardChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  color: string;
}

export const StatCardChart = ({ data, color }: StatCardChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data}
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
        }}
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="100%" stopColor={color} stopOpacity={0.2}/>
          </linearGradient>
          
          {/* Enhanced glow filter */}
          <filter id="glow" height="300%" width="300%" x="-100%" y="-100%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feFlood floodColor={color} floodOpacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          stroke="#000000"
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          stroke="#000000"
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ 
            fill: "#fff", 
            stroke: color,
            strokeWidth: 2,
            r: 4,
            className: "transition-all duration-300 hover:scale-150 cursor-pointer",
            filter: "url(#glow)",
            style: {
              filter: `drop-shadow(0 0 4px ${color})`
            }
          }}
          activeDot={{ 
            r: 6, 
            fill: "#fff",
            stroke: color,
            strokeWidth: 3,
            className: "animate-[pulse_1.5s_ease-in-out_infinite]",
            style: {
              filter: `drop-shadow(0 0 8px ${color})`,
              transformOrigin: "center",
              transform: "scale(1.2)",
            }
          }}
          fill={`url(#gradient-${color})`}
          animationDuration={2000}
          animationBegin={600}
          className="transition-all duration-500 hover:opacity-90"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};