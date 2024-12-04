import { supabase } from "@/integrations/supabase/client";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { checkExistingCpf } from "@/components/admin/UserFormUtils";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    console.log("Iniciando processo de registro com valores:", {
      ...values,
      password: '[PROTEGIDO]'
    });

    // Verificar CPF duplicado
    if (await checkExistingCpf(values.cpf)) {
      console.error("CPF já cadastrado:", values.cpf);
      throw new Error("Este CPF já está cadastrado no sistema");
    }

    let sponsorId = null;

    if (values.sponsorCustomId) {
      console.log("Buscando patrocinador com ID:", values.sponsorCustomId);
      
      const { data: sponsor, error: sponsorError } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", values.sponsorCustomId)
        .single();

      if (sponsorError) {
        console.error("Erro ao buscar patrocinador:", sponsorError);
        throw new Error("ID do patrocinador inválido");
      }

      sponsorId = sponsor.id;
      console.log("Patrocinador encontrado:", sponsorId);
    }

    // Verificar se o custom_id já existe
    console.log("Verificando disponibilidade do custom_id:", values.customId);
    const { data: existingCustomIds, error: customIdError } = await supabase
      .from("profiles")
      .select("id")
      .eq("custom_id", values.customId);

    if (customIdError) {
      console.error('Erro ao verificar custom_id:', customIdError);
      throw customIdError;
    }

    if (existingCustomIds && existingCustomIds.length > 0) {
      console.error('Custom ID já em uso:', values.customId);
      throw new Error("Este ID personalizado já está em uso");
    }

    console.log("Criando novo usuário no Supabase Auth...");
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          custom_id: values.customId,
          cpf: values.cpf,
          sponsor_id: sponsorId,
        },
      },
    });

    if (signUpError) {
      console.error('Erro no signup:', signUpError);
      if (signUpError.message.includes('already registered')) {
        throw new Error("Este email já está cadastrado");
      }
      throw signUpError;
    }

    if (!authData.user) {
      console.error('Nenhum usuário retornado após signup');
      throw new Error("Erro ao criar usuário");
    }

    console.log("Usuário criado com sucesso, atualizando perfil...");
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: values.fullName,
        custom_id: values.customId,
        sponsor_id: sponsorId,
        cpf: values.cpf,
      })
      .eq('id', authData.user.id);

    if (updateError) {
      console.error('Erro ao atualizar perfil:', updateError);
      throw updateError;
    }

    console.log("Registro concluído com sucesso!");
    return authData;
  };

  return { registerUser };
};