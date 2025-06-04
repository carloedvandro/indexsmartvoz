
import { UseFormReturn } from "react-hook-form";

interface PersonTypeSelectProps {
  form: UseFormReturn<any>;
  onPersonTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function PersonTypeSelect({ form, onPersonTypeChange }: PersonTypeSelectProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-700 mb-2">
        Tipo de pessoa <span className="text-red-500">*</span>
      </label>
      <select
        value={form.watch("person_type") || ""}
        onChange={onPersonTypeChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        <option value="">Selecione</option>
        <option value="Pessoa Física">Pessoa Física</option>
        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
      </select>
      {form.formState.errors.person_type && (
        <p className="text-red-500 text-xs mt-1">
          {String(form.formState.errors.person_type.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
}
