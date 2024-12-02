import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  return (
    <div className="h-[300px] md:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
            label={({ value, percent }) => {
              const percentage = (percent * 100).toFixed(0);
              return `${value}`;
            }}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#ffffff"
                strokeWidth={3}
                style={{
                  filter: "drop-shadow(3px 3px 2px rgba(0,0,0,0.3))",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} (${((value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%)`,
              name,
            ]}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
              paddingBottom: "20px",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};