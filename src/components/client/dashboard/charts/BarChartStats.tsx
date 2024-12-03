import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface BarChartStatsProps {
  data: Array<{ 
    name: string; 
    value: number;
    previousValue: number;
  }>;
  colors: string[];
}

export const BarChartStats = ({ data, colors }: BarChartStatsProps) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {colors.map((color, index) => (
              <linearGradient 
                key={`gradient-${index}`} 
                id={`gradient-${index}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.4} />
              </linearGradient>
            ))}
            <filter id="shadow">
              <feDropShadow 
                dx="2" 
                dy="2" 
                stdDeviation="3"
                floodColor="rgba(0,0,0,0.3)"
              />
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(238, 238, 238, 0.5)"
          />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: window.innerWidth < 768 ? 8 : 10 }}
            interval={window.innerWidth < 768 ? 2 : 0}
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis 
            tick={{ fontSize: window.innerWidth < 768 ? 8 : 10 }}
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={{ stroke: '#E0E0E0' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              padding: '10px'
            }}
            labelStyle={{ color: '#666', fontWeight: 'bold', marginBottom: '5px' }}
            itemStyle={{ color: '#333', padding: '2px 0' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[6, 6, 0, 0]}
            barSize={window.innerWidth < 768 ? 12 : 20}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <g 
                key={`cell-${index}`}
                filter="url(#shadow)"
              >
                <rect
                  x={0}
                  y={0}
                  width="100%"
                  height="100%"
                  fill={`url(#gradient-${index % colors.length})`}
                  className="transition-all duration-300 hover:opacity-90 hover:transform hover:translate-y-[-2px]"
                  style={{
                    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))'
                  }}
                />
              </g>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};