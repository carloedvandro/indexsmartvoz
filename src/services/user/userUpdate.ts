
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/utils/validation/emailValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { log } from "@/utils/logging/userLogger";

export type UpdateProfileData = Partial<{
  full_name: string;
  cpf: string;
  custom_id: string;
  store_url: string;
  email: string;
  status: string;
  document_id: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  agency_number: string;
  agency_digit: string;
  account_digit: string;
  account_type: string;
  cpf_cnpj: string;
  security_password: string;
}>;

export const updateProfile = async (id: string, data: UpdateProfileData) => {
  // Check if user exists before proceeding
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", id)
    .single();

  if (fetchError || !existingProfile) {
    log("error", "User profile does not exist", { id, error: fetchError });
    throw new Error("Perfil de usuário não encontrado");
  }

  // Validate critical fields if present
  if (data.email && !isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (data.cpf && !isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }

  log("info", "Updating profile", { id, data });

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", id);

  if (error) {
    log("error", "Error updating profile", { id, error });
    throw error;
  }

  log("info", "Profile updated successfully", { id });
};
