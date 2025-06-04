
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";

interface AgencyFieldsProps {
  control: Control<BankingFormData>;
}

export function AgencyFields({ control }: AgencyFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="agency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Número da Agência</FormLabel>
            <FormControl>
              <Input {...field} placeholder="8217" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="agency_digit"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Dígito</FormLabel>
            <FormControl>
              <Input {...field} placeholder="" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
