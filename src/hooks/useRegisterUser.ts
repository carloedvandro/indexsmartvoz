
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

      // First check for existing email in auth.users by attempting to get the user
      const { data: authUserData, error: authUserError } = await supabase.auth
        .signInWithPassword({
          email: values.email,
          password: "dummy-password-for-check" // This will fail but tell us if the email exists
        });

      // If we get no error or an error other than "Invalid login credentials", 
      // it means the email exists in auth system
      if (authUserError && !authUserError.message.includes("Invalid login credentials")) {
        console.error("Error checking auth.users:", authUserError);
      } else if (authUserData && authUserData.user) {
        console.error("Email already exists in auth.users table:", values.email);
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }

      // Verifique também na tabela profiles (dupla verificação)
      const { data: existingEmailCheck, error: emailCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", values.email);

      if (emailCheckError) {
        console.error("Error checking email in profiles:", emailCheckError);
      }

      if (existingEmailCheck && existingEmailCheck.length > 0) {
        console.error("Email already exists in profiles table", values.email);
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }

      // Check if CPF already exists
      if (values.cpf) {
        const cleanCpf = values.cpf.replace(/\D/g, '');
        console.log("Checking if CPF exists:", cleanCpf);
        
        const { data: existingCPF, error: cpfError } = await supabase
          .from("profiles")
          .select("id")
          .eq("cpf", cleanCpf);
          
        if (cpfError) {
          console.error("Error checking CPF:", cpfError);
        }

        if (existingCPF && existingCPF.length > 0) {
          throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
        }
      }

      // Check if custom ID already exists
      if (values.customId) {
        console.log("Checking if custom ID exists:", values.customId);
        
        const { data: existingCustomId, error: customIdError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.customId);
        
        if (customIdError) {
          console.error("Error checking custom ID:", customIdError);
        }

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
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError || !sponsor) {
          console.error("Sponsor verification error:", sponsorError);
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }
        sponsorId = sponsor.id;
        console.log("Found sponsor ID:", sponsorId);
      }

      // Now that all validations passed, create the user
      console.log("Creating user with metadata:", {
        custom_id: values.customId,
        cpf: values.cpf.replace(/\D/g, '') // Remove formatting
      });
      
      // Try to sign up the user with supabase auth
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
        // Check if the error message indicates a duplicate email
        if (authError.message.includes("already registered") || authError.message.includes("já existe")) {
          throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
        }
        throw new Error(authError.message);
      }

      if (!authData.user) {
        console.error("No user data returned");
        throw new Error("Erro ao criar usuário");
      }

      // Explicitly update profile with all data including CPF and set verification status to verified by default
      console.log("Updating profile with data:", {
        custom_id: values.customId,
        store_url: values.customId,
        sponsor_id: sponsorId,
        cpf: values.cpf.replace(/\D/g, ''), // Remove formatting
        whatsapp: values.whatsapp,
        secondary_whatsapp: values.secondaryWhatsapp || null,
        birth_date: values.birthDate,
        facial_verification_status: 'verified',
        document_verification_status: 'verified',
        verification_completed_at: new Date().toISOString()
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
          birth_date: values.birthDate,
          facial_verification_status: 'verified',
          document_verification_status: 'verified',
          verification_completed_at: new Date().toISOString()
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
