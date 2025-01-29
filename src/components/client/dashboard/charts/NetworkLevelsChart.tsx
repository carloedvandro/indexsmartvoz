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
  { nivel: "Nível 1", ativos: 3, inativos: 8 },
  { nivel: "Nível 3", ativos: 0, inativos: 56 },
  { nivel: "Nível 5", ativos: 4, inativos: 91 },
  { nivel: "Nível 7", ativos: 26, inativos: 179 },
  { nivel: "Nível 9", ativos: 86, inativos: 333 },
  { nivel: "Nível 11", ativos: 133, inativos: 504 },
  { nivel: "Nível 13", ativos: 239, inativos: 585 },
  { nivel: "Nível 15", ativos: 162, inativos: 430 },
  { nivel: "Nível 17", ativos: 86, inativos: 174 },
  { nivel: "Nível 19", ativos: 58, inativos: 62 },
  { nivel: "Nível 21", ativos: 35, inativos: 75 },
  { nivel: "Nível 23", ativos: 16, inativos: 35 },
  { nivel: "Nível 25", ativos: 6, inativos: 0 },
];

export const NetworkLevelsChart = () => {
  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle>Distribuição por Níveis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] md:h-[270px] w-[100%]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 7,
              }}
              barGap={2}
              barCategoryGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
              <XAxis 
                dataKey="nivel" 
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tickSize={8}
                tickMargin={5}
              />
              <YAxis 
                fontSize={12}
                tickCount={6}
                domain={[0, 1000]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                cursor={false}
              />
              <Legend />
              <Bar
                dataKey="ativos"
                name="Ativos"
                fill="#4ade80"
                radius={[2, 2, 0, 0]}
                barSize={16}
              />
              <Bar
                dataKey="inativos"
                name="Inativos"
                fill="#e5e7eb"
                radius={[2, 2, 0, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </div>
  );
};