import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const data = [
  { month: "JAN", value: 65000, trend: 45000 },
  { month: "FEV", value: 72000, trend: 52000 },
  { month: "MAR", value: 45000, trend: 48000 },
  { month: "ABR", value: 85000, trend: 55000 },
  { month: "MAI", value: 95000, trend: 65000 },
  { month: "JUN", value: 102000, trend: 75000 },
  { month: "JUL", value: 98000, trend: 82000 },
  { month: "AGO", value: 88000, trend: 80000 },
  { month: "SET", value: 72000, trend: 68000 },
  { month: "OUT", value: 85000, trend: 71000 },
  { month: "NOV", value: 95000, trend: 78000 },
  { month: "DEZ", value: 112000, trend: 85000 },
];

const colors = [
  "#4ade80",
  "#4ade80",
  "#d946ef",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#ef4444",
  "#eab308",
  "#3b82f6",
  "#3b82f6",
  "#6366f1",
  "#7c3aed",
];

const CustomBar = (props: any) => {
  const { fill, x, y, width, height, index } = props;
  const animationDelay = `${index * 0.2}s`;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        style={{
          filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
          animation: `float 3s ease-in-out infinite`,
          animationDelay,
        }}
        rx={4}
        ry={4}
      />
    </g>
  );
};

export const MonthlyPerformanceChart = () => {
  return (
    <div className="w-full flex flex-col items-center max-w-[1800px] mx-auto">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold">Performance Mensal</h2>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="month"
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#1f2937"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
              width={60}
              tick={{ dx: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                color: "#1f2937",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Valor"]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={35} shape={<CustomBar />}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index]}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#1f2937"
              strokeWidth={2}
              dot={{ fill: "#1f2937", r: 4 }}
              activeDot={{ r: 6, fill: "#1f2937" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};