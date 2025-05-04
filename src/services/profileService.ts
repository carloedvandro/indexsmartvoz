
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

// Add a function to update the profile's full_name
export const updateFullName = async (userId: string, fullName: string): Promise<void> => {
  try {
    console.log(`Updating full name for user ${userId} to "${fullName}"`);
    
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", userId);
    
    if (error) {
      console.error("Error updating full name:", error);
      throw error;
    }
    
    console.log("Full name updated successfully");
  } catch (error) {
    console.error("Error in updateFullName:", error);
    throw error;
  }
};
