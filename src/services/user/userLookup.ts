
import { supabase } from "@/integrations/supabase/client";

/**
 * Busca informações do usuário pelo CPF
 * @param cpf CPF do usuário (apenas números)
 * @returns Dados do usuário (nome, data de nascimento, etc.) ou null se não encontrado
 */
export const getUserByCPF = async (cpf: string) => {
  try {
    // Verificar se o CPF está no formato correto (apenas números)
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) {
      return null;
    }
    
    // Buscar o usuário pelo CPF no banco de dados
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, birth_date, cpf")
      .eq("cpf", cleanCPF)
      .maybeSingle();
    
    if (error) {
      console.error("Erro ao buscar usuário por CPF:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar usuário por CPF:", error);
    return null;
  }
};
