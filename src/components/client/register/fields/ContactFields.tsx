
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  const primaryWhatsapp = useWatch({
    control: form.control,
    name: "whatsapp",
  });
  
  const isMobile = useIsMobile();

  // Format WhatsApp number with Brazilian mobile format
  const formatWhatsApp = (value: string) => {
    // Return empty string if no value
    if (!value) return "";
    
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 0) {
      return "";
    } else if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">WhatsApp</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/2e4ca7a4-cb0a-4cc0-94b0-fbf9e4a57298.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field}
                  value={formatWhatsApp(field.value || "")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    field.onChange(rawValue);
                  }} 
                  type="text"
                  placeholder="(00) 00000-0000" 
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md w-full pr-2 text-center"
                  maxLength={15}
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
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/2e4ca7a4-cb0a-4cc0-94b0-fbf9e4a57298.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field}
                  value={formatWhatsApp(field.value || "")}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    if (rawValue === primaryWhatsapp) {
                      form.setError("secondaryWhatsapp", {
                        type: "manual",
                        message: "O segundo contato deve ser diferente do WhatsApp principal"
                      });
                    } else {
                      form.clearErrors("secondaryWhatsapp");
                    }
                    field.onChange(rawValue);
                  }}
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md w-full pr-2 text-center"
                  maxLength={15}
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
