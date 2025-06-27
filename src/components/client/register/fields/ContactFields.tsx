
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone } from "lucide-react";
import { FloatingLabelInput } from "./FloatingLabelInput";

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
            <FormControl>
              <div className="relative w-full">
                <FloatingLabelInput
                  id="whatsapp"
                  value={field.value}
                  onChange={field.onChange}
                  label="WhatsApp"
                  icon={Phone}
                  className="pl-12"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
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
            <FormControl>
              <div className="relative w-full">
                <FloatingLabelInput
                  id="secondaryWhatsapp"
                  value={field.value}
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
                  label="Segundo Contato"
                  icon={Phone}
                  className="pl-12"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
