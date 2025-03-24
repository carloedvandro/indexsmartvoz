
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { Phone } from "lucide-react";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  // This formats the phone number as (XX) XXXXX-XXXX while typing
  const formatPhone = (value: string) => {
    if (!value) return "";
    
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Format according to Brazilian phone number pattern
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const formattedValue = formatPhone(e.target.value);
    field.onChange(formattedValue);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">WhatsApp</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-3.5 w-3.5" />
                <Input
                  {...field}
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md"
                  onChange={(e) => handlePhoneChange(e, field)}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength={16}
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
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#580180] h-3.5 w-3.5" />
                <Input
                  {...field}
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md"
                  onChange={(e) => handlePhoneChange(e, field)}
                  placeholder="(XX) XXXXX-XXXX (opcional)"
                  maxLength={16}
                />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
