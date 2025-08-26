import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InternetOption } from "@/components/client/products/InternetSelector";

interface PlanBenefit {
  id: string;
  title: string; 
  display_order: number;
  benefit_description?: string;
  created_at?: string;
  plan_id?: string;
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
    queryKey: ["plans"],
    queryFn: async (): Promise<Plan[]> => {
      try {
        const { data: plans, error } = await supabase
          .from("plans")
          .select(
            `
            *,
            benefits:plan_benefits(*),
            cashback_levels:plan_cashback_levels(*)
          `
          )
          .eq("status", "active")
          .order("value");

        if (error) {
          console.error("Error fetching plans:", error);
          toast({
            title: "Erro",
            description: "Erro ao carregar planos",
            variant: "destructive",
          });
          return [];
        }

        return (
          plans.map((plan) => ({
            description: plan.description,
            created_at: plan.created_at,
            id: plan.id,
            status: plan.status,
            title: plan.title,
            updated_at: plan.updated_at,
            value: plan.value,
            benefits: plan.benefits,
            cashback_levels: plan.cashback_levels,
          })) || []
        );
      } catch (error) {
        console.error("Error in usePlans:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados dos planos",
          variant: "destructive",
        });
        return [];
      }
    },
  });
};
