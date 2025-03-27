
import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/utils/validation/emailValidation";
import { validateCPF as isValidCPF } from "@/utils/validation/cpfValidation";
import { log } from "@/utils/logging/userLogger";

export const checkExistingUser = async (email: string): Promise<boolean> => {
  if (!isValidEmail(email)) {
    throw new Error("Email inválido");
  }

  log("info", "Checking for existing user", { email });
  
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST204") {
    log("error", "Error checking existing user", error);
    throw error;
  }

  return !!data;
};

export const checkExistingCpf = async (cpf: string): Promise<boolean> => {
  if (!isValidCPF(cpf)) {
    throw new Error("CPF inválido. Deve conter 11 dígitos numéricos.");
  }

  log("info", "Checking for existing CPF", { cpf });
  
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("cpf", cpf)
    .single();

  if (error && error.code !== "PGRST204") {
    log("error", "Error checking existing CPF", error);
    throw error;
  }

  return !!data;
};

export const checkExistingCustomId = async (customId: string): Promise<boolean> => {
  if (!customId || customId.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres.");
  }

  log("info", "Checking for existing custom ID", { customId });
  
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("custom_id", customId)
    .single();

  if (error && error.code !== "PGRST204") {
    log("error", "Error checking existing custom ID", error);
    throw error;
  }

  return !!data;
};
