
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
      
      {/* On desktop, display email and CPF in separate rows */}
      {/* On mobile, maintain side by side layout */}
      {isMobile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">CPF</FormLabel>
                <FormControl>
                  <Input {...field} className="text-sm h-9 pt-[3px] rounded-md" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      ) : (
        /* Desktop layout - email stacked, then CPF and Birth Date side by side */
        <>
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
          
          {/* CPF and Birth Date side by side on desktop */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">CPF</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm h-9 pt-[3px] rounded-md" />
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
                      placeholder="DD/MM/AAAA"
                      className="text-sm h-9 pt-[3px] rounded-md" 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          
          {/* Sponsor Custom ID and User Custom ID - both full width in their own rows */}
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
      
      {/* Mobile layout - User Custom ID and Birth Date side by side */}
      {isMobile && (
        <div className="grid grid-cols-2 gap-4">
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
          
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Data de Nascimento</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="DD/MM/AAAA"
                    className="text-sm h-9 pt-[3px] rounded-md" 
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      )}
      
      {/* Add sponsor field for mobile layout */}
      {isMobile && (
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
      )}
    </div>
  );
};
