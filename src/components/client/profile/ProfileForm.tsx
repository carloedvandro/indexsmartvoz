
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
import { updateProfile } from "@/components/admin/UserFormUtils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { removeMask } from "@/utils/masks";

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

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      
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
        address: `${data.address}, ${data.address_number}`,
        state: data.state,
        city: data.city,
      };

      await updateProfile(profile.id, updateData);
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          >
            {isLoading ? "Salvando..." : "Atualizar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
