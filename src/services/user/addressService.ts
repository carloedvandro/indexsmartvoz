
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";

export type AddressData = {
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
};

export const saveUserAddress = async (userId: string, addressData: AddressData) => {
  log("info", "Saving user address", { userId, addressData });

  try {
    // Use RPC function to create address
    const { data, error } = await supabase
      .rpc('create_user_address', {
        p_user_id: userId,
        p_cep: addressData.cep,
        p_street: addressData.street,
        p_neighborhood: addressData.neighborhood,
        p_number: addressData.number,
        p_city: addressData.city,
        p_state: addressData.state,
        p_complement: addressData.complement || null
      });

    if (error) {
      log("error", "Error saving address with RPC", error);
      
      // Fallback to direct table access
      try {
        const { error: fallbackError } = await supabase
          .from("user_addresses" as any)
          .insert({
            user_id: userId,
            cep: addressData.cep,
            street: addressData.street,
            neighborhood: addressData.neighborhood,
            number: addressData.number,
            city: addressData.city,
            state: addressData.state,
            complement: addressData.complement || null,
          });

        if (fallbackError) {
          throw new Error("Erro ao salvar endereço: " + fallbackError.message);
        }
      } catch (fallbackError: any) {
        log("error", "Fallback method also failed", fallbackError);
        throw fallbackError;
      }
    }

    log("info", "Address saved successfully", { userId });
    return true;
  } catch (error: any) {
    log("error", "Error in saveUserAddress function", error);
    throw error;
  }
};

export const getUserAddress = async (userId: string) => {
  try {
    // Use RPC function to get address
    const { data, error } = await supabase
      .rpc('get_user_address', { p_user_id: userId })
      .single();

    if (error && error.code !== 'PGRST116') {
      log("error", "Error fetching address with RPC", error);
      
      // Fallback to direct table access
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("user_addresses" as any)
          .select("*")
          .eq("user_id", userId)
          .single();

        if (fallbackError && fallbackError.code !== 'PGRST116') {
          throw fallbackError;
        }

        return fallbackData;
      } catch (fallbackError: any) {
        log("error", "Fallback method also failed", fallbackError);
        throw fallbackError;
      }
    }

    return data;
  } catch (error: any) {
    log("error", "Error in getUserAddress function", error);
    throw error;
  }
};
