import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  const COLORS = ['#FF5252', '#FF9800', '#9C27B0', '#2196F3'];

  const renderActiveShape = (props: any) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            transform: 'translateZ(20px)',
            transformOrigin: 'center'
          }}
        />
        <text
          x={cx}
          y={cy - 8}
          dy={8}
          textAnchor="middle"
          fill={fill}
          className="text-lg font-bold"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={cx}
          y={cy + 15}
          dy={8}
          textAnchor="middle"
          fill="#666"
          className="text-sm"
        >
          {payload.name}
        </text>
      </g>
    );
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-white to-gray-50 rounded-lg p-4">
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
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            activeShape={renderActiveShape}
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={4}
            dataKey="value"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGradient-${index})`}
                stroke="none"
                style={{
                  filter: 'drop-shadow(4px 8px 16px rgba(0,0,0,0.25))',
                  transform: 'translateZ(10px)',
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