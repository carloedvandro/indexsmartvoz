
import { UseFormReturn } from "react-hook-form";
import { capitalizeWords } from "@/utils/textFormat";

interface FullNameFieldProps {
  form: UseFormReturn<any>;
  personType: string;
}

export function FullNameField({ form, personType }: FullNameFieldProps) {
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("full_name", value);
  };

  return (
    <div className="lg:col-span-2 w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        {personType === "Pessoa Jurídica" ? "Razão Social" : "Nome completo"} <span className="text-red-500">*</span>
      </label>
      <input
        value={form.watch("full_name") || ""}
        onChange={handleFullNameChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        placeholder={personType === "Pessoa Jurídica" ? "Razão Social" : "Nome completo"}
      />
      {form.formState.errors.full_name && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.full_name.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
