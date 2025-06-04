
import { UseFormReturn } from "react-hook-form";

interface DateFieldProps {
  form: UseFormReturn<any>;
  personType: string;
}

export function DateField({ form, personType }: DateFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        {personType === "Pessoa Física" ? "Data de nascimento" : "Data de abertura"} <span className="text-red-500">*</span>
      </label>
      <input
        {...form.register("birth_date")}
        type="date"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
      />
      {form.formState.errors.birth_date && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.birth_date.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
