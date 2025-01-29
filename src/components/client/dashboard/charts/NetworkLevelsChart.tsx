import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { nivel: "Nível 1", ativos: 8, inativos: 0 },
  { nivel: "Nível 3", ativos: 8, inativos: 56 },
  { nivel: "Nível 5", ativos: 19, inativos: 39 },
  { nivel: "Nível 7", ativos: 26, inativos: 91 },
  { nivel: "Nível 9", ativos: 32, inativos: 179 },
  { nivel: "Nível 11", ativos: 88, inativos: 333 },
  { nivel: "Nível 13", ativos: 133, inativos: 504 },
  { nivel: "Nível 15", ativos: 237, inativos: 585 },
  { nivel: "Nível 17", ativos: 217, inativos: 430 },
  { nivel: "Nível 19", ativos: 182, inativos: 174 },
  { nivel: "Nível 21", ativos: 86, inativos: 62 },
  { nivel: "Nível 23", ativos: 58, inativos: 75 },
  { nivel: "Nível 25", ativos: 6, inativos: 36 },
];

export const NetworkLevelsChart = () => {
  return (
    <div className="w-full space-y-4">
      <CardHeader className="p-0">
        <CardTitle>Distribuição por Níveis</CardTitle>
      </CardHeader>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="nivel" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="ativos"
              name="Ativos"
              stackId="a"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="inativos"
              name="Inativos"
              stackId="a"
              fill="#E5E7EB"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};