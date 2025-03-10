
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
  
  // Always display fields side by side, even on mobile
  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">WhatsApp</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000" 
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md w-full pr-2"
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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-9 text-sm h-9 pt-[3px] rounded-md w-full pr-2"
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
