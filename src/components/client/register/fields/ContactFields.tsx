
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  const primaryWhatsapp = useWatch({
    control: form.control,
    name: "whatsapp",
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-sm">WhatsApp</FormLabel>
            <FormControl>
              <div className="relative rounded-md">
                <div className="absolute inset-0 rounded-md bg-[#F2FCE2] border border-green-500/20"></div>
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-[50px] w-[50px] z-10">
                  <WhatsAppIcon />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000" 
                  className="pl-[60px] text-sm h-10 rounded-md w-full pr-2 bg-transparent relative z-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
          <FormItem className="space-y-1">
            <FormLabel className="text-sm">Segundo Contato</FormLabel>
            <FormControl>
              <div className="relative rounded-md">
                <div className="absolute inset-0 rounded-md bg-[#F2FCE2] border border-green-500/20"></div>
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 h-[50px] w-[50px] z-10">
                  <WhatsAppIcon />
                </div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-[60px] text-sm h-10 rounded-md w-full pr-2 bg-transparent relative z-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
