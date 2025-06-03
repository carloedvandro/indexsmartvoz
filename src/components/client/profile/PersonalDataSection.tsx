
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface PersonalDataSectionProps {
  form: UseFormReturn<any>;
}

export function PersonalDataSection({ form }: PersonalDataSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-700">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("full_name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Roberto Silva"
          />
          {form.formState.errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.full_name.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de pessoa <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("person_type")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Selecione</option>
            <option value="Pessoa Física">Pessoa Física</option>
            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
          </select>
          {form.formState.errors.person_type && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.person_type.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de abertura <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("birth_date")}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("cnpj")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="__.___.___/____-__"
          />
        </div>
      </div>
    </div>
  );
}
