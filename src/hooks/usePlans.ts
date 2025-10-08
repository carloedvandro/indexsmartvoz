
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PlanBenefit {
  id: string;
  benefit_title: string;
  display_order: number;
}

interface PlanCashbackLevel {
  id: string;
  level: number;
  percentage: number;
  description: string;
}

interface Plan {
  id: string;
  title: string;
  description: string | null;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
  benefits?: PlanBenefit[];
  cashback_levels?: PlanCashbackLevel[];
}

export const usePlans = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      try {
        const { data: plans, error } = await supabase
          .from('plans')
          .select(`
            *,
            benefits:plan_benefits(*),
            cashback_levels:plan_cashback_levels(*)
          `)
          .eq('status', 'active')
          .order('value');

        if (error) {
          console.error('Error fetching plans:', error);
          toast({
            title: "Erro",
            description: "Erro ao carregar planos",
            variant: "destructive",
          });
          return [];
        }

        return plans || [];
      } catch (error) {
        console.error('Error in usePlans:', error);
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
