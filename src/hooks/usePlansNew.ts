
import { Plan, PlanBenefit, PlanCashbackLevel } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePlansNew = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select(`
          *,
          plan_benefits (*),
          plan_cashback_levels (*)
        `)
        .eq('active', true)
        .order('created_at');
      
      if (error) throw error;
      return data as any[];
    },
  });
};

export const usePlanById = (planId: string) => {
  return useQuery({
    queryKey: ['plans', planId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select(`
          *,
          plan_benefits (*),
          plan_cashback_levels (*)
        `)
        .eq('id', planId)
        .single();
      
      if (error) throw error;
      return data as any;
    },
    enabled: !!planId,
  });
};
