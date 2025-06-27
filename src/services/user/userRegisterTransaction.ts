
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { log } from "@/utils/logging/userLogger";
import { isValidEmail } from "@/utils/validation/emailValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";

export const registerUserWithAddress = async (data: RegisterFormData) => {
  // Validações iniciais
  if (!isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (!isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }
  if (!data.customId || data.customId.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres");
  }

  log("info", "Starting user registration transaction", { 
    email: data.email, 
    customId: data.customId 
  });

  try {
    // 1. PRIMEIRO: Verificar se email já existe
    const { data: existingEmail } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingEmail) {
      throw new Error("Email já está em uso. Por favor, use outro email ou faça login.");
    }

    // 2. SEGUNDO: Verificar se CPF já existe
    const { data: existingCPF } = await supabase
      .from("profiles")
      .select("id")
      .eq("cpf", data.cpf)
      .single();

    if (existingCPF) {
      throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
    }

    // 3. TERCEIRO: Verificar se custom ID já existe
    const { data: existingCustomId } = await supabase
      .from("profiles")
      .select("id")
      .eq("custom_id", data.customId)
      .single();

    if (existingCustomId) {
      throw new Error("ID personalizado já está em uso. Por favor, escolha outro ID.");
    }

    // 4. QUARTO: Verificar se o patrocinador existe (ANTES de criar o usuário)
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

    // 5. AGORA SIM: Criar usuário no Supabase Auth (só depois de todas as validações)
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
      log("error", "Error creating user in auth", signUpError);
      if (signUpError.message.includes("already registered")) {
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }
      throw new Error("Erro ao criar usuário: " + signUpError.message);
    }

    if (!authData.user) {
      throw new Error("Falha ao criar usuário");
    }

    const userId = authData.user.id;
    log("info", "User created in auth", { userId });

    try {
      // 6. Atualizar perfil com dados completos
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          custom_id: data.customId,
          store_url: data.customId,
          cpf: data.cpf,
          sponsor_id: sponsorId,
          whatsapp: data.whatsapp,
          secondary_whatsapp: data.secondaryWhatsapp,
          birth_date: data.birthDate
        })
        .eq("id", userId);

      if (updateError) {
        log("error", "Error updating profile", updateError);
        throw new Error("Erro ao atualizar perfil: " + updateError.message);
      }

      log("info", "Profile updated successfully", { userId });

      // 7. Salvar endereço
      const { error: addressError } = await supabase
        .from("user_addresses")
        .insert({
          user_id: userId,
          cep: data.cep,
          street: data.street,
          neighborhood: data.neighborhood,
          number: data.number,
          city: data.city,
          state: data.state,
          complement: data.complement || null,
        });

      if (addressError) {
        log("error", "Error saving address", addressError);
        throw new Error("Erro ao salvar endereço: " + addressError.message);
      }

      log("info", "Address saved successfully", { userId });
      log("info", "User registration transaction completed successfully", { userId });

      return authData;

    } catch (error) {
      // Se houve erro após criar o usuário, tentar deletar o usuário criado
      log("error", "Error in post-creation steps, attempting cleanup", { userId, error });
      
      try {
        await supabase.auth.admin.deleteUser(userId);
        log("info", "User cleanup completed", { userId });
      } catch (cleanupError) {
        log("error", "Failed to cleanup user after error", { userId, cleanupError });
      }
      
      throw error;
    }

  } catch (error: any) {
    log("error", "Error in registerUserWithAddress function", error);
    throw error;
  }
};
