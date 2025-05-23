
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
    cpf: data.cpf
  });

  try {
    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingEmail) {
      throw new Error("Email já está em uso. Por favor, use outro email ou faça login.");
    }

    // Check if CPF already exists
    const { data: existingCPF } = await supabase
      .from("profiles")
      .select("id")
      .eq("cpf", data.cpf)
      .single();

    if (existingCPF) {
      throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
    }

    // Check if custom ID already exists
    const { data: existingCustomId } = await supabase
      .from("profiles")
      .select("id")
      .eq("custom_id", data.customId)
      .single();

    if (existingCustomId) {
      throw new Error("ID personalizado já está em uso. Por favor, escolha outro ID.");
    }

    // Proceed with user creation
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
      if (signUpError.message.includes("already registered")) {
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }
      throw signUpError;
    }
    
    if (!authData.user) {
      throw new Error("Falha ao criar usuário");
    }

    // Get sponsor ID if provided
    let sponsorId = null;
    if (data.sponsorCustomId) {
      const { data: sponsor, error: sponsorError } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", data.sponsorCustomId)
        .single();

      if (sponsorError || !sponsor) {
        log("error", "Sponsor not found", { sponsorCustomId: data.sponsorCustomId });
        throw new Error("ID do patrocinador inválido ou não encontrado");
      }
      sponsorId = sponsor.id;
    }

    // Explicitly update profile with custom_id, CPF and sponsor
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        custom_id: data.customId,
        store_url: data.customId,
        cpf: data.cpf,
        sponsor_id: sponsorId
      })
      .eq("id", authData.user.id);

    if (updateError) {
      log("error", "Error updating profile with custom_id and CPF", updateError);
      throw new Error("Erro ao atualizar perfil: " + updateError.message);
    }

    log("info", "User created successfully", { 
      userId: authData.user.id,
      customId: data.customId,
      cpf: data.cpf
    });
    
    return authData;
  } catch (error: any) {
    log("error", "Error in createUser function", error);
    throw error;
  }
};
