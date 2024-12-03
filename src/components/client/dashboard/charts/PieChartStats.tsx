import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return value > 0 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs sm:text-sm font-medium"
      >
        {value}
      </text>
    ) : null;
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={window.innerWidth < 768 ? 50 : 80}
            innerRadius={window.innerWidth < 768 ? 25 : 40}
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="none"
                className="hover:opacity-80 transition-opacity duration-300"
              />
            ))}
          </Pie>
          <Legend 
            wrapperStyle={{
              fontSize: window.innerWidth < 768 ? '10px' : '12px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};