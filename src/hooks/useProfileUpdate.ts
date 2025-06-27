
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { removeMask } from "@/utils/masks";

export interface ProfileUpdateData {
  custom_id: string;
  full_name: string;
  person_type: string;
  cnpj: string;
  birth_date: string;
  mobile: string;
  whatsapp: string;
  secondary_whatsapp?: string | null;
  email: string;
  zip_code: string;
  address: string;
  address_number: string;
  neighborhood: string;
  complement?: string;
  state: string;
  city: string;
}

export const useProfileUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateClientProfile = async (profileId: string, updateData: ProfileUpdateData) => {
    console.log("Starting profile update with data:", updateData);
    
    // Atualizar tabela profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        custom_id: updateData.custom_id,
        full_name: updateData.full_name,
        person_type: updateData.person_type,
        cnpj: removeMask(updateData.cnpj),
        cpf: removeMask(updateData.cnpj),
        birth_date: updateData.birth_date,
        mobile: removeMask(updateData.mobile),
        whatsapp: removeMask(updateData.whatsapp),
        secondary_whatsapp: updateData.secondary_whatsapp ? removeMask(updateData.secondary_whatsapp) : null,
        email: updateData.email,
        updated_at: new Date().toISOString()
      })
      .eq("id", profileId);

    if (profileError) {
      console.error("Error updating profiles table:", profileError);
      throw new Error(`Erro ao atualizar perfil: ${profileError.message}`);
    }

    console.log("Profile table updated successfully");

    // Atualizar ou inserir endereço na tabela user_addresses
    const addressData = {
      user_id: profileId,
      cep: removeMask(updateData.zip_code),
      street: updateData.address.split(',')[0]?.trim() || updateData.address,
      number: updateData.address_number,
      neighborhood: updateData.neighborhood,
      city: updateData.city,
      state: updateData.state,
      complement: updateData.complement,
      updated_at: new Date().toISOString()
    };

    console.log("Updating address with data:", addressData);

    // Verificar se já existe um endereço para este usuário
    const { data: existingAddress, error: checkError } = await supabase
      .from("user_addresses")
      .select("id")
      .eq("user_id", profileId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking existing address:", checkError);
      throw new Error(`Erro ao verificar endereço: ${checkError.message}`);
    }

    if (existingAddress) {
      // Atualizar endereço existente
      const { error: addressError } = await supabase
        .from("user_addresses")
        .update(addressData)
        .eq("user_id", profileId);

      if (addressError) {
        console.error("Error updating address:", addressError);
        throw new Error(`Erro ao atualizar endereço: ${addressError.message}`);
      }
      console.log("Address updated successfully");
    } else {
      // Inserir novo endereço
      const { error: addressError } = await supabase
        .from("user_addresses")
        .insert({
          ...addressData,
          created_at: new Date().toISOString()
        });

      if (addressError) {
        console.error("Error inserting address:", addressError);
        throw new Error(`Erro ao inserir endereço: ${addressError.message}`);
      }
      console.log("Address inserted successfully");
    }
  };

  const handleProfileUpdate = async (profileId: string, data: ProfileUpdateData) => {
    console.log("Form submit started with data:", data);
    
    try {
      setIsLoading(true);
      console.log("Loading state set to true");
      
      const updateData = {
        custom_id: data.custom_id,
        full_name: data.full_name,
        person_type: data.person_type,
        cnpj: data.cnpj,
        birth_date: data.birth_date,
        mobile: data.mobile,
        whatsapp: data.whatsapp,
        secondary_whatsapp: data.secondary_whatsapp,
        email: data.email,
        zip_code: data.zip_code,
        address: data.address,
        address_number: data.address_number,
        neighborhood: data.neighborhood,
        complement: data.complement,
        state: data.state,
        city: data.city,
      };

      console.log("Calling updateClientProfile with:", { profileId, updateData });

      await updateClientProfile(profileId, updateData);
      
      console.log("Profile updated successfully, invalidating queries");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
      
      console.log("Success toast shown");
    } catch (error: any) {
      console.error("Error in form submission:", error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("Loading state set to false");
    }
  };

  return {
    isLoading,
    handleProfileUpdate
  };
};
