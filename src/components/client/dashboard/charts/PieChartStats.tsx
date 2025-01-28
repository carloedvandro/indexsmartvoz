import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  const COLORS = ['#00B6FF', '#6366f1', '#0EA5E9'];

  return (
    <div className="relative w-full h-full bg-white rounded-xl p-6 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient
                key={`pieGradient-${index}`}
                id={`pieGradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGradient-${index})`}
                stroke="none"
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`${value}%`, '']}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};