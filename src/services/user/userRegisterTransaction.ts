
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

    console.log("🚀 Enviando dados para edge function registro-usuarios:", {
      email: payload.email,
      customId: payload.customId,
      hasSponsor: !!payload.sponsorCustomId,
      hasAddress: !!(payload.cep && payload.street && payload.city)
    });

    // Chamar a edge function registro-usuarios
    const { data: result, error } = await supabase.functions.invoke('registro-usuarios', {
      body: payload
    });

    if (error) {
      log("error", "Error calling registro-usuarios function", error);
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
    log("info", "User registration completed successfully via edge function", { 
      userId: result.user?.id,
      customId: data.customId
    });

    return result;

  } catch (error: any) {
    log("error", "Error in registerUserWithAddress function", error);
    console.error("💥 Erro na transação de cadastro:", error);
    throw error;
  }
};
