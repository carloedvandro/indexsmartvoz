
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<RegisterFormData>;
}

export const PersonalInfoFields = ({ form }: PersonalInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Nome Completo</FormLabel>
            <FormControl>
              <Input {...field} className="bg-transparent text-sm h-9" />
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
            <FormLabel className="text-sm">Endereço de email</FormLabel>
            <FormControl>
              <Input type="email" {...field} className="bg-transparent text-sm h-9" />
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
              <Input {...field} className="bg-transparent text-sm h-9" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="bg-transparent text-sm h-9" />
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
                <Input {...field} className="bg-transparent text-sm h-9" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
