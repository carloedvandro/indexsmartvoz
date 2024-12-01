import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

type Profile = Tables<"profiles">;

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*, sponsor:profiles!profiles_sponsor_id_fkey(full_name)")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};