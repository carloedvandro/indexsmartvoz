
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, Mail, FileText, Calendar } from "lucide-react";
import { FloatingLabelInput } from "./FloatingLabelInput";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const PersonalInfoFields = ({ form, disableSponsor }: PersonalInfoFieldsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="fullName"
                value={field.value}
                onChange={field.onChange}
                label="Nome Completo"
                icon={User}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                label="E-mail"
                icon={Mail}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="cpf"
                  value={field.value}
                  onChange={field.onChange}
                  label="CPF"
                  icon={FileText}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="birthDate"
                  value={field.value}
                  onChange={field.onChange}
                  label="Data de Nascimento"
                  icon={Calendar}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      
      {/* Desktop and Mobile layout - Sponsor Custom ID ABOVE User Custom ID */}
      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="sponsorCustomId"
                value={field.value}
                onChange={field.onChange}
                label="ID Personalizado do Patrocinador"
                icon={User}
                disabled={disableSponsor}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="customId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="customId"
                value={field.value}
                onChange={field.onChange}
                label="ID Personalizado do Usuário"
                icon={User}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
