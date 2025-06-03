
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cpfMask, cnpjMask, removeMask } from "@/utils/masks";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { isValidCNPJ } from "@/utils/validation/documentValidation";

interface PersonalDataSectionProps {
  form: UseFormReturn<any>;
}

interface CNPJData {
  razao_social?: string;
  nome_fantasia?: string;
  data_inicio_atividade?: string;
  cnpj?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
}

export function PersonalDataSection({ form }: PersonalDataSectionProps) {
  const personType = form.watch("person_type");
  const [documentValue, setDocumentValue] = useState(form.getValues("cnpj") || "");
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);

  const fetchCNPJData = async (cnpj: string): Promise<CNPJData | null> => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar dados do CNPJ:", error);
      return null;
    }
  };

  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeMask(value);
    
    let maskedValue = "";
    if (personType === "Pessoa Física") {
      maskedValue = cpfMask(value);
      // Validar CPF se estiver completo
      if (cleanValue.length === 11) {
        const isValid = isValidCPF(cleanValue);
        if (!isValid) {
          form.setError("cnpj", { message: "CPF inválido" });
        } else {
          form.clearErrors("cnpj");
        }
      }
    } else {
      maskedValue = cnpjMask(value);
      // Validar CNPJ se estiver completo
      if (cleanValue.length === 14) {
        const isValid = isValidCNPJ(cleanValue);
        if (!isValid) {
          form.setError("cnpj", { message: "CNPJ inválido" });
        } else {
          form.clearErrors("cnpj");
          // Buscar dados do CNPJ automaticamente
          setIsLoadingCNPJ(true);
          try {
            const cnpjData = await fetchCNPJData(cleanValue);
            if (cnpjData) {
              // Preencher campos automaticamente
              if (cnpjData.razao_social || cnpjData.nome_fantasia) {
                form.setValue("full_name", cnpjData.razao_social || cnpjData.nome_fantasia || "");
              }
              
              if (cnpjData.data_inicio_atividade) {
                // Converter formato da data de DD/MM/YYYY para YYYY-MM-DD
                const [day, month, year] = cnpjData.data_inicio_atividade.split('/');
                if (day && month && year) {
                  form.setValue("birth_date", `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
                }
              }

              // Preencher endereço se disponível
              if (cnpjData.logradouro) {
                form.setValue("address", cnpjData.logradouro);
              }
              
              if (cnpjData.numero) {
                form.setValue("address_number", cnpjData.numero);
              }
              
              if (cnpjData.bairro) {
                form.setValue("neighborhood", cnpjData.bairro);
              }
              
              if (cnpjData.municipio) {
                form.setValue("city", cnpjData.municipio);
              }
              
              if (cnpjData.uf) {
                form.setValue("state", cnpjData.uf);
              }
              
              if (cnpjData.cep) {
                form.setValue("zip_code", cnpjData.cep.replace(/\D/g, ''));
              }
            }
          } catch (error) {
            console.error("Erro ao buscar dados do CNPJ:", error);
          } finally {
            setIsLoadingCNPJ(false);
          }
        }
      }
    }
    
    setDocumentValue(maskedValue);
    form.setValue("cnpj", cleanValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-700">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("full_name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nome completo"
          />
          {form.formState.errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.full_name.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de pessoa <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("person_type")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
            onChange={(e) => {
              form.setValue("person_type", e.target.value);
              setDocumentValue("");
              form.setValue("cnpj", "");
              form.clearErrors("cnpj");
            }}
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

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="email@exemplo.com"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.email.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-0 lg:gap-4 lg:col-span-2">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {personType === "Pessoa Física" ? "Data de nascimento" : "Data de abertura"} <span className="text-red-500">*</span>
            </label>
            <input
              {...form.register("birth_date")}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {form.formState.errors.birth_date && (
              <p className="text-red-500 text-sm mt-1">
                {String(form.formState.errors.birth_date.message || "Campo obrigatório")}
              </p>
            )}
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {personType === "Pessoa Física" ? "CPF" : "CNPJ"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                value={documentValue}
                onChange={handleDocumentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={personType === "Pessoa Física" ? "000.000.000-00" : "00.000.000/0000-00"}
                maxLength={personType === "Pessoa Física" ? 14 : 18}
                disabled={isLoadingCNPJ}
              />
              {isLoadingCNPJ && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            {form.formState.errors.cnpj && (
              <p className="text-red-500 text-sm mt-1">
                {String(form.formState.errors.cnpj.message || "Campo obrigatório")}
              </p>
            )}
            {isLoadingCNPJ && (
              <p className="text-blue-500 text-sm mt-1">
                Buscando dados do CNPJ...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
