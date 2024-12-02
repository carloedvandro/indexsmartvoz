import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const PieChartStats = ({ data }: PieChartStatsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

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
            outerRadius={70}
            innerRadius={45}
            paddingAngle={2}
            dataKey="value"
            label={({ value }) => `${value}`}
            labelLine={false}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={0}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="#ffffff"
                strokeWidth={3}
                style={{
                  filter: "drop-shadow(3px 3px 2px rgba(0,0,0,0.3))",
                  transform: `scale(${activeIndex === index ? 1.1 : 1})`,
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} (${((value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%)`,
              name,
            ]}
            contentStyle={{
              animation: "fade-in 0.3s ease-out",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
              paddingBottom: "20px",
              animation: "fade-in 0.5s ease-out",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "20px",
              animation: "fade-in 0.5s ease-out",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};