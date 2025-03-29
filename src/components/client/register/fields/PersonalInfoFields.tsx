
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { getUserByCPF } from "@/services/user/userLookup";
import { formatCPF } from "@/utils/validation/cpfValidation";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const PersonalInfoFields = ({ form, disableSponsor }: PersonalInfoFieldsProps) => {
  const isMobile = useIsMobile();
  
  // Função para buscar dados do usuário pelo CPF
  const fetchUserDataByCPF = async (cpf: string) => {
    if (cpf.replace(/\D/g, '').length === 11) {
      const userData = await getUserByCPF(cpf);
      
      if (userData) {
        // Preencher os campos automaticamente
        form.setValue("fullName", userData.full_name || "");
        
        // Formatar a data de nascimento (caso esteja no formato ISO)
        if (userData.birth_date) {
          const birthDate = userData.birth_date.split('T')[0];
          form.setValue("birthDate", birthDate);
        }
        
        // Mostrar CPF formatado
        form.setValue("cpf", formatCPF(userData.cpf));
      }
    }
  };
  
  // Observar mudanças no campo CPF
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'cpf') {
        const cpf = value.cpf as string;
        if (cpf && cpf.replace(/\D/g, '').length === 11) {
          fetchUserDataByCPF(cpf);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
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
      
      {/* CPF and Birth Date side by side on both mobile and desktop */}
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
                  className="text-sm h-9 pt-[3px] rounded-md"
                  onChange={(e) => {
                    // Formatar o CPF enquanto o usuário digita
                    const value = e.target.value.replace(/\D/g, '');
                    
                    if (value.length <= 11) {
                      field.onChange(value.length === 11 ? formatCPF(value) : value);
                      
                      // Se tiver 11 dígitos, buscar dados do usuário
                      if (value.length === 11) {
                        fetchUserDataByCPF(value);
                      }
                    }
                  }}
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
                  type="date"
                  placeholder="DD/MM/AAAA"
                  className="text-sm h-9 pt-[3px] rounded-md" 
                />
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
                <FormLabel className="text-sm">ID Personalizado do Patrocinador</FormLabel>
                <FormControl>
                  <Input {...field} disabled={disableSponsor} className="bg-transparent text-sm h-9 pt-[3px] rounded-md" />
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
                  <Input {...field} className="text-sm h-9 pt-[3px] rounded-md" />
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
