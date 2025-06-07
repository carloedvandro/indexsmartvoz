
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader } from "@/components/admin/common/AdminPageHeader";
import { AdminCard } from "@/components/admin/common/AdminCard";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  // Query para estatísticas gerais
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: totalClients },
        { count: totalPlans },
        { count: totalOrders },
        { count: pendingOrders }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
        supabase.from('plans').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      return {
        totalClients: totalClients || 0,
        totalPlans: totalPlans || 0,
        totalOrders: totalOrders || 0,
        pendingOrders: pendingOrders || 0
      };
    }
  });

  // Query para últimas contratações
  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          user:profiles!user_id(full_name, email),
          plan:plans!plan_id(title, value)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      return data || [];
    }
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Dashboard Administrativo"
          subtitle="Visão geral do sistema e indicadores principais"
        />

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminCard
            title="Total de Clientes"
            value={stats?.totalClients || 0}
            icon={Users}
            description="Clientes cadastrados"
            color="blue"
          />
          <AdminCard
            title="Planos Ativos"
            value={stats?.totalPlans || 0}
            icon={Package}
            description="Planos disponíveis"
            color="green"
          />
          <AdminCard
            title="Total de Pedidos"
            value={stats?.totalOrders || 0}
            icon={ShoppingCart}
            description="Contratações realizadas"
            color="yellow"
          />
          <AdminCard
            title="Pedidos Pendentes"
            value={stats?.pendingOrders || 0}
            icon={DollarSign}
            description="Aguardando aprovação"
            color="red"
          />
        </div>

        {/* Gráficos e Últimas Atividades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placeholder para gráfico */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <p className="text-gray-500">Gráfico em desenvolvimento...</p>
              </div>
            </CardContent>
          </Card>

          {/* Últimas contratações */}
          <Card>
            <CardHeader>
              <CardTitle>Últimas Contratações</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders && recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{order.user?.full_name || 'Cliente'}</p>
                        <p className="text-sm text-gray-600">{order.plan?.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {order.plan?.value}</p>
                        <p className={`text-xs ${
                          order.status === 'confirmed' ? 'text-green-600' : 
                          order.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {order.status === 'confirmed' ? 'Confirmado' :
                           order.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center text-gray-500">
                  Nenhuma contratação recente
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
