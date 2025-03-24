
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "./RegisterSchema";
import { PersonalInfoFields } from "./fields/PersonalInfoFields";
import { ContactFields } from "./fields/ContactFields";
import { PasswordFields } from "./fields/PasswordFields";

interface FormFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const FormFields = ({ form, disableSponsor }: FormFieldsProps) => {
  return (
    <div className="space-y-4 w-full">
      <PersonalInfoFields form={form} />
      
      {/* Contact fields side by side */}
      <ContactFields form={form} />
      
      <PasswordFields form={form} />
      
      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">ID Personalizado do Patrocinador</FormLabel>
            <FormControl>
              <Input {...field} disabled={disableSponsor} className="bg-transparent text-sm h-9 pt-[3px] rounded-md" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
