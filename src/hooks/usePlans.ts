
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Plan {
  id: string;
  title: string;
  description: string | null;
  value: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      try {
        const { data: plans, error } = await supabase
          .from('plans')
          .select('*')
          .eq('status', 'active')
          .order('value');

        if (error) {
          console.error('Error fetching plans:', error);
          toast.error('Erro ao carregar planos');
          return [];
        }

        return plans || [];
      } catch (error) {
        console.error('Error in usePlans:', error);
        toast.error('Erro ao carregar dados dos planos');
        return [];
      }
    }
  });
};
