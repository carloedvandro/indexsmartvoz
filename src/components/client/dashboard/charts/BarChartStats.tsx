import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface BarChartStatsProps {
  data: Array<{ 
    name: string; 
    value: number;
    previousValue: number;
  }>;
}

export const BarChartStats = ({ data }: BarChartStatsProps) => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barGap={8}
          barSize={32}
        >
          <defs>
            {/* Gradient 1: Purple to Pink */}
            <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#D946EF" stopOpacity={0.7} />
            </linearGradient>
            {/* Gradient 2: Orange to Yellow */}
            <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#FFA500" stopOpacity={0.7} />
            </linearGradient>
            {/* Gradient 3: Green to Blue */}
            <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffa3" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0.7} />
            </linearGradient>
            {/* Gradient 4: Pink to Purple */}
            <linearGradient id="colorGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D946EF" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#9b87f5" stopOpacity={0.7} />
            </linearGradient>
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
            domain={[0, 'auto']}
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
            fill="url(#colorGradient1)"
            style={{
              filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (e.target) {
                e.target.style.opacity = '0.8';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (e.target) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {data.map((entry, index) => (
              <Bar
                key={`bar-${index}`}
                fill={`url(#colorGradient${(index % 4) + 1})`}
                radius={[6, 6, 0, 0]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};