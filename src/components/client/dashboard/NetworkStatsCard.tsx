import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const barData = [
  { name: "Nov 1", value: 7 },
  { name: "Nov 2", value: 12 },
  { name: "Nov 3", value: 58 },
  { name: "Nov 4", value: 29 },
  { name: "Nov 5", value: 59 },
  { name: "Nov 6", value: 117 },
  { name: "Nov 7", value: 205 },
  { name: "Nov 8", value: 232 },
  { name: "Nov 9", value: 414 },
  { name: "Nov 10", value: 466 },
  { name: "Nov 11", value: 741 },
  { name: "Nov 12", value: 812 },
  { name: "Nov 13", value: 835 },
  { name: "Nov 14", value: 713 },
  { name: "Nov 15", value: 612 },
];

const pieData = [
  { name: "Ativos", value: 6700, color: "#9b87f5" },
  { name: "Inativos", value: 0, color: "#D946EF" },
];

const colors = [
  "#FF6B6B",
  "#FFA07A",
  "#FFD700",
  "#98FB98",
  "#87CEEB",
  "#9B87F5",
  "#DDA0DD",
  "#FF69B4",
  "#FF1493",
];

export const NetworkStatsCard = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[300px] md:h-[400px] w-full min-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={barData} 
              margin={{ right: 10, left: -20 }}
            >
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
                {barData.map((entry, index) => (
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
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                startAngle={0}
                endAngle={360}
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                isAnimationActive={true}
                blendStroke
                viewBox="0 -30 400 400"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{
                      filter: "drop-shadow(6px 6px 8px rgba(0,0,0,0.6))",
                      transform: "rotateX(45deg)",
                      transformOrigin: "center",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};