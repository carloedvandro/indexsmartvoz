import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  
  console.log("Raw sponsor data:", sponsorData);
  
  return {
    id: sponsorData.id,
    full_name: sponsorData.full_name,
    email: sponsorData.email,
    custom_id: sponsorData.custom_id,
  };
};

export const useProfile = () => {
  const navigate = useNavigate();

  return useQuery<ProfileWithSponsor | null>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log("No session found, redirecting to login");
        navigate("/client/login");
        return null;
      }

      console.log("Query Key:", "profile");
      console.log("Fetching profile for user:", session.user.id);
      
      const query = {
        table: "profiles",
        filters: { id: session.user.id },
        fields: `
          *,
          sponsor:sponsor_id (
            id,
            full_name,
            email,
            custom_id
          )
        `
      };
      
      console.log("Executing Supabase query:", query);

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select(query.fields)
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Fetched profile data:", profileData);

      if (!profileData) {
        console.warn("No profile data found for user:", session.user.id);
        return null;
      }

      const baseProfile = profileData as unknown as Profile;
      const sponsorData = (profileData as any).sponsor;

      const typedData: ProfileWithSponsor = {
        ...baseProfile,
        sponsor: mapSponsor(sponsorData),
      };

      return typedData;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};