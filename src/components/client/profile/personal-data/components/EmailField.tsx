
import { UseFormReturn } from "react-hook-form";

interface EmailFieldProps {
  form: UseFormReturn<any>;
}

export function EmailField({ form }: EmailFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        {...form.register("email")}
        type="email"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder="email@exemplo.com"
      />
      {form.formState.errors.email && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.email.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
