
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface ContactInfoStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactInfoStep = ({ form }: ContactInfoStepProps) => {
  const primaryWhatsapp = useWatch({
    control: form.control,
    name: "whatsapp",
  });

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Informações de Contato</h2>
        <p className="text-gray-600 text-sm mt-1">Como podemos entrar em contato com você?</p>
      </div>

      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">WhatsApp Principal</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4">
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
                  className="pl-10 text-sm h-10 rounded-md"
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
            <FormLabel className="text-sm">WhatsApp Secundário (Opcional)</FormLabel>
            <FormControl>
              <div className="relative overflow-hidden rounded-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4">
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
                  className="pl-10 text-sm h-10 rounded-md"
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
