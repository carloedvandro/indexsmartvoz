import { supabase } from "@/integrations/supabase/client";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { checkExistingCpf } from "@/components/admin/UserFormUtils";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    // Verificar CPF duplicado
    if (await checkExistingCpf(values.cpf)) {
      throw new Error("Este CPF já está cadastrado no sistema");
    }

    let sponsorId = null;

    if (values.sponsorCustomId) {
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
    }

    // Verificar se o custom_id já existe
    const { data: existingCustomIds, error: customIdError } = await supabase
      .from("profiles")
      .select("id")
      .eq("custom_id", values.customId);

    if (customIdError) {
      console.error('Custom ID check error:', customIdError);
      throw customIdError;
    }

    if (existingCustomIds && existingCustomIds.length > 0) {
      throw new Error("Este ID personalizado já está em uso");
    }

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
      console.error('Signup error:', signUpError);
      if (signUpError.message.includes('already registered')) {
        throw new Error("Este email já está cadastrado");
      }
      throw signUpError;
    }

    if (!authData.user) {
      throw new Error("Erro ao criar usuário");
    }

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
      console.error('Profile update error:', updateError);
      throw updateError;
    }

    return authData;
  };

  return { registerUser };
};