import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

type Profile = Tables<"profiles">;

type Sponsor = {
  id: string;
  full_name: string | null;
  email: string;
  custom_id: string | null;
};

type ProfileWithSponsor = Profile & {
  sponsor?: Sponsor | null;
};

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
      
      const { data: profileData, error } = await supabase
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

      console.log("Profile data:", profileData);

      if (!profileData) {
        return null;
      }

      const typedData: ProfileWithSponsor = {
        ...profileData,
        sponsor: profileData.sponsor ? {
          id: profileData.sponsor.id,
          full_name: profileData.sponsor.full_name,
          email: profileData.sponsor.email,
          custom_id: profileData.sponsor.custom_id
        } : null
      };

      return typedData;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};