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
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const { data: profile } = useProfile();
  const { data: networkStats } = useNetworkStats(profile?.id);

  // Fetch active/inactive members count
  const { data: membersStatus } = useQuery({
    queryKey: ['networkMembersStatus', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return null;

      // Get all profiles and their status
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select('status, blocked')
        .neq('id', profile.id); // Exclude current user

      if (error) {
        console.error("Error fetching profiles:", error);
        return {
          active: 0,
          inactive: 0
        };
      }

      if (!profilesData) return {
        active: 0,
        inactive: 0
      };

      // Count active and inactive members
      const active = profilesData.filter(p => p.status === 'active' && !p.blocked).length;
      const inactive = profilesData.filter(p => p.status !== 'active' || p.blocked).length;

      console.log("Active members:", active);
      console.log("Inactive members:", inactive);

      return {
        active,
        inactive
      };
    },
    enabled: !!profile?.id
  });

  // Calculate total network size
  const totalNetworkSize = networkStats ? 
    networkStats.level1Count + networkStats.level2Count + networkStats.level3Count + networkStats.level4Count : 
    0;

  const pieData = [
    { 
      name: "Ativos", 
      value: membersStatus?.active || 0, 
      color: "#9b87f5" 
    },
    { 
      name: "Inativos", 
      value: membersStatus?.inactive || 0, 
      color: "#D946EF" 
    },
  ];

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
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                isAnimationActive={true}
                blendStroke
                onMouseEnter={(_, index, e) => {
                  if (e.target) {
                    e.target.style.filter = "drop-shadow(4px 4px 8px rgba(0,0,0,0.6))";
                  }
                }}
                onMouseLeave={(_, index, e) => {
                  if (e.target) {
                    e.target.style.filter = "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))";
                  }
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
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