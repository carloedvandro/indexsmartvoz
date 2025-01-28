import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#8B5CF6'];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    value
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-bold"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`pieGradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius="80%"
            innerRadius="50%"
            paddingAngle={4}
            dataKey="value"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGradient-${index})`}
                stroke="none"
                style={{
                  filter: 'drop-shadow(4px 8px 12px rgba(0,0,0,0.2))',
                  transform: 'translateZ(10px) scale(1.02)',
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease'
                }}
                className="hover:scale-105"
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            wrapperStyle={{
              paddingTop: '20px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};