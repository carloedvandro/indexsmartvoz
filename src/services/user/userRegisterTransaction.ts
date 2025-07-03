
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

  log("info", "Starting user registration via edge function", { 
    email: data.email, 
    customId: data.customId,
    hasSponsor: !!data.sponsorCustomId
  });

  try {
    // Preparar payload para a edge function
    const payload = {
      email: data.email,
      password: data.password,
      full_name: data.fullName,
      cpf: data.cpf,
      phone: data.whatsapp,
      mobile: data.whatsapp,
      whatsapp: data.whatsapp,
      secondary_whatsapp: data.secondaryWhatsapp || "",
      birth_date: data.birthDate,
      person_type: "individual",
      document_id: data.cpf,
      address: `${data.street}, ${data.number}`,
      city: data.city,
      state: data.state,
      country: "Brasil",
      zip_code: data.cep,
      gender: "not_specified",
      civil_status: "not_specified",
      status: "active",
      custom_id: data.customId
    };

    // Se tem patrocinador, buscar o ID do usuário
    if (data.sponsorCustomId) {
      console.log("🔍 Buscando patrocinador:", data.sponsorCustomId);
      const { data: sponsor, error: sponsorError } = await supabase
        .from('profiles')
        .select('id')
        .eq('custom_id', data.sponsorCustomId)
        .single();

      if (sponsorError || !sponsor) {
        console.error("❌ Patrocinador não encontrado:", sponsorError);
        throw new Error("ID do patrocinador não encontrado. Verifique se o ID está correto.");
      }

      // Adicionar sponsor_id ao payload
      payload.sponsor_id = sponsor.id;
      console.log("✅ Patrocinador encontrado:", sponsor.id);
    }

    console.log("🚀 Enviando dados para edge function criar-cliente:", {
      email: payload.email,
      custom_id: payload.custom_id,
      hasSponsor: !!payload.sponsor_id,
      hasAddress: !!(payload.zip_code && payload.address && payload.city)
    });

    // Chamar a edge function criar-cliente
    const { data: result, error } = await supabase.functions.invoke('criar-cliente', {
      body: payload
    });

    console.log("📋 Resposta da edge function:", { result, error });

    // Verificar se houve erro na chamada da função
    if (error) {
      console.error("💥 Erro na chamada da edge function:", error);
      
      // Tentar extrair mensagem de erro mais específica
      let errorMessage = "Erro ao processar cadastro";
      
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Melhorar mensagens de erro conhecidas
      if (errorMessage.includes('already registered') || errorMessage.includes('já está cadastrado')) {
        errorMessage = "Este email já possui uma conta. Faça login ou use a recuperação de senha.";
      } else if (errorMessage.includes('Invalid email') || errorMessage.includes('email inválido')) {
        errorMessage = "Email inválido. Verifique o formato do email.";
      } else if (errorMessage.includes('CPF') && errorMessage.includes('já está')) {
        errorMessage = "Este CPF já está cadastrado no sistema.";
      } else if (errorMessage.includes('custom_id') && errorMessage.includes('já está')) {
        errorMessage = "Este ID personalizado já está em uso. Escolha outro ID.";
      }
      
      throw new Error(errorMessage);
    }

    // Verificar se a resposta indica sucesso
    if (!result || !result.success) {
      const errorMessage = result?.error || result?.message || "Erro desconhecido no cadastro";
      console.error("💥 Cadastro falhou:", errorMessage);
      
      // Melhorar mensagens de erro da edge function
      let friendlyError = errorMessage;
      
      if (errorMessage.includes('Email já está em uso')) {
        friendlyError = "Este email já possui uma conta. Faça login ou use a recuperação de senha.";
      } else if (errorMessage.includes('CPF já está cadastrado')) {
        friendlyError = "Este CPF já está cadastrado no sistema.";
      } else if (errorMessage.includes('ID personalizado já está em uso')) {
        friendlyError = "Este ID personalizado já está em uso. Escolha outro ID.";
      } else if (errorMessage.includes('ID do patrocinador inválido')) {
        friendlyError = "ID do patrocinador não encontrado. Verifique se o ID está correto.";
      } else if (errorMessage.includes('dados obrigatórios ausentes')) {
        friendlyError = "Alguns dados obrigatórios estão ausentes. Verifique todos os campos.";
      } else if (errorMessage.includes('Configuração do servidor incompleta')) {
        friendlyError = "Erro interno do servidor. Tente novamente em alguns minutos.";
      }
      
      throw new Error(friendlyError);
    }

    console.log("✅ Cadastro realizado com sucesso via edge function:", result);

    // IMPORTANTE: Fazer login automático após cadastro bem-sucedido
    console.log("🔐 Fazendo login automático após cadastro...");
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (loginError) {
      console.error("💥 Erro no login automático:", loginError);
      log("error", "Auto-login failed after registration", loginError);
      
      // Mesmo com erro no login, o cadastro foi realizado
      throw new Error("Cadastro realizado com sucesso, mas houve erro no login automático. Tente fazer login manualmente.");
    }

    if (!loginData.user) {
      console.error("💥 Login automático não retornou usuário");
      throw new Error("Cadastro realizado com sucesso, mas houve erro no login automático. Tente fazer login manualmente.");
    }

    console.log("✅ Login automático realizado com sucesso:", loginData.user.id);
    log("info", "User registration and auto-login completed successfully", { 
      userId: loginData.user.id,
      customId: data.customId
    });

    return {
      ...result,
      user: loginData.user,
      session: loginData.session
    };

  } catch (error: any) {
    log("error", "Error in registerUserWithAddress function", error);
    console.error("💥 Erro na transação de cadastro:", error);
    
    // Não alterar a mensagem se já for uma mensagem amigável
    throw error;
  }
};
