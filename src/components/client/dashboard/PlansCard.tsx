
import { Card } from "@/components/ui/card";
import { useNetworkPlans } from "@/hooks/useNetworkPlans";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProfile } from "@/hooks/useProfile";

export function PlansCard() {
  const { data: plans, isLoading } = useNetworkPlans();
  const { data: profile } = useProfile();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Planos</h2>
        <ScrollArea className="h-[calc(100vh-280px)] pr-4">
          <div className="space-y-6">
            {plans?.filter(plan => plan.code !== "FREE_PLAN").map((plan) => (
              <div key={plan.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{plan.name}</h3>
                  <span className="text-lg font-semibold text-purple-600">
                    {formatCurrency(plan.price)}/mês
                  </span>
                </div>
                
                <div className="space-y-2">
                  {plan.spillover_limit && (
                    <p className="text-sm text-gray-600">
                      Limite de lateralidade: {plan.spillover_limit} pessoas
                    </p>
                  )}
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Comissões:</p>
                    {plan.commissions.map((commission) => (
                      <p key={commission.level} className="text-sm text-gray-600">
                        Nível {commission.level}: {formatCurrency(commission.commission_value)}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-2 mt-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
