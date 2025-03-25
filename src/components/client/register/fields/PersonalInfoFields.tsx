
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const PersonalInfoFields = ({ form, disableSponsor }: PersonalInfoFieldsProps) => {
  const isMobile = useIsMobile();
  
  // CPF formatting function
  const formatCPF = (value: string) => {
    // Limit to only 11 digits max
    const cpfDigits = value.replace(/\D/g, '').slice(0, 11);
    
    if (cpfDigits.length <= 3) {
      return cpfDigits;
    } else if (cpfDigits.length <= 6) {
      return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3)}`;
    } else if (cpfDigits.length <= 9) {
      return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6)}`;
    } else {
      return `${cpfDigits.slice(0, 3)}.${cpfDigits.slice(3, 6)}.${cpfDigits.slice(6, 9)}-${cpfDigits.slice(9, 11)}`;
    }
  };
  
  // Birth date formatting function
  const formatBirthDate = (value: string) => {
    const dateDigits = value.replace(/\D/g, '').slice(0, 8); // Limit to 8 digits (DDMMYYYY)
    
    if (dateDigits.length <= 2) {
      return dateDigits;
    } else if (dateDigits.length <= 4) {
      return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2)}`;
    } else {
      return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2, 4)}/${dateDigits.slice(4, 8)}`;
    }
  };
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Nome Completo</FormLabel>
            <FormControl>
              <Input {...field} className="text-sm h-9 pt-[3px] rounded-md" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* Email field is displayed the same way in both layouts */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">E-mail</FormLabel>
            <FormControl>
              <Input {...field} className="text-sm h-9 pt-[3px] rounded-md" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      {/* CPF and Birth Date side by side */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">CPF</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  value={formatCPF(field.value)}
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(formattedValue);
                  }}
                  maxLength={14}
                  className="text-sm h-9 pt-[3px] rounded-md" 
                />
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
              <FormLabel className="text-sm">Data de Nascimento</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  value={formatBirthDate(field.value)}
                  onChange={(e) => {
                    const formattedValue = e.target.value.replace(/\D/g, '');
                    field.onChange(formattedValue);
                  }}
                  maxLength={10}
                  placeholder="DD/MM/AAAA"
                  className="text-sm h-9 pt-[3px] rounded-md" 
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
      
      {/* Sponsor ID and User Custom ID fields */}
      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">ID Personalizado do Patrocinador</FormLabel>
            <FormControl>
              <Input {...field} disabled={disableSponsor} className="bg-transparent text-sm h-9 pt-[3px] rounded-md w-full" />
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
            <FormLabel className="text-sm">ID Personalizado do Usuário</FormLabel>
            <FormControl>
              <Input {...field} className="text-sm h-9 pt-[3px] rounded-md w-full" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
