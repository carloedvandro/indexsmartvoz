
import { supabase } from "@/integrations/supabase/client";
import { ProfileWithSponsor } from "@/types/profile";
import { mapSponsor } from "@/utils/mappers/profileMapper";

export const fetchProfile = async (userId: string): Promise<ProfileWithSponsor | null> => {
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select(`
      *,
      profiles!profiles_sponsor_id_fkey (
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

  return {
    ...profileData,
    sponsor: mapSponsor(profileData.profiles),
  } as ProfileWithSponsor;
};
