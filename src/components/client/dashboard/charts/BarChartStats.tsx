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
    <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#33C3F0" stopOpacity={1} />
              <stop offset="50%" stopColor="#6366F1" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#A855F7" stopOpacity={0.9} />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#f0f0f0"
            opacity={0.5}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
              backdropFilter: 'blur(8px)'
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)"
            radius={[20, 20, 0, 0]}
            barSize={8}
            className="transition-all duration-300 hover:opacity-80"
            filter="url(#shadow)"
          />
          <Bar 
            dataKey="previousValue" 
            fill="url(#colorGradient)"
            radius={[20, 20, 0, 0]}
            barSize={8}
            opacity={0.3}
            className="transition-all duration-300 hover:opacity-50"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};