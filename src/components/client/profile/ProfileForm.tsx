
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalDataSection } from "./PersonalDataSection";
import { ContactSection } from "./ContactSection";
import { AddressSection } from "./AddressSection";
import { ProfileWithSponsor } from "@/types/profile";
import { updateProfile } from "@/components/admin/UserFormUtils";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const profileSchema = z.object({
  sponsor: z.string().optional(),
  custom_id: z.string().min(1, "Usuário é obrigatório"),
  full_name: z.string().min(1, "Nome completo é obrigatório"),
  person_type: z.string().min(1, "Tipo de pessoa é obrigatório"),
  cnpj: z.string().optional(),
  birth_date: z.string().optional(),
  mobile: z.string().min(1, "Celular é obrigatório"),
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

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      sponsor: profile.sponsor?.full_name || "N/A",
      custom_id: profile.custom_id || "",
      full_name: profile.full_name || "",
      person_type: profile.person_type || "",
      cnpj: profile.cnpj || "",
      birth_date: profile.birth_date || "",
      mobile: profile.mobile || "",
      email: profile.email || "",
      zip_code: profile.zip_code || "",
      address: profile.address || "",
      address_number: "", // Será extraído do endereço
      neighborhood: "", // Será extraído do endereço
      complement: "",
      state: profile.state || "",
      city: profile.city || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      
      const updateData = {
        custom_id: data.custom_id,
        full_name: data.full_name,
        person_type: data.person_type,
        cnpj: data.cnpj,
        birth_date: data.birth_date,
        mobile: data.mobile,
        email: data.email,
        zip_code: data.zip_code,
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
      <ProfileImageSection />
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patrocinador
                </label>
                <input
                  type="text"
                  value={profile.sponsor?.full_name || "N/A"}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
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
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md"
            >
              {isLoading ? "Salvando..." : "Solicitar alteração"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
