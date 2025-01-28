import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface BarChartStatsProps {
  data: Array<{ 
    name: string; 
    value: number;
    previousValue: number;
  }>;
}

export const BarChartStats = ({ data }: BarChartStatsProps) => {
  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barSize={40}
        >
          <defs>
            {data.map((_, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.9} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(238, 238, 238, 0.3)"
          />
          <XAxis 
            dataKey="name" 
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
            tick={{ fill: '#666', fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
              padding: '12px'
            }}
            cursor={false}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                  transform: 'perspective(1000px) rotateX(10deg)',
                  transformOrigin: 'bottom',
                  transition: 'all 0.3s ease'
                }}
                className="hover:brightness-110"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};