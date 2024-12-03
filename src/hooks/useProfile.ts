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
          sponsor:sponsor_id (
            id,
            full_name,
            email,
            custom_id
          )
        `)
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Profile data:", data);
      
      // Cast the sponsor data to the correct type and handle it as a single object
      const sponsorData = data?.sponsor && typeof data.sponsor === 'object' ? {
        id: (data.sponsor as any).id as string,
        full_name: (data.sponsor as any).full_name as string | null,
        email: (data.sponsor as any).email as string,
        custom_id: (data.sponsor as any).custom_id as string | null
      } : null;
      
      return {
        ...data,
        sponsor: sponsorData
      } as Profile & {
        sponsor?: {
          id: string;
          full_name: string | null;
          email: string;
          custom_id: string | null;
        } | null;
      };
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};