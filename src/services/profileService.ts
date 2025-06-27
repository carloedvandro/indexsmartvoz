
import { supabase } from "@/integrations/supabase/client";
import { ProfileWithSponsor } from "@/types/profile";
import { mapSponsor } from "@/utils/mappers/profileMapper";

interface UserAddress {
  id: string;
  user_id: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
  created_at: string;
  updated_at: string;
}

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

    // Buscar dados de endereço da tabela user_addresses usando fallback methods
    let addressData: UserAddress | null = null;
    
    try {
      // Try using RPC first
      const { data: rpcAddressData, error: rpcError } = await supabase
        .rpc('get_user_address', { p_user_id: userId })
        .single();
      
      if (!rpcError && rpcAddressData) {
        addressData = rpcAddressData;
      }
    } catch (rpcError) {
      console.log("RPC method failed, trying direct table access");
      
      try {
        // Fallback to direct table access
        const { data: directAddressData, error: directError } = await supabase
          .from("user_addresses" as any)
          .select("*")
          .eq("user_id", userId)
          .single();

        if (!directError && directAddressData) {
          addressData = directAddressData;
        }
      } catch (directError) {
        console.log("Direct table access also failed, address data will be null");
      }
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

    // Se existem dados de endereço, sobrescrever os campos do perfil
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
