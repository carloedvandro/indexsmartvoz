import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData } from "@/components/client/register/RegisterSchema";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    try {
      console.log("Starting user registration process with values:", {
        ...values,
        password: "[PROTECTED]",
        customId: values.customId,
      });

      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", values.email)
        .single();

      if (existingEmail) {
        throw new Error("Email já cadastrado");
      }

      // Check if CPF already exists
      if (values.cpf) {
        const { data: existingCPF } = await supabase
          .from("profiles")
          .select("id")
          .eq("cpf", values.cpf)
          .single();

        if (existingCPF) {
          throw new Error("CPF já cadastrado");
        }
      }

      // Check if custom ID already exists
      if (values.customId) {
        console.log("Checking if custom ID exists:", values.customId);
        const { data: existingCustomId } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.customId)
          .single();

        if (existingCustomId) {
          throw new Error("ID personalizado já está em uso");
        }
      }

      // Verify sponsor if provided
      let sponsorId = null;
      if (values.sponsorCustomId) {
        console.log("Verifying sponsor with custom ID:", values.sponsorCustomId);
        const { data: sponsor, error: sponsorError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError || !sponsor) {
          console.error("Sponsor verification error:", sponsorError);
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }
        sponsorId = sponsor.id;
        console.log("Found sponsor ID:", sponsorId);
      }

      console.log("Creating user in Supabase Auth with custom_id:", values.customId);
      const { data: authData, error: authError } = await supabase.auth.signUp({
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

      if (authError) {
        console.error("Auth error:", authError);
        throw new Error("Erro ao criar usuário");
      }

      if (!authData.user) {
        console.error("No user data returned");
        throw new Error("Erro ao criar usuário");
      }

      // Update the profile with additional data
      console.log("Updating profile with data:", {
        sponsor_id: sponsorId,
        custom_id: values.customId,
        store_url: values.customId,
      });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          sponsor_id: sponsorId,
          custom_id: values.customId,
          store_url: values.customId,
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw new Error("Erro ao atualizar perfil");
      }

      console.log("User created successfully:", {
        userId: authData.user.id,
        customId: values.customId,
      });
      
      return authData;

    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return {
    registerUser,
  };
};