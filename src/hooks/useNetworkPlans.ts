
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NetworkPlan } from "@/types/network";

export const useNetworkPlans = () => {
  return useQuery<NetworkPlan[]>({
    queryKey: ["network_plans"],
    queryFn: async () => {
      // First get the plans
      const { data: plans, error: plansError } = await supabase
        .from("network_plans")
        .select("*");

      if (plansError) throw plansError;

      // Then get commissions for each plan
      const plansWithCommissions = await Promise.all(
        plans.map(async (plan) => {
          const { data: commissions, error: commissionsError } = await supabase
            .from("network_plan_commissions")
            .select("level, commission_value")
            .eq("plan_id", plan.id);

          if (commissionsError) throw commissionsError;

          return {
            ...plan,
            spillover_limit: plan.spillover_limit || 0, // Provide default value
            commissions: commissions || []
          };
        })
      );

      return plansWithCommissions;
    },
  });
};
