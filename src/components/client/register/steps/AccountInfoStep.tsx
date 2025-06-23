
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface AccountInfoStepProps {
  form: UseFormReturn<RegisterFormData>;
  disableSponsor?: boolean;
}

export const AccountInfoStep = ({ form, disableSponsor }: AccountInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Configuração da Conta</h2>
        <p className="text-gray-600 text-sm mt-1">Configure suas credenciais e identificação</p>
      </div>

      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">ID do Patrocinador</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={disableSponsor} 
                className="bg-transparent text-sm h-10 rounded-md" 
                placeholder="ID de quem te indicou"
              />
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
            <FormLabel className="text-sm">Seu ID Personalizado</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="text-sm h-10 rounded-md" 
                placeholder="Escolha um ID único para você"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
