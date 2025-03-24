import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  // WhatsApp formatting function
  const formatPhone = (value: string) => {
    if (!value) return '';
    
    // Keep only digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 11 digits max (Brazil format)
    const limitedDigits = digits.slice(0, 11);
    
    // Format based on length
    if (limitedDigits.length <= 2) {
      return limitedDigits;
    } else if (limitedDigits.length <= 6) {
      return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
    } else if (limitedDigits.length <= 10) {
      return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 6)}-${limitedDigits.slice(6)}`;
    } else {
      return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">WhatsApp</FormLabel>
            <FormControl>
              <Input 
                {...field}
                value={formatPhone(field.value)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  field.onChange(rawValue);
                }}
                placeholder="(00) 00000-0000"
                className="text-sm h-9 pt-[3px] rounded-md" 
              />
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
            <FormLabel className="text-sm">WhatsApp Secundário (opcional)</FormLabel>
            <FormControl>
              <Input 
                {...field}
                value={formatPhone(field.value || '')}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  field.onChange(rawValue);
                }}
                placeholder="(00) 00000-0000"
                className="text-sm h-9 pt-[3px] rounded-md" 
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
