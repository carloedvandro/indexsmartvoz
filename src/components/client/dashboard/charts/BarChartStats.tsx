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
    <div className="relative w-full h-full bg-gradient-to-b from-white to-gray-50 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
          barSize={50}
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
                <stop offset="0%" stopColor="#2196F3" stopOpacity={1} />
                <stop offset="100%" stopColor="#1976D2" stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(0, 0, 0, 0.1)"
          />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              padding: '12px'
            }}
            cursor={false}
            formatter={(value: number) => [`${value}%`, 'Valor']}
          />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                  transform: 'perspective(1000px) rotateX(10deg)',
                  transformOrigin: 'bottom',
                  cursor: 'pointer'
                }}
              >
                <text
                  x={0}
                  y={-10}
                  fill="#2196F3"
                  textAnchor="middle"
                  className="text-sm font-bold"
                >
                  {`${entry.value}%`}
                </text>
              </Cell>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};