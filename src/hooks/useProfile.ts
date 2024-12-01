import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

type Profile = Tables<"profiles">;

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log("No session found");
        return null;
      }

      console.log("Fetching profile for user:", session.user.id);
      
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          sponsor:profiles!profiles_sponsor_id_fkey (
            id,
            full_name,
            email
          )
        `)
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile data:", data);
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};