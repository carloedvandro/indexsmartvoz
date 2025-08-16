
import { supabase } from "@/integrations/supabase/client";
import { ProfileWithSponsor } from "@/types/profile";
import { ProfileAddress } from "@/types/database";
import { mapSponsor } from "@/utils/mappers/profileMapper";

export const fetchProfileNew = async (userId: string): Promise<ProfileWithSponsor | null> => {
  try {
    console.log("Fetching profile for user ID:", userId);
    
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select(`
        *,
        sponsor:referred_code (
          id,
          full_name,
          email,
          referred_code
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

    // Buscar dados de endereço da nova tabela profile_addresses
    const { data: addressData, error: addressError } = await supabase
      .from("profile_addresses")
      .select("*")
      .eq("profile_id", userId)
      .single();

    if (addressError && addressError.code !== 'PGRST116') {
      console.error("Error fetching address:", addressError);
    }

    console.log("Fetched complete profile data:", profileData);
    console.log("Fetched address data:", addressData);

    // Create a copy of the profile data with all fields
    const profile: ProfileWithSponsor = {
      ...profileData,
      sponsor: null // Initialize as null, will be updated if sponsor exists
    };
    
    // Handle the sponsor separately to ensure proper typing
    if (profileData.sponsor) {
      profile.sponsor = mapSponsor(profileData.sponsor);
    }

    // Se existem dados de endereço, adicionar aos campos extras do perfil
    if (addressData) {
      profile.zip_code = addressData.cep;
      profile.address = `${addressData.street}, ${addressData.number}`;
      profile.city = addressData.city;
      profile.state = addressData.state;
      // Manter campos extras para o formulário
      profile.address_number = addressData.number;
      profile.neighborhood = addressData.neighborhood;
      profile.complement = addressData.complement;
    }

    return profile;
  } catch (error) {
    console.error("Error in fetchProfile:", error);
    throw error;
  }
};

// Function to update profile with address
export const updateProfileWithAddress = async (
  userId: string, 
  profileData: any, 
  addressData?: ProfileAddress
): Promise<void> => {
  try {
    console.log(`Updating profile and address for user ${userId}`);
    
    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", userId);
    
    if (profileError) {
      console.error("Error updating profile:", profileError);
      throw profileError;
    }

    // Update or create address if provided
    if (addressData) {
      const { error: addressError } = await supabase
        .from("profile_addresses")
        .upsert({
          profile_id: userId,
          ...addressData
        });

      if (addressError) {
        console.error("Error updating address:", addressError);
        throw addressError;
      }
    }
    
    console.log("Profile and address updated successfully");
  } catch (error) {
    console.error("Error in updateProfileWithAddress:", error);
    throw error;
  }
};

// General update function that can be used to update any profile field
export const updateProfileFieldNew = async (userId: string, field: string, value: any): Promise<void> => {
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
