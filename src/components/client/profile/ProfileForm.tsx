
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalDataSection } from "./personal-data/PersonalDataSection";
import { ContactSection } from "./ContactSection";
import { AddressSection } from "./AddressSection";
import { SponsorUserSection } from "./SponsorUserSection";
import { ProfileWithSponsor } from "@/types/profile";
import { useProfileUpdate, ProfileUpdateData } from "@/hooks/useProfileUpdate";

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
  const { isLoading, handleProfileUpdate } = useProfileUpdate();

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
    await handleProfileUpdate(profile.id, data as ProfileUpdateData);
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
        <SponsorUserSection form={form} />
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
