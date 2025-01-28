import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartStatsProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  value: number;
}

export const PieChartStats = ({ data, title, value }: PieChartStatsProps) => {
  return (
    <div className="relative w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-gray-800">{value}%</span>
        <span className="text-sm text-gray-500 mt-1">{title}</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#33C3F0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#33C3F0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 Q50 30 100 0"
            fill="url(#areaGradient)"
            className="w-full"
          />
        </svg>
      </div>
    </div>
  );
};