
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
import { useProfile } from "@/hooks/useProfile";
import { useNetworkStats } from "@/hooks/useNetworkStats";

export const NetworkLevelsChart = () => {
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);
  
  // Usando os dados reais da rede
  const data = [
    { nivel: "Nível 1", ativos: networkStats?.level1Count || 0, inativos: 0 },
    { nivel: "Nível 2", ativos: networkStats?.level2Count || 0, inativos: 0 },
    { nivel: "Nível 3", ativos: networkStats?.level3Count || 0, inativos: 0 },
    { nivel: "Nível 4", ativos: networkStats?.level4Count || 0, inativos: 0 }
    // Removido o nível 5 que foi mostrado anteriormente
  ];

  return (
    <Card className="w-full col-span-2">
      <CardHeader className="pb-0">
        <CardTitle>Distribuição por Níveis</CardTitle>
      </CardHeader>
      <CardContent className="pl-0 md:pl-4">
        <div className="h-[250px] md:h-[270px] w-[100%] -mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 0,
                left: -25,
                bottom: 7,
              }}
              barGap={0}
              barCategoryGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.05} horizontal={true} vertical={false} />
              <XAxis 
                dataKey="nivel" 
                fontSize={11}
                angle={0}
                textAnchor="middle"
                height={40}
                interval={0}
                tickSize={12}
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
                formatter={(value) => [`${value.toLocaleString('pt-BR')}`, '']}
              />
              <Legend />
              <Bar
                dataKey="ativos"
                name="Ativos"
                stackId="a"
                fill="#ff00d6"
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
    </Card>
  );
};
