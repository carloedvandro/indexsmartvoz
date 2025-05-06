
import { supabase } from "@/integrations/supabase/client";
import { ProfileWithSponsor } from "@/types/profile";
import { mapSponsor } from "@/utils/mappers/profileMapper";

export const fetchProfile = async (userId: string): Promise<ProfileWithSponsor | null> => {
  try {
    console.log("Fetching profile for user ID:", userId);
    
    const { data: profileData, error: profileError } = await supabase
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

    console.log("Fetched profile data:", profileData);

    // Create a copy of the profile data with the sponsor property handled properly
    const profile = profileData as ProfileWithSponsor;
    
    // Handle the sponsor separately to ensure proper typing
    if (profile.sponsor) {
      profile.sponsor = mapSponsor(profile.sponsor);
    } else {
      profile.sponsor = null;
    }

    return profile;
  } catch (error) {
    console.error("Error in fetchProfile:", error);
    throw error;
  }
};

// General update function that can be used to update any profile field
export const updateProfileField = async (userId: string, field: string, value: any): Promise<void> => {
  try {
    console.log(`Updating ${field} for user ${userId}`);
    
    const { error } = await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("id", userId);
    
    if (error) {
      console.error(`Error updating ${field}:`, error);
      throw error;
    }
    
    console.log(`${field} updated successfully`);
  } catch (error) {
    console.error(`Error in update${field}:`, error);
    throw error;
  }
};
