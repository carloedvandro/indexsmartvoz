
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { log } from "@/utils/logging/userLogger";
import { isValidEmail } from "@/utils/validation/emailValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";

export const registerUserWithAddress = async (data: RegisterFormData) => {
  // Validações iniciais mais rigorosas
  if (!isValidEmail(data.email)) {
    throw new Error("Email inválido");
  }
  if (!isValidCPF(data.cpf)) {
    throw new Error("CPF inválido");
  }
  if (!data.customId || data.customId.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres");
  }
  if (!data.fullName || data.fullName.trim().length < 2) {
    throw new Error("Nome completo é obrigatório");
  }
  if (!data.whatsapp || data.whatsapp.length < 10) {
    throw new Error("WhatsApp é obrigatório");
  }

  log("info", "Starting complete user registration transaction", { 
    email: data.email, 
    customId: data.customId,
    hasSponsor: !!data.sponsorCustomId
  });

  try {
    // 1. Verificar se email já existe
    console.log("🔍 Verificando se email já existe...");
    const { data: existingEmail } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email)
      .maybeSingle(); // Usar maybeSingle() ao invés de single()

    if (existingEmail) {
      throw new Error("Email já está em uso. Por favor, use outro email ou faça login.");
    }

    // 2. Verificar se CPF já existe
    console.log("🔍 Verificando se CPF já existe...");
    const { data: existingCPF } = await supabase
      .from("profiles")
      .select("id")
      .eq("cpf", data.cpf)
      .maybeSingle();

    if (existingCPF) {
      throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
    }

    // 3. Verificar se custom ID já existe
    console.log("🔍 Verificando se custom ID já existe...");
    const { data: existingCustomId } = await supabase
      .from("profiles")
      .select("id")
      .eq("custom_id", data.customId)
      .maybeSingle();

    if (existingCustomId) {
      throw new Error("ID personalizado já está em uso. Por favor, escolha outro ID.");
    }

    // 4. Verificar se o patrocinador existe (se fornecido)
    let sponsorId = null;
    if (data.sponsorCustomId && data.sponsorCustomId.trim()) {
      console.log("🔍 Verificando patrocinador...");
      const { data: sponsor, error: sponsorError } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", data.sponsorCustomId.trim())
        .maybeSingle();

      if (sponsorError) {
        log("error", "Error checking sponsor", sponsorError);
        throw new Error("Erro ao verificar patrocinador");
      }
      
      if (!sponsor) {
        log("error", "Sponsor not found", { sponsorCustomId: data.sponsorCustomId });
        throw new Error("ID do patrocinador não encontrado");
      }
      
      sponsorId = sponsor.id;
      console.log("✅ Patrocinador encontrado:", sponsorId);
    }

    // 5. Criar usuário no Supabase Auth
    console.log("👤 Criando usuário no Auth...");
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
      throw new Error("Falha ao criar usuário - dados não retornados");
    }

    const userId = authData.user.id;
    console.log("✅ Usuário criado no Auth:", userId);

    // 6. Atualizar perfil com dados completos
    console.log("📝 Atualizando perfil...");
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: data.fullName,
        custom_id: data.customId,
        store_url: data.customId,
        cpf: data.cpf,
        sponsor_id: sponsorId,
        whatsapp: data.whatsapp,
        secondary_whatsapp: data.secondaryWhatsapp || null,
        birth_date: data.birthDate,
        email: data.email,
        role: 'client',
        status: 'active'
      })
      .eq("id", userId);

    if (updateError) {
      log("error", "Error updating profile", updateError);
      throw new Error("Erro ao atualizar perfil: " + updateError.message);
    }

    console.log("✅ Perfil atualizado com sucesso");

    // 7. Salvar endereço
    console.log("🏠 Salvando endereço...");
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

    console.log("✅ Endereço salvo com sucesso");
    
    log("info", "Complete user registration transaction completed successfully", { 
      userId,
      customId: data.customId,
      hasSponsor: !!sponsorId
    });

    return authData;

  } catch (error: any) {
    log("error", "Error in registerUserWithAddress function", error);
    console.error("💥 Erro na transação de cadastro:", error);
    throw error;
  }
};
