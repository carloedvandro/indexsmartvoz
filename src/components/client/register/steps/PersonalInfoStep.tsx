
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface PersonalInfoStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>
        <p className="text-gray-600 text-sm mt-1">Vamos começar com seus dados básicos</p>
      </div>

      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Nome Completo</FormLabel>
            <FormControl>
              <Input {...field} className="text-sm h-10 rounded-md" placeholder="Digite seu nome completo" />
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
            <FormLabel className="text-sm">E-mail</FormLabel>
            <FormControl>
              <Input {...field} type="email" className="text-sm h-10 rounded-md" placeholder="Digite seu e-mail" />
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
              <FormLabel className="text-sm">CPF</FormLabel>
              <FormControl>
                <Input {...field} className="text-sm h-10 rounded-md" placeholder="000.000.000-00" />
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
                  className="text-sm h-10 rounded-md" 
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
