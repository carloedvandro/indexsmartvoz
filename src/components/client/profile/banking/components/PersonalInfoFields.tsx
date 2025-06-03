
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";

interface PersonalInfoFieldsProps {
  control: Control<BankingFormData>;
}

export function PersonalInfoFields({ control }: PersonalInfoFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="account_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Titular da Conta</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Roberto Silva" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cpf_cnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">CPF/CNPJ</FormLabel>
            <FormControl>
              <Input {...field} placeholder="" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="security_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Senha de Segurança</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="password" 
                placeholder=""
                className="h-9"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
