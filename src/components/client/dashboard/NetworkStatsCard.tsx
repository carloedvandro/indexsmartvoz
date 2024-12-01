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
  { name: "Ativos", value: 6700, color: "#10B981" },
  { name: "Inativos", value: 0, color: "#6366F1" },
];

export const NetworkStatsCard = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};