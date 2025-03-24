
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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/2e4ca7a4-cb0a-4cc0-94b0-fbf9e4a57298.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000" 
                  className="pl-11 text-sm h-9 pt-[3px] rounded-md w-full pr-2"
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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/2e4ca7a4-cb0a-4cc0-94b0-fbf9e4a57298.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-11 text-sm h-9 pt-[3px] rounded-md w-full pr-2"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === primaryWhatsapp) {
                      form.setError("secondaryWhatsapp", {
                        type: "manual",
                        message: "O segundo contato deve ser diferente do WhatsApp principal"
                      });
                    } else {
                      form.clearErrors("secondaryWhatsapp");
                    }
                    field.onChange(e);
                  }}
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
