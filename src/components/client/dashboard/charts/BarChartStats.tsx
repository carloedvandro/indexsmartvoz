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
    <div className="relative w-full h-full bg-white rounded-xl p-6 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 182, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 182, 255, 0.2)" />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(0, 0, 0, 0.05)"
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
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px'
            }}
            cursor={false}
            formatter={(value: number) => [`${value}`, '']}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)"
            radius={[20, 20, 0, 0]}
            barSize={30}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};