
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";

interface AccountTypeFieldProps {
  control: Control<BankingFormData>;
}

export function AccountTypeField({ control }: AccountTypeFieldProps) {
  return (
    <FormField
      control={control}
      name="account_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">Tipo de Conta</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
              <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
