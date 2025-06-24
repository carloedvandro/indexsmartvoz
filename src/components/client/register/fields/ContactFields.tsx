
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn, useWatch } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Phone } from "lucide-react";

interface ContactFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  const primaryWhatsapp = useWatch({
    control: form.control,
    name: "whatsapp",
  });
  
  const isMobile = useIsMobile();
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
      <FormField
        control={form.control}
        name="whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  type="text"
                  onFocus={() => handleFocus("whatsapp")}
                  onBlur={() => handleBlur("whatsapp")}
                  className="w-full pr-10 pl-12 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Label 
                  className={`absolute left-12 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.whatsapp || field.value ? '-top-2 text-xs left-3' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  WhatsApp
                </Label>
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                <Input 
                  {...field} 
                  type="text"
                  onFocus={() => handleFocus("secondaryWhatsapp")}
                  onBlur={() => handleBlur("secondaryWhatsapp")}
                  className="w-full pr-10 pl-12 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]"
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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                  <img 
                    src="/lovable-uploads/781343f8-a9e6-4801-9287-c6d3d756cebb.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Label 
                  className={`absolute left-12 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.secondaryWhatsapp || field.value ? '-top-2 text-xs left-3' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Segundo Contato
                </Label>
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
