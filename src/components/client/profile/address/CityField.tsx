
import { UseFormReturn } from "react-hook-form";

interface CityFieldProps {
  form: UseFormReturn<any>;
}

export function CityField({ form }: CityFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Cidade <span className="text-red-500">*</span>
      </label>
      <input
        {...form.register("city")}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder="Digite a cidade"
      />
      {form.formState.errors.city && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.city.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
