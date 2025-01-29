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
                right: 0,
                left: 0,
                bottom: 7,
              }}
              barGap={0}
              barCategoryGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.05} horizontal={true} vertical={false} />
              <XAxis 
                dataKey="nivel" 
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={40}
                interval={0}
                tickSize={12}
                tickMargin={4}
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
                fill="#05ff00"
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
              <Bar
                dataKey="inativos"
                name="Inativos"
                stackId="a"
                fill="#f70000"
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </div>
  );
};