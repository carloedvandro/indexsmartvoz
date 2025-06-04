
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { capitalizeWords } from "@/utils/textFormat";
import { useDocumentHandler } from "./hooks/useDocumentHandler";

interface PersonalDataSectionProps {
  form: UseFormReturn<any>;
}

export function PersonalDataSection({ form }: PersonalDataSectionProps) {
  const personType = form.watch("person_type");
  const {
    documentValue,
    setDocumentValue,
    isLoadingCNPJ,
    isLoadingCPF,
    handleDocumentChange
  } = useDocumentHandler(form);

  // Função para lidar com mudanças no campo nome completo
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("full_name", value);
  };

  // Limpar campos ao mudar o tipo de pessoa
  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    form.setValue("person_type", newType);
    
    // Limpar dados específicos de cada tipo de pessoa
    setDocumentValue("");
    form.setValue("cnpj", "");
    form.setValue("birth_date", "");
    form.setValue("full_name", ""); // Limpar nome completo também
    form.clearErrors("cnpj");
  };

  const isLoadingDocument = isLoadingCPF || isLoadingCNPJ;

  // Determinar o label e placeholder baseado no tipo de pessoa
  const getNameFieldConfig = () => {
    if (personType === "Pessoa Jurídica") {
      return {
        label: "Razão social",
        placeholder: "Razão social da empresa"
      };
    }
    return {
      label: "Nome completo",
      placeholder: "Nome completo"
    };
  };

  const nameConfig = getNameFieldConfig();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-medium text-gray-700">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2 w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            {nameConfig.label} <span className="text-red-500">*</span>
          </label>
          <input
            value={form.watch("full_name") || ""}
            onChange={handleFullNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder={nameConfig.placeholder}
          />
          {form.formState.errors.full_name && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.full_name.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Tipo de pessoa <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("person_type")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
            onChange={handlePersonTypeChange}
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
        
        <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:col-span-2">
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
          
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              {personType === "Pessoa Física" ? "CPF" : "CNPJ"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                value={documentValue}
                onChange={handleDocumentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                placeholder={personType === "Pessoa Física" ? "000.000.000-00" : "00.000.000/0000-00"}
                maxLength={personType === "Pessoa Física" ? 14 : 18}
                disabled={isLoadingDocument}
              />
              {isLoadingDocument && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            {form.formState.errors.cnpj && (
              <p className="text-red-500 text-xs mt-1">
                {String(form.formState.errors.cnpj.message || "Campo obrigatório")}
              </p>
            )}
            {isLoadingCPF && (
              <p className="text-blue-500 text-xs mt-1">
                Buscando dados do CPF...
              </p>
            )}
            {isLoadingCNPJ && (
              <p className="text-blue-500 text-xs mt-1">
                Buscando dados do CNPJ...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
