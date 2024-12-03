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

/**
 * Maps the sponsor data from the database to a strongly typed Sponsor object
 * @param sponsorData - Raw sponsor data from the database
 * @returns Typed Sponsor object or null if no sponsor data
 */
const mapSponsor = (sponsorData: Record<string, any> | null): Sponsor | null => {
  if (!sponsorData) return null;
  
  return {
    id: sponsorData.id,
    full_name: sponsorData.full_name,
    email: sponsorData.email,
    custom_id: sponsorData.custom_id,
  };
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

      console.log("Query Key:", "profile");
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

      console.log("Fetched profile data:", profileData);

      if (!profileData) {
        return null;
      }

      const typedData: ProfileWithSponsor = {
        ...profileData,
        sponsor: mapSponsor(profileData.sponsor),
      };

      return typedData;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};