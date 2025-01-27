import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/utils/validation/emailValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { log } from "@/utils/logging/userLogger";

export type CreateUserData = {
  email: string;
  password: string;
  fullName: string;
  cpf: string;
  customId: string;
  sponsorCustomId?: string;
};

export const createUser = async (data: CreateUserData) => {
  // Validate input data
  if (!isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (!isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }
  if (!data.customId || data.customId.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres");
  }

  log("info", "Creating new user", { 
    email: data.email, 
    fullName: data.fullName,
    customId: data.customId,
    cpf: data.cpf // Log CPF
  });

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
        custom_id: data.customId,
        cpf: data.cpf,
      },
    },
  });

  if (signUpError) {
    log("error", "Error creating user", signUpError);
    throw signUpError;
  }
  
  if (!authData.user) {
    throw new Error("Falha ao criar usuário");
  }

  // Explicitly update profile with custom_id and CPF
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      custom_id: data.customId,
      store_url: data.customId,
      cpf: data.cpf
    })
    .eq("id", authData.user.id);

  if (updateError) {
    log("error", "Error updating profile with custom_id and CPF", updateError);
    throw new Error("Erro ao atualizar perfil com ID personalizado e CPF");
  }

  log("info", "User created successfully", { 
    userId: authData.user.id,
    customId: data.customId,
    cpf: data.cpf
  });
  
  return authData;
};