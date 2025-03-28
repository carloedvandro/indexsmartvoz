
import { supabase } from "@/integrations/supabase/client";
import { ProfileWithSponsor } from "@/types/profile";
import { mapSponsor } from "@/utils/mappers/profileMapper";

export const fetchProfile = async (userId: string): Promise<ProfileWithSponsor | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select(`
      *,
      bank_name,
      account_number,
      account_name,
      ifsc_code,
      paypal_email,
      sponsor:sponsor_id (
        id,
        full_name,
        email,
        custom_id
      )
    `)
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    throw profileError;
  }

  if (!profileData || typeof profileData !== "object") {
    console.warn("No profile data found for user:", userId);
    return null;
  }

  // Create a copy of the profile data with the sponsor added
  const profileWithSponsor: ProfileWithSponsor = {
    ...profileData,
    sponsor: typeof profileData === 'object' && 
             'sponsor' in profileData && 
             profileData.sponsor 
      ? mapSponsor(profileData.sponsor as Record<string, any>) 
      : null
  };

  return profileWithSponsor;
};
