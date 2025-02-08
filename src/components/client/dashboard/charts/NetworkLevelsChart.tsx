
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
import { useNetworkData } from "@/components/client/network/useNetworkData";

export const NetworkLevelsChart = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || "");

  const processNetworkData = () => {
    const levels = {
      1: { ativos: 0, inativos: 0 },
      2: { ativos: 0, inativos: 0 },
      3: { ativos: 0, inativos: 0 },
      4: { ativos: 0, inativos: 0 },
    };

    // Set to store unique user IDs at each level to prevent double counting
    const processedUsers = new Set();

    const countMembers = (members) => {
      members.forEach((member) => {
        // Only count if we haven't processed this user before
        if (!processedUsers.has(member.user?.email) && member.level >= 1 && member.level <= 4) {
          processedUsers.add(member.user?.email);
          
          if (member.user?.status?.toLowerCase() === "active") {
            levels[member.level].ativos++;
          } else {
            levels[member.level].inativos++;
          }
        }

        if (member.children?.length > 0) {
          countMembers(member.children);
        }
      });
    };

    if (networkData) {
      console.log("Processing network data:", networkData);
      countMembers(networkData);
    }

    console.log("Processed levels data:", levels);

    return Object.entries(levels).map(([nivel, counts]) => ({
      nivel: `Nível ${nivel}`,
      ativos: counts.ativos,
      inativos: counts.inativos,
    }));
  };

  const data = processNetworkData();

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
