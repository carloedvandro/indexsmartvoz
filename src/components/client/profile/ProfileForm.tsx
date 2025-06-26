
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalDataSection } from "./personal-data/PersonalDataSection";
import { ContactSection } from "./ContactSection";
import { AddressSection } from "./AddressSection";
import { ProfileWithSponsor } from "@/types/profile";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { removeMask } from "@/utils/masks";
import { supabase } from "@/integrations/supabase/client";

const profileSchema = z.object({
  sponsor: z.string().optional(),
  custom_id: z.string().min(1, "Usuário é obrigatório"),
  full_name: z.string().min(1, "Nome completo é obrigatório"),
  person_type: z.string().min(1, "Tipo de pessoa é obrigatório"),
  cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  birth_date: z.string().min(1, "Data é obrigatória"),
  mobile: z.string().min(1, "Celular é obrigatório"),
  whatsapp: z.string().min(1, "WhatsApp é obrigatório"),
  secondary_whatsapp: z.string().optional(),
  email: z.string().email("Email inválido"),
  zip_code: z.string().min(1, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  address_number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  complement: z.string().optional(),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: ProfileWithSponsor;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Extrair número e bairro do endereço existente se disponível
  const addressParts = profile.address?.split(',') || [];
  const existingStreet = addressParts[0]?.trim() || "";
  const existingNumber = profile.address_number || addressParts[1]?.trim() || "";

  // Construir informações do patrocinador
  const getSponsorInfo = () => {
    if (!profile.sponsor) {
      return "Não possui patrocinador";
    }
    
    const parts = [];
    if (profile.sponsor.full_name) {
      parts.push(profile.sponsor.full_name);
    }
    if (profile.sponsor.custom_id) {
      parts.push(`(ID: ${profile.sponsor.custom_id})`);
    }
    if (profile.sponsor.email) {
      parts.push(`- ${profile.sponsor.email}`);
    }
    
    return parts.length > 0 ? parts.join(" ") : "Patrocinador sem informações";
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      sponsor: getSponsorInfo(),
      custom_id: profile.custom_id || "",
      full_name: profile.full_name || "",
      person_type: profile.person_type || "",
      cnpj: profile.cnpj || profile.cpf || "",
      birth_date: profile.birth_date || "",
      mobile: profile.mobile || "",
      whatsapp: profile.whatsapp || "",
      secondary_whatsapp: profile.secondary_whatsapp || "",
      email: profile.email || "",
      zip_code: profile.zip_code || "",
      address: existingStreet,
      address_number: existingNumber,
      neighborhood: profile.neighborhood || "",
      complement: profile.complement || "",
      state: profile.state || "",
      city: profile.city || "",
    },
  });

  console.log('Profile data loaded:', {
    state: profile.state,
    city: profile.city,
    neighborhood: profile.neighborhood,
    complement: profile.complement
  });

  const updateClientProfile = async (profileId: string, updateData: any) => {
    console.log("Starting profile update with data:", updateData);
    
    // Atualizar tabela profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        custom_id: updateData.custom_id,
        full_name: updateData.full_name,
        person_type: updateData.person_type,
        cnpj: updateData.cnpj,
        cpf: updateData.cpf,
        birth_date: updateData.birth_date,
        mobile: updateData.mobile,
        whatsapp: updateData.whatsapp,
        secondary_whatsapp: updateData.secondary_whatsapp,
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
      cep: updateData.zip_code,
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

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Form submit started with data:", data);
    
    try {
      setIsLoading(true);
      console.log("Loading state set to true");
      
      const updateData = {
        custom_id: data.custom_id,
        full_name: data.full_name,
        person_type: data.person_type,
        cnpj: removeMask(data.cnpj),
        cpf: removeMask(data.cnpj),
        birth_date: data.birth_date,
        mobile: removeMask(data.mobile),
        whatsapp: removeMask(data.whatsapp),
        secondary_whatsapp: data.secondary_whatsapp ? removeMask(data.secondary_whatsapp) : null,
        email: data.email,
        zip_code: removeMask(data.zip_code),
        address: data.address,
        address_number: data.address_number,
        neighborhood: data.neighborhood,
        complement: data.complement,
        state: data.state,
        city: data.city,
      };

      console.log("Calling updateClientProfile with:", { profileId: profile.id, updateData });

      await updateClientProfile(profile.id, updateData);
      
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

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("Form submission triggered");
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <ProfileImageSection profile={profile} />
      
      <div className="px-2 sm:px-6 py-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patrocinador
              </label>
              <input
                {...form.register("sponsor")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                disabled
                readOnly
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário <span className="text-red-500">*</span>
              </label>
              <input
                {...form.register("custom_id")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {form.formState.errors.custom_id && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.custom_id.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <PersonalDataSection form={form} />
        <ContactSection form={form} />
        <AddressSection form={form} />
        
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md w-full sm:w-auto"
            onClick={() => console.log("Button clicked, isLoading:", isLoading)}
          >
            {isLoading ? "Salvando..." : "Atualizar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
