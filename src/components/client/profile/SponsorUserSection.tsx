
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface SponsorUserSectionProps {
  form: UseFormReturn<any>;
  disabled?: boolean;
}

export function SponsorUserSection({ form, disabled = false }: SponsorUserSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Informações do Patrocinador</h3>
        <p className="text-sm text-gray-600">
          Informe o ID do usuário que te indicou (opcional)
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="sponsorCustomId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID do Patrocinador</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite o ID do seu patrocinador"
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage>
              {form.formState.errors.sponsorCustomId?.message && (
                <span className="text-red-500 text-sm">
                  {String(form.formState.errors.sponsorCustomId.message)}
                </span>
              )}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
