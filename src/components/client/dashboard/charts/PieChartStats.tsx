
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
  // Enhanced tooltip that won't get cut off
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md z-[9999]">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-bold">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-gray-800">{value}%</span>
        <span className="text-sm text-gray-500 mt-1">{title}</span>
      </div>
      {/* Increased the max width to make the chart larger */}
      <div className="w-full max-w-[450px] mx-auto" style={{ height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="pieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D6BCFA" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#D6BCFA" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="65%"
              outerRadius="95%"
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
            <Tooltip 
              content={<CustomTooltip />}
              position={{ x: 0, y: 0 }}
              wrapperStyle={{ 
                zIndex: 9999, 
                position: 'fixed', 
                pointerEvents: 'auto',
                visibility: 'visible',
                top: 'auto',
                left: 'auto'
              }}
              allowEscapeViewBox={{ x: true, y: true }}
              offset={10}
              cursor={{ stroke: 'none', strokeWidth: 0 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12">
        <svg className="w-full h-full opacity-20">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D6BCFA" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#D6BCFA" stopOpacity={0.1} />
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
