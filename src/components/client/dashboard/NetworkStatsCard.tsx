import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { formatCurrency } from "@/utils/format";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

export const NetworkStatsCard = () => {
  const { data: profile } = useProfile();
  const { networkData } = useNetworkData(profile?.id || '');
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['networkData', profile.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id, queryClient]);

  const memberCounts = networkData ? countMembersByStatus(networkData) : { active: 0, pending: 0 };

  // Dados simulados para os gráficos dos cards
  const generateChartData = (baseValue: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      name: month,
      value: Math.floor(baseValue * (1 + Math.sin(index / 2) * 0.5))
    }));
  };

  // Dados simulados para o gráfico de faturamento
  const generateRevenueData = () => {
    const dates = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(2025, 0, i + 1);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    });

    return dates.map((date) => ({
      date,
      revenue: Math.floor(Math.random() * 10000),
      projected: Math.floor(Math.random() * 12000)
    }));
  };

  const cardData = [
    {
      title: "Ganhos Ativos",
      value: formatCurrency(130510),
      data: generateChartData(130510),
      color: "#786AFF"
    },
    {
      title: "Ganhos Pendentes",
      value: formatCurrency(175035),
      data: generateChartData(175035),
      color: "#5E60CE"
    },
    {
      title: "Total de Ganhos",
      value: formatCurrency(210375),
      data: generateChartData(210375),
      color: "#7B61FF"
    }
  ];

  const revenueData = generateRevenueData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Data: {label}</p>
          <p className="text-sm font-semibold text-gray-900">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-white border border-gray-100 shadow-sm"
            >
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <p className="text-2xl font-bold mt-2 text-gray-900">{card.value}</p>
              <div className="mt-4 h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={card.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10 }}
                      stroke="#9CA3AF"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }}
                      stroke="#9CA3AF"
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={card.color}
                      strokeWidth={2}
                      dot={{ fill: card.color, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: card.color }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de faturamento com altura reduzida */}
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Faturamento</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7B61FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                />
                <Tooltip
                  formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Faturamento']}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7B61FF"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  dot={{ fill: "#7B61FF", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#7B61FF" }}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="#FFA500"
                  strokeWidth={2}
                  dot={{ fill: "#FFA500", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#FFA500" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};