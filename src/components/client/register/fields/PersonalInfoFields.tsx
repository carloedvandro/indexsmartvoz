
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { User, Mail, FileText, Calendar } from "lucide-react";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const PersonalInfoFields = ({ form, disableSponsor }: PersonalInfoFieldsProps) => {
  const isMobile = useIsMobile();
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});
  
  const handleFocus = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName: string) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  onFocus={() => handleFocus("fullName")}
                  onBlur={() => handleBlur("fullName")}
                  className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                />
                <Label 
                  className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.fullName || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  Nome Completo
                </Label>
                <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                <Input 
                  {...field} 
                  type="email"
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                />
                <Label 
                  className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                    focusedFields.email || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                  }`}
                >
                  E-mail
                </Label>
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    onFocus={() => handleFocus("cpf")}
                    onBlur={() => handleBlur("cpf")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.cpf || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    CPF
                  </Label>
                  <FileText className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative w-full">
                  <Input 
                    {...field} 
                    placeholder=""
                    onFocus={() => handleFocus("birthDate")}
                    onBlur={() => handleBlur("birthDate")}
                    className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                  />
                  <Label 
                    className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                      focusedFields.birthDate || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                    }`}
                  >
                    Data de Nascimento
                  </Label>
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      
      {/* Desktop layout - Sponsor Custom ID ABOVE User Custom ID */}
      {!isMobile && (
        <>
          <FormField
            control={form.control}
            name="sponsorCustomId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input 
                      {...field} 
                      disabled={disableSponsor} 
                      onFocus={() => handleFocus("sponsorCustomId")}
                      onBlur={() => handleBlur("sponsorCustomId")}
                      className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2] disabled:opacity-70" 
                    />
                    <Label 
                      className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                        focusedFields.sponsorCustomId || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    >
                      ID Personalizado do Patrocinador
                    </Label>
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input 
                      {...field} 
                      onFocus={() => handleFocus("customId")}
                      onBlur={() => handleBlur("customId")}
                      className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                    />
                    <Label 
                      className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                        focusedFields.customId || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    >
                      ID Personalizado do Usuário
                    </Label>
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </>
      )}
      
      {/* Mobile layout - Sponsor Custom ID ABOVE User Custom ID */}
      {isMobile && (
        <>
          <FormField
            control={form.control}
            name="sponsorCustomId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input 
                      {...field} 
                      disabled={disableSponsor} 
                      onFocus={() => handleFocus("sponsorCustomId")}
                      onBlur={() => handleBlur("sponsorCustomId")}
                      className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2] disabled:opacity-70" 
                    />
                    <Label 
                      className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                        focusedFields.sponsorCustomId || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    >
                      ID Personalizado do Patrocinador
                    </Label>
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input 
                      {...field} 
                      onFocus={() => handleFocus("customId")}
                      onBlur={() => handleBlur("customId")}
                      className="w-full pr-10 bg-white border-2 border-[#7a1fa2] rounded-md h-12 text-black focus:border-[#7a1fa2]" 
                    />
                    <Label 
                      className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 font-medium bg-white px-1 ${
                        focusedFields.customId || field.value ? '-top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
                      }`}
                    >
                      ID Personalizado do Usuário
                    </Label>
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};
