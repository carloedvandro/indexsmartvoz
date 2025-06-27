
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormData } from "../RegisterSchema";
import { MapPin, Hash, Home, Building, Navigation } from "lucide-react";
import { FloatingLabelInput } from "../fields/FloatingLabelInput";

interface AddressStepProps {
  form: UseFormReturn<RegisterFormData>;
}

export const AddressStep = ({ form }: AddressStepProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="cep"
                  value={field.value}
                  onChange={field.onChange}
                  label="CEP"
                  icon={MapPin}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="number"
                  value={field.value}
                  onChange={field.onChange}
                  label="Número"
                  icon={Hash}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="street"
                value={field.value}
                onChange={field.onChange}
                label="Rua/Logradouro"
                icon={Home}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="neighborhood"
                value={field.value}
                onChange={field.onChange}
                label="Bairro"
                icon={Building}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="city"
                  value={field.value}
                  onChange={field.onChange}
                  label="Cidade"
                  icon={Navigation}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="state"
                  value={field.value}
                  onChange={field.onChange}
                  label="Estado"
                  icon={MapPin}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="complement"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <FloatingLabelInput
                id="complement"
                value={field.value}
                onChange={field.onChange}
                label="Complemento (Opcional)"
                icon={Building}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
