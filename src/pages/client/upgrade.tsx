import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client/dashboard/ClientSidebar";
import { DashboardHeader } from "@/components/client/dashboard/DashboardHeader";
import { ArrowUp } from "lucide-react";

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
      <div className="flex h-screen bg-background">
        <ClientSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            title="Upgrade seu Plano" 
            subtitle="Escolha o melhor plano para você"
            icon={<ArrowUp className="w-8 h-8 text-primary" />}
          />
          <div className="flex-1 overflow-y-auto p-8">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans?.map((plan) => (
                  <Card
                    key={plan.id}
                    className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-primary mt-2">
                        R$ {plan.price.toFixed(2)}
                        <span className="text-sm text-muted-foreground font-normal">/mês</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 mb-8 flex-1">
                        <h3 className="font-semibold text-lg">Comissões por nível:</h3>
                        {plan.network_plan_commissions
                          .sort((a: Commission, b: Commission) => a.level - b.level)
                          .map((commission: Commission) => (
                            <div
                              key={commission.level}
                              className="flex justify-between items-center py-2.5 px-4 bg-muted/50 rounded-lg"
                            >
                              <span className="font-medium">Nível {commission.level}</span>
                              <span className="text-primary font-semibold">
                                R$ {commission.commission_value.toFixed(2)}
                              </span>
                            </div>
                          ))}
                      </div>
                      <Button
                        className="w-full mt-auto"
                        size="lg"
                      >
                        Fazer Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}