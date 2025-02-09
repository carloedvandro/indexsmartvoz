
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  const primaryWhatsapp = useWatch({
    control: form.control,
    name: "whatsapp",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>WhatsApp</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="(00) 00000-0000" 
                className="bg-transparent transition-all duration-300 border-0 border-b-2 border-muted-foreground/30 rounded-none px-0 h-10 focus-visible:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-b-primary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secondaryWhatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Segundo Contato</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="(00) 00000-0000"
                className="bg-transparent transition-all duration-300 border-0 border-b-2 border-muted-foreground/30 rounded-none px-0 h-10 focus-visible:border-b-primary focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-b-primary"
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
