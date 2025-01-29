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
  { nivel: "Nível 2", ativos: 12, inativos: 3 },
  { nivel: "Nível 3", ativos: 8, inativos: 56 },
  { nivel: "Nível 4", ativos: 15, inativos: 25 },
  { nivel: "Nível 5", ativos: 19, inativos: 39 },
];

export const NetworkLevelsChart = () => {
  return (
    <div className="w-full space-y-4">
      <CardHeader className="p-0">
        <CardTitle>Distribuição por Níveis</CardTitle>
      </CardHeader>
      <div className="h-[250px] md:h-[270px] w-[150%] -ml-12 md:-ml-16">
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
            <CartesianGrid strokeDasharray="3 3" opacity={0.05} />
            <XAxis 
              dataKey="nivel" 
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tickSize={4}
              tickMargin={8}
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
              barSize={30}
            />
            <Bar
              dataKey="inativos"
              name="Inativos"
              stackId="a"
              fill="#E5E7EB"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};