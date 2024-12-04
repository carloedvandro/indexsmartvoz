import { supabase } from "@/integrations/supabase/client";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";
import { checkExistingCpf, checkExistingUser } from "@/components/admin/UserFormUtils";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    try {
      console.log("Iniciando verificações de usuário existente...");
      
      // Check for existing email/CPF
      const [emailExists, cpfExists] = await Promise.all([
        checkExistingUser(values.email),
        checkExistingCpf(values.cpf)
      ]);

      if (emailExists) {
        throw new Error("Este email já está cadastrado");
      }

      if (cpfExists) {
        throw new Error("Este CPF já está cadastrado");
      }

      console.log("Verificando patrocinador...");
      let sponsorId = null;

      if (values.sponsorCustomId) {
        const { data: sponsor, error: sponsorError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError || !sponsor) {
          console.error("Erro ao buscar patrocinador:", sponsorError);
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }

        sponsorId = sponsor.id;
        console.log("Patrocinador encontrado:", sponsorId);
      }

      // Verify if custom_id is available
      console.log("Verificando disponibilidade do ID personalizado...");
      const { data: existingCustomId, error: customIdError } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", values.customId)
        .single();

      if (existingCustomId) {
        throw new Error("Este ID personalizado já está em uso");
      }

      if (customIdError && customIdError.code !== 'PGRST116') {
        console.error("Erro ao verificar ID personalizado:", customIdError);
        throw new Error("Erro ao verificar disponibilidade do ID personalizado");
      }

      console.log("Criando usuário no Supabase Auth...");
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
        console.error("Erro no signup:", signUpError);
        throw new Error(signUpError.message);
      }

      if (!authData.user) {
        console.error("Nenhum usuário retornado após signup");
        throw new Error("Erro ao criar usuário");
      }

      console.log("Usuário criado com sucesso:", authData.user.id);
      return authData;

    } catch (error: any) {
      console.error("Erro durante o processo de registro:", error);
      throw error;
    }
  };

  return { registerUser };
};