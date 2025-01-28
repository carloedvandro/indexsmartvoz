import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNetworkData } from "@/components/client/network/useNetworkData";
import { countMembersByStatus } from "@/utils/networkStats";
import { formatCurrency } from "@/utils/format";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Tooltip } from 'recharts';

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

  // Dados simulados para os gráficos dos cartões
  const generateChartData = (baseValue: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      name: month,
      value: Math.floor(baseValue * (1 + Math.sin(index / 2) * 0.5))
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

  // Dados simulados para o gráfico de faturamento
  const revenueData = [
    { date: '01/Jan', value: 1000 },
    { date: '03/Jan', value: 1500 },
    { date: '05/Jan', value: 3000 },
    { date: '07/Jan', value: 1000 },
    { date: '09/Jan', value: 2500 },
    { date: '11/Jan', value: 1000 },
    { date: '13/Jan', value: 2800 },
    { date: '15/Jan', value: 1200 },
    { date: '17/Jan', value: 10000 },
    { date: '19/Jan', value: 500 },
    { date: '21/Jan', value: 1500 },
    { date: '23/Jan', value: 1200 },
    { date: '25/Jan', value: 800 },
    { date: '27/Jan', value: 1800 },
    { date: '29/Jan', value: 1000 },
    { date: '31/Jan', value: 500 },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Estatísticas da Rede</CardTitle>
      </CardHeader>
      <CardContent>
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

        {/* Novo gráfico de faturamento */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Faturamento</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
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
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Faturamento']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#7B61FF" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                  dot={{ fill: '#7B61FF', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#7B61FF' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};