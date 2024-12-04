import { supabase } from "@/integrations/supabase/client";
import type { RegisterFormData } from "@/components/client/register/RegisterSchema";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    try {
      console.log("Starting registration process...");

      // Check for existing email
      const { data: existingEmail } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", values.email)
        .single();

      if (existingEmail) {
        throw new Error("Este email já está cadastrado");
      }

      // Check for existing CPF
      const { data: existingCPF } = await supabase
        .from("profiles")
        .select("id")
        .eq("cpf", values.cpf)
        .single();

      if (existingCPF) {
        throw new Error("Este CPF já está cadastrado");
      }

      // Check for existing custom ID
      const { data: existingCustomId } = await supabase
        .from("profiles")
        .select("id")
        .eq("custom_id", values.customId)
        .single();

      if (existingCustomId) {
        throw new Error("Este ID personalizado já está em uso");
      }

      // Verify sponsor if provided
      let sponsorId = null;
      if (values.sponsorCustomId) {
        const { data: sponsor, error: sponsorError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError || !sponsor) {
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }
        sponsorId = sponsor.id;
      }

      console.log("Creating user in Supabase Auth...");
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
        console.error("Signup error:", signUpError);
        throw new Error(signUpError.message);
      }

      if (!authData.user) {
        throw new Error("Erro ao criar usuário");
      }

      console.log("User created successfully:", authData.user.id);
      return authData;

    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return { registerUser };
};