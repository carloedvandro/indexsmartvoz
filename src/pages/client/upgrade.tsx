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
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Upgrade seu Plano</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-16">
              {plans?.map((plan) => (
                <Card key={plan.id} className="flex flex-col h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary mb-2">
                        R$ {plan.price.toFixed(2)}
                      </div>
                      <span className="text-sm text-muted-foreground">/mês</span>
                    </div>
                    <div className="space-y-4 mb-8">
                      <h3 className="font-semibold text-lg mb-2">Comissões por nível:</h3>
                      {plan.network_plan_commissions.map((commission: Commission) => (
                        <div 
                          key={commission.level} 
                          className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded-lg"
                        >
                          <span className="font-medium">Nível {commission.level}</span>
                          <span className="text-primary font-semibold">
                            R$ {commission.commission_value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-auto">
                      Fazer Upgrade
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}