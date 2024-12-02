import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";

interface Plan {
  id: string;
  name: string;
  price: number;
  code: string;
}

interface Commission {
  level: number;
  commission_value: number;
}

export default function UpgradePage() {
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("network_plans")
        .select(`
          id,
          name,
          price,
          code,
          network_plan_commissions (
            level,
            commission_value
          )
        `)
        .eq("active", true)
        .order("price");

      if (error) throw error;
      return data;
    },
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <ClientSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Upgrade seu Plano</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans?.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-3xl font-bold mb-4">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/mês</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm">Comissões por nível:</p>
                    {plan.network_plan_commissions.map((commission: Commission) => (
                      <div key={commission.level} className="flex justify-between text-sm">
                        <span>Nível {commission.level}</span>
                        <span>R$ {commission.commission_value.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-auto">
                    Fazer Upgrade
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}