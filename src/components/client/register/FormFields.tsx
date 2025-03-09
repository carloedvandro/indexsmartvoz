
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./RegisterSchema";
import { PersonalInfoFields } from "./fields/PersonalInfoFields";
import { ContactFields } from "./fields/ContactFields";
import { PasswordFields } from "./fields/PasswordFields";
import { Phone } from "lucide-react";

interface FormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const FormFields = ({ form, disableSponsor }: FormFieldsProps) => {
  return (
    <div className="space-y-4 w-full">
      <PersonalInfoFields form={form} />
      
      {/* Phone fields side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">WhatsApp</FormLabel>
              <FormControl>
                <div className="relative overflow-hidden rounded-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#580180]" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-3.5 w-3.5" />
                  <Input 
                    {...field} 
                    type="text"
                    placeholder="(00) 00000-0000" 
                    className="pl-9 text-sm h-8 pt-[3px] border-l-0 rounded-none w-full pr-2"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryWhatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Segundo Contato</FormLabel>
              <FormControl>
                <div className="relative overflow-hidden rounded-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#580180]" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-3.5 w-3.5" />
                  <Input 
                    {...field} 
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="pl-9 text-sm h-8 pt-[3px] border-l-0 rounded-none w-full pr-2"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      
      <PasswordFields form={form} />
      
      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">ID Personalizado do Patrocinador</FormLabel>
            <FormControl>
              <Input {...field} disabled={disableSponsor} className="bg-transparent text-sm h-8 pt-[3px]" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
