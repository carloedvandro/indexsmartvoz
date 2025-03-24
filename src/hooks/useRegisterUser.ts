
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData } from "@/components/client/register/RegisterSchema";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    try {
      console.log("Starting registration with values:", {
        ...values,
        password: "[PROTECTED]",
        customId: values.customId,
        cpf: values.cpf.replace(/\D/g, '') // Ensure we're using the raw CPF value without formatting
      });

      // Check if email already exists by querying the auth API directly instead of profiles
      // This gives us a more accurate check for existing users
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: "temporary-check-password-123456789",
      });

      // If there's no error or error is NOT "Invalid login credentials", the email exists
      if (!signInError || (signInError && !signInError.message.includes("Invalid login credentials"))) {
        console.error("Email already exists in auth");
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }

      // Check if email exists in profiles (backup check)
      const { data: emailCheckResult } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", values.email);
      
      if (emailCheckResult && emailCheckResult.length > 0) {
        console.error("Email already exists in profiles");
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }

      // Check if CPF already exists
      if (values.cpf) {
        const cleanCpf = values.cpf.replace(/\D/g, '');
        console.log("Checking if CPF exists:", cleanCpf);
        const { data: existingCPF } = await supabase
          .from("profiles")
          .select("id")
          .eq("cpf", cleanCpf);

        if (existingCPF && existingCPF.length > 0) {
          throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
        }
      }

      // Check if custom ID already exists
      if (values.customId) {
        console.log("Checking if custom ID exists:", values.customId);
        const { data: existingCustomId } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.customId);

        if (existingCustomId && existingCustomId.length > 0) {
          throw new Error("ID personalizado já está em uso. Por favor, escolha outro ID.");
        }
      }

      // Verify sponsor if provided
      let sponsorId = null;
      if (values.sponsorCustomId) {
        console.log("Verifying sponsor with custom ID:", values.sponsorCustomId);
        const { data: sponsor, error: sponsorError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.sponsorCustomId);

        if (sponsorError) {
          console.error("Sponsor verification error:", sponsorError);
          throw new Error("Erro ao verificar o patrocinador: " + sponsorError.message);
        }
        
        if (!sponsor || sponsor.length === 0) {
          console.error("Sponsor not found");
          throw new Error("ID do patrocinador não encontrado. Verifique e tente novamente.");
        }
        
        sponsorId = sponsor[0].id;
        console.log("Found sponsor ID:", sponsorId);
      }

      // Create user
      console.log("Creating user with metadata:", {
        custom_id: values.customId,
        cpf: values.cpf.replace(/\D/g, '') // Remove formatting
      });
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            custom_id: values.customId,
            cpf: values.cpf.replace(/\D/g, ''), // Remove formatting
            sponsor_id: sponsorId,
          },
        },
      });

      if (authError) {
        console.error("Auth error:", authError);
        throw new Error("Erro ao criar usuário: " + authError.message);
      }

      if (!authData.user) {
        console.error("No user data returned");
        throw new Error("Erro ao criar usuário");
      }

      // Explicitly update profile with all data including CPF
      console.log("Updating profile with data:", {
        custom_id: values.customId,
        store_url: values.customId,
        sponsor_id: sponsorId,
        cpf: values.cpf.replace(/\D/g, ''), // Remove formatting
        whatsapp: values.whatsapp,
        secondary_whatsapp: values.secondaryWhatsapp || null,
        birth_date: values.birthDate
      });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          custom_id: values.customId,
          store_url: values.customId,
          sponsor_id: sponsorId,
          cpf: values.cpf.replace(/\D/g, ''), // Remove formatting
          whatsapp: values.whatsapp,
          secondary_whatsapp: values.secondaryWhatsapp || null,
          birth_date: values.birthDate
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw new Error("Erro ao atualizar perfil: " + updateError.message);
      }

      console.log("User registration completed successfully:", {
        userId: authData.user.id,
        customId: values.customId,
        cpf: values.cpf.replace(/\D/g, '') // Show clean CPF in logs
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
