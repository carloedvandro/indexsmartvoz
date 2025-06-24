
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useState } from "react";
import { MapPin, Hash, Home, Building, Navigation } from "lucide-react";

interface AddressStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const AddressStep = ({ form }: AddressStepProps) => {
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    onFocus={() => handleFocus("cep")}
                    onBlur={() => handleBlur("cep")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.cep || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    CEP
                  </Label>
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    onFocus={() => handleFocus("number")}
                    onBlur={() => handleBlur("number")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.number || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    Número
                  </Label>
                  <Hash className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  onFocus={() => handleFocus("street")}
                  onBlur={() => handleBlur("street")}
                  className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                />
                <Label 
                  className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.street || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Rua/Logradouro
                </Label>
                <Home className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  onFocus={() => handleFocus("neighborhood")}
                  onBlur={() => handleBlur("neighborhood")}
                  className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                />
                <Label 
                  className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.neighborhood || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Bairro
                </Label>
                <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    onFocus={() => handleFocus("city")}
                    onBlur={() => handleBlur("city")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.city || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    Cidade
                  </Label>
                  <Navigation className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    onFocus={() => handleFocus("state")}
                    onBlur={() => handleBlur("state")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.state || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    Estado
                  </Label>
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  onFocus={() => handleFocus("complement")}
                  onBlur={() => handleBlur("complement")}
                  className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                />
                <Label 
                  className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.complement || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Complemento (Opcional)
                </Label>
                <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
