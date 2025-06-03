
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";
import { bankOptions } from "../data/bankOptions";

interface BankSelectFieldProps {
  control: Control<BankingFormData>;
}

export function BankSelectField({ control }: BankSelectFieldProps) {
  return (
    <FormField
      control={control}
      name="bank_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">Nome do Banco</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Selecione o banco" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-[var(--radix-select-trigger-width)]">
              {bankOptions.map((bank) => (
                <SelectItem key={bank} value={bank} className="text-xs py-1 text-left">
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
