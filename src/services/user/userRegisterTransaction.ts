
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
      fullName: data.fullName,
      cpf: data.cpf,
      customId: data.customId,
      sponsorCustomId: data.sponsorCustomId || "",
      whatsapp: data.whatsapp,
      secondaryWhatsapp: data.secondaryWhatsapp || "",
      birthDate: data.birthDate,
      cep: data.cep,
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number,
      city: data.city,
      state: data.state,
      complement: data.complement || ""
    };

    console.log("🚀 Enviando dados para edge function Registro-Usuarios:", {
      email: payload.email,
      customId: payload.customId,
      hasSponsor: !!payload.sponsorCustomId,
      hasAddress: !!(payload.cep && payload.street && payload.city)
    });

    // Chamar a edge function Registro-Usuarios (com R maiúsculo)
    const { data: result, error } = await supabase.functions.invoke('Registro-Usuarios', {
      body: payload
    });

    if (error) {
      log("error", "Error calling Registro-Usuarios function", error);
      console.error("💥 Erro na edge function:", error);
      throw new Error(error.message || "Erro ao processar cadastro");
    }

    if (!result || !result.success) {
      const errorMessage = result?.error || "Erro desconhecido no cadastro";
      log("error", "Registration failed", { error: errorMessage });
      console.error("💥 Cadastro falhou:", errorMessage);
      throw new Error(errorMessage);
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
      throw new Error("Cadastro realizado mas erro no login automático: " + loginError.message);
    }

    if (!loginData.user) {
      console.error("💥 Login automático não retornou usuário");
      throw new Error("Cadastro realizado mas erro no login automático");
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
    throw error;
  }
};
