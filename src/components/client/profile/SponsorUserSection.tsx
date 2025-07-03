
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface SponsorUserSectionProps {
  form: UseFormReturn<any>;
}

export function SponsorUserSection({ form }: SponsorUserSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informações do Padrinho</h3>
      
      <FormField
        control={form.control}
        name="sponsor_user"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usuário Padrinho</FormLabel>
            <FormControl>
              <Input 
                placeholder="Digite o código do seu padrinho" 
                {...field} 
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
