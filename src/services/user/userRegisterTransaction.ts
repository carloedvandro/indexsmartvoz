
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
  if (!isValidCPF(data.cpf_cnpj)) {
    throw new Error("CPF inválido");
  }
  if (!data.referred_code || data.referred_code.length < 3) {
    throw new Error("ID personalizado deve ter pelo menos 3 caracteres");
  }
  if (!data.full_name || data.full_name.trim().length < 2) {
    throw new Error("Nome completo é obrigatório");
  }
  if (!data.phone || data.phone.length < 10) {
    throw new Error("WhatsApp é obrigatório");
  }

  log("info", "Starting user registration via edge function", { 
    email: data.email, 
    customId: data.referred_code,
    hasSponsor: !!data.sponsor_Id
  });

  try {
    const payload = {
      email: data.email,
      password: data.password,
      full_name: data.full_name,
      cpf_cnpj: data.cpf_cnpj,
      phone: data.phone,
      birthDate: data.birthDate,
      person_type: "individual",
      referred_code: data.referred_code,
    };

    // Se tem patrocinador, buscar o ID do usuário
    if (data.sponsor_Id) {
      console.log("🔍 Buscando patrocinador:", data.sponsor_Id);
      const { data: sponsor, error: sponsorError } = await supabase
        .from('profiles')
        .select('id')
        .eq('referred_code', data.sponsor_Id)
        .single();

      if (sponsorError || !sponsor) {
        console.error("❌ Patrocinador não encontrado:", sponsorError);
        throw new Error("ID do patrocinador não encontrado. Verifique se o ID está correto.");
      }

      // Adicionar sponsor_id ao payload
      (payload as any).sponsor_id = sponsor.id;
      console.log("✅ Patrocinador encontrado:", sponsor.id);
    }

    console.log("🚀 Enviando dados para edge function criar-cliente:", {
      email: payload.email,
      referred_code: payload.referred_code,
      hasSponsor: !!(payload as any).sponsor_id
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
    
    // Aguardar um momento para garantir que o usuário foi criado completamente
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (loginError) {
      console.error("💥 Erro no login automático:", loginError);
      log("error", "Auto-login failed after registration", loginError);
      
      // Se o erro for de credenciais inválidas, pode ser que precise aguardar mais
      if (loginError.message.includes('Invalid login credentials')) {
        console.log("⏳ Tentando login novamente após aguardar...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const { data: retryLoginData, error: retryLoginError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (retryLoginError) {
          console.error("💥 Erro no segundo login automático:", retryLoginError);
          throw new Error("Cadastro realizado com sucesso! Faça login com suas credenciais.");
        }
        
        if (!retryLoginData.user) {
          throw new Error("Cadastro realizado com sucesso! Faça login com suas credenciais.");
        }
        
        console.log("✅ Login automático realizado com sucesso na segunda tentativa:", retryLoginData.user.id);
        
        return {
          ...result,
          user: retryLoginData.user,
          session: retryLoginData.session
        };
      }
      
      // Mesmo com erro no login, o cadastro foi realizado
      throw new Error("Cadastro realizado com sucesso! Faça login com suas credenciais.");
    }

    if (!loginData.user) {
      console.error("💥 Login automático não retornou usuário");
      throw new Error("Cadastro realizado com sucesso! Faça login com suas credenciais.");
    }


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
