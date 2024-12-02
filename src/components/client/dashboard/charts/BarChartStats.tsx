import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartStatsProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

export const BarChartStats = ({ data, colors }: BarChartStatsProps) => {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ right: 10, left: -20 }}>
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`colorGradient-${index}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={2}
            tick={{ dy: 10 }}
          />
          <YAxis fontSize={10} width={40} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <Bar
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#colorGradient-${index % colors.length})`}
                style={{
                  filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.5))",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};