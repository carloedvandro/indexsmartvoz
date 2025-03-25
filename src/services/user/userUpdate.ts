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
}>;

export const updateProfile = async (id: string, data: UpdateProfileData) => {
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
