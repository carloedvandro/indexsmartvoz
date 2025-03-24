
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormData } from "@/components/client/register/RegisterSchema";

export const useRegisterUser = () => {
  const registerUser = async (values: RegisterFormData) => {
    try {
      console.log("Starting registration with values:", {
        ...values,
        password: "[PROTECTED]",
        customId: values.customId,
        cpf: values.cpf, // Log CPF value
        sponsorCustomId: values.sponsorCustomId // Log sponsor custom ID
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
        console.log("Checking if CPF exists:", values.cpf);
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
          .select("id, custom_id")
          .eq("custom_id", values.sponsorCustomId)
          .single();

        if (sponsorError || !sponsor) {
          console.error("Sponsor verification error:", sponsorError);
          throw new Error("ID do patrocinador inválido ou não encontrado");
        }
        sponsorId = sponsor.id;
        console.log("Found sponsor ID:", sponsorId);
      }

      // Create user with custom_id and CPF in metadata
      console.log("Creating user with metadata:", {
        custom_id: values.customId,
        cpf: values.cpf,
        sponsor_id: sponsorId
      });
      
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

      // Explicitly update profile with all data including CPF and sponsor_id
      console.log("Updating profile with data:", {
        custom_id: values.customId,
        store_url: values.customId,
        sponsor_id: sponsorId,
        cpf: values.cpf
      });

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          custom_id: values.customId,
          store_url: values.customId,
          sponsor_id: sponsorId,
          cpf: values.cpf 
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw new Error("Erro ao atualizar perfil");
      }

      // Ensure the network entry is created
      if (sponsorId) {
        await createNetworkEntry(authData.user.id, sponsorId);
      }

      console.log("User registration completed successfully:", {
        userId: authData.user.id,
        customId: values.customId,
        cpf: values.cpf,
        sponsorId: sponsorId
      });
      
      return authData;

    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Helper function to create network entry
  const createNetworkEntry = async (userId: string, sponsorId: string) => {
    try {
      // Get sponsor's network ID
      const { data: sponsorNetwork, error: sponsorNetworkError } = await supabase
        .from("network")
        .select("id")
        .eq("user_id", sponsorId)
        .single();

      if (sponsorNetworkError || !sponsorNetwork) {
        console.error("Error fetching sponsor network:", sponsorNetworkError);
        return;
      }

      // Create network entry for the new user
      const { data: userNetwork, error: userNetworkError } = await supabase
        .from("network")
        .insert({
          user_id: userId,
          parent_id: sponsorNetwork.id,
          level: 2  // Direct child of sponsor
        })
        .select();

      if (userNetworkError) {
        console.error("Error creating network entry:", userNetworkError);
      } else {
        console.log("Network entry created successfully:", userNetwork);
      }
    } catch (error) {
      console.error("Error in createNetworkEntry:", error);
    }
  };

  return {
    registerUser,
  };
};
