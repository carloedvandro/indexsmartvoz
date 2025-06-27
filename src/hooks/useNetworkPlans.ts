
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NetworkPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  spillover_limit: number | null;
  active: boolean;
  commissions: {
    level: number;
    commission_value: number;
  }[];
}

export const useNetworkPlans = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['networkPlans'],
    queryFn: async () => {
      try {
        // Fetch plans
        const { data: plans, error: plansError } = await supabase
          .from('network_plans')
          .select('*')
          .eq('active', true)
          .order('price');

        if (plansError) {
          console.error('Error fetching plans:', plansError);
          toast({
            title: "Erro",
            description: "Erro ao carregar planos",
            variant: "destructive",
          });
          return [];
        }

        // Fetch commissions for all plans
        const { data: commissions, error: commissionsError } = await supabase
          .from('network_plan_commissions')
          .select('*')
          .in('plan_id', plans.map(plan => plan.id));

        if (commissionsError) {
          console.error('Error fetching commissions:', commissionsError);
          toast({
            title: "Erro",
            description: "Erro ao carregar comissões",
            variant: "destructive",
          });
          return [];
        }

        // Combine plans with their commissions
        const plansWithCommissions: NetworkPlan[] = plans.map(plan => ({
          ...plan,
          commissions: commissions
            .filter(comm => comm.plan_id === plan.id)
            .map(({ level, commission_value }) => ({
              level,
              commission_value
            }))
            .sort((a, b) => a.level - b.level)
        }));

        return plansWithCommissions;
      } catch (error) {
        console.error('Error in useNetworkPlans:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados dos planos",
          variant: "destructive",
        });
        return [];
      }
    }
  });
};
