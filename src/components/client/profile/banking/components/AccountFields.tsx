
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";

interface AccountFieldsProps {
  control: Control<BankingFormData>;
}

export function AccountFields({ control }: AccountFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="account_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Número da Conta</FormLabel>
            <FormControl>
              <Input {...field} placeholder="18280" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="account_digit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Dígito</FormLabel>
            <FormControl>
              <Input {...field} placeholder="0" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
