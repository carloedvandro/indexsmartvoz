
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
    const { error } = await supabase
      .from("user_addresses")
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

    if (error) {
      log("error", "Error saving address", error);
      throw new Error("Erro ao salvar endereço: " + error.message);
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
    const { data, error } = await supabase
      .from("user_addresses")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      log("error", "Error fetching address", error);
      throw error;
    }

    return data;
  } catch (error: any) {
    log("error", "Error in getUserAddress function", error);
    throw error;
  }
};
