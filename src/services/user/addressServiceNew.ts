
import { supabase } from "@/integrations/supabase/client";
import { log } from "@/utils/logging/userLogger";
import { CreateProfileAddress, UpdateProfileAddress } from "@/types/database";

export type AddressData = {
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  complement?: string;
};

export const saveUserAddressNew = async (userId: string, addressData: AddressData) => {
  log("info", "Saving user address", { userId, addressData });

  try {
    const { error } = await supabase
      .from("profile_addresses")
      .upsert({
        profile_id: userId,
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

export const getUserAddressNew = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profile_addresses")
      .select("*")
      .eq("profile_id", userId)
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

export const updateUserAddressNew = async (userId: string, addressData: UpdateProfileAddress) => {
  log("info", "Updating user address", { userId, addressData });

  try {
    const { error } = await supabase
      .from("profile_addresses")
      .update(addressData)
      .eq("profile_id", userId);

    if (error) {
      log("error", "Error updating address", error);
      throw new Error("Erro ao atualizar endereço: " + error.message);
    }

    log("info", "Address updated successfully", { userId });
    return true;
  } catch (error: any) {
    log("error", "Error in updateUserAddress function", error);
    throw error;
  }
};
