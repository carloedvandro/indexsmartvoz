
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

      // Check if email already exists using auth API
      // We'll check directly in the profiles table instead of using the admin API
      // as the admin.listUsers with filters isn't available in the client library
      const { data: existingUser, error: emailCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", values.email)
        .single();
      
      if (emailCheckError && emailCheckError.code !== 'PGRST116') {
        console.error("Error checking existing user:", emailCheckError);
        // Continue with registration if there's an error checking user
        // This is safer than blocking registration due to a check error
      } else if (existingUser) {
        console.log("Email already exists:", values.email);
        throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
      }

      // Check if CPF already exists
      if (values.cpf) {
        const cleanCpf = values.cpf.replace(/\D/g, '');
        console.log("Checking if CPF exists:", cleanCpf);
        const { data: existingCPF, error: cpfError } = await supabase
          .from("profiles")
          .select("id")
          .eq("cpf", cleanCpf)
          .single();

        if (cpfError && cpfError.code !== 'PGRST116') {
          console.error("Error checking CPF:", cpfError);
        } else if (existingCPF) {
          console.log("CPF already exists:", cleanCpf);
          throw new Error("CPF já está cadastrado. Utilize outro CPF ou faça login.");
        }
      }

      // Check if custom ID already exists
      if (values.customId) {
        console.log("Checking if custom ID exists:", values.customId);
        const { data: existingCustomId, error: customIdError } = await supabase
          .from("profiles")
          .select("id")
          .eq("custom_id", values.customId)
          .single();

        if (customIdError && customIdError.code !== 'PGRST116') {
          console.error("Error checking custom ID:", customIdError);
        } else if (existingCustomId) {
          console.log("Custom ID already exists:", values.customId);
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

        if (sponsorError && sponsorError.code !== 'PGRST116') {
          console.error("Sponsor verification error:", sponsorError);
        }
        
        if (!sponsor) {
          console.error("Sponsor not found:", values.sponsorCustomId);
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }
        
        sponsorId = sponsor.id;
        console.log("Found sponsor ID:", sponsorId);
      }

      // Format phone numbers consistently - remove any non-numeric characters
      const formattedWhatsapp = values.whatsapp ? values.whatsapp.replace(/\D/g, '') : '';
      const formattedSecondaryWhatsapp = values.secondaryWhatsapp ? values.secondaryWhatsapp.replace(/\D/g, '') : null;

      // Create user with custom_id and CPF in metadata
      console.log("Creating user with metadata:", {
        custom_id: values.customId,
        cpf: values.cpf.replace(/\D/g, '') // Remove formatting
      });
      
      // Attempt user creation with Supabase Auth
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
        if (authError.message.includes("already registered")) {
          throw new Error("Email já está cadastrado. Por favor faça login ou use recuperação de senha.");
        }
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
        whatsapp: formattedWhatsapp,
        secondary_whatsapp: formattedSecondaryWhatsapp,
        birth_date: values.birthDate
      });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          custom_id: values.customId,
          store_url: values.customId,
          sponsor_id: sponsorId,
          cpf: values.cpf.replace(/\D/g, ''), // Remove formatting
          whatsapp: formattedWhatsapp,
          secondary_whatsapp: formattedSecondaryWhatsapp,
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
