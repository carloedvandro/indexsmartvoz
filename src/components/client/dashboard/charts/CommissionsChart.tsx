
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
import { useNetworkPlans } from "@/hooks/useNetworkPlans";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CommissionsChart = () => {
  const { data: profile } = useProfile();
  const { data: plans } = useNetworkPlans();

  const { data: commissionHistory } = useQuery({
    queryKey: ['commissionHistory', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      const { data, error } = await supabase
        .from('network_commission_history')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching commission history:', error);
        return [];
      }

      return data;
    },
    enabled: !!profile?.id
  });

  const processCommissionData = () => {
    const commissionsByLevel = {
      1: { total: 0, paid: 0, pending: 0 },
      2: { total: 0, paid: 0, pending: 0 },
      3: { total: 0, paid: 0, pending: 0 },
      4: { total: 0, paid: 0, pending: 0 },
    };

    commissionHistory?.forEach((commission) => {
      if (commission.level >= 1 && commission.level <= 4) {
        commissionsByLevel[commission.level].total += Number(commission.amount);
        if (commission.paid) {
          commissionsByLevel[commission.level].paid += Number(commission.amount);
        } else {
          commissionsByLevel[commission.level].pending += Number(commission.amount);
        }
      }
    });

    return Object.entries(commissionsByLevel).map(([level, amounts]) => ({
      nivel: `Nível ${level}`,
      total: amounts.total,
      pago: amounts.paid,
      pendente: amounts.pending,
    }));
  };

  const data = processCommissionData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="m-6">
      <CardHeader className="pb-0">
        <CardTitle className="text-center font-bold">Comissões por Nível</CardTitle>
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
              <YAxis 
                fontSize={12}
                tickFormatter={formatCurrency} 
              />
              <Tooltip 
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey="pago"
                name="Pago"
                stackId="a"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
              <Bar
                dataKey="pendente"
                name="Pendente"
                stackId="a"
                fill="#F59E0B"
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
