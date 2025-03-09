
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { Phone } from "lucide-react";

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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f0889] h-3.5 w-3.5" />
                {/* First signal bar */}
                <div className="absolute left-[18px] top-1/2 -translate-y-1/2 w-1 h-3 bg-[#5f0889] rounded-full animate-pulse"></div>
                {/* Second signal bar */}
                <div className="absolute left-[22px] top-1/2 -translate-y-1/2 w-1 h-4 bg-[#5f0889] rounded-full animate-pulse delay-75"></div>
                {/* Third signal bar */}
                <div className="absolute left-[26px] top-1/2 -translate-y-1/2 w-1 h-5 bg-[#5f0889] rounded-full animate-pulse delay-150"></div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000" 
                  className="pl-9 text-sm h-8.5 rounded-md w-full pr-2"
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5f0889] h-3.5 w-3.5" />
                {/* First signal bar */}
                <div className="absolute left-[18px] top-1/2 -translate-y-1/2 w-1 h-3 bg-[#5f0889] rounded-full animate-pulse"></div>
                {/* Second signal bar */}
                <div className="absolute left-[22px] top-1/2 -translate-y-1/2 w-1 h-4 bg-[#5f0889] rounded-full animate-pulse delay-75"></div>
                {/* Third signal bar */}
                <div className="absolute left-[26px] top-1/2 -translate-y-1/2 w-1 h-5 bg-[#5f0889] rounded-full animate-pulse delay-150"></div>
                <Input 
                  {...field} 
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="pl-9 text-sm h-8.5 rounded-md w-full pr-2"
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
