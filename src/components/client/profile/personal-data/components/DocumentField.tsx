
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cpfMask, cnpjMask, removeMask } from "@/utils/masks";
import { useDocumentValidation } from "../hooks/useDocumentValidation";

interface DocumentFieldProps {
  form: UseFormReturn<any>;
  personType: string;
}

export function DocumentField({ form, personType }: DocumentFieldProps) {
  const [documentValue, setDocumentValue] = useState(form.getValues("cnpj") || "");
  const { validateCPF, validateCNPJ, isLoadingDocument, isLoadingCPF, isLoadingCNPJ, cpfMessage } = useDocumentValidation(form, personType);

  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeMask(value);
    
    let maskedValue = "";
    if (personType === "Pessoa Física") {
      maskedValue = cpfMask(value);
      console.log("CPF digitado:", cleanValue, "Comprimento:", cleanValue.length);
      
      if (cleanValue.length === 11) {
        validateCPF(cleanValue);
      }
    } else {
      maskedValue = cnpjMask(value);
      console.log("CNPJ digitado:", cleanValue, "Comprimento:", cleanValue.length);
      
      if (cleanValue.length === 14) {
        validateCNPJ(cleanValue);
      }
    }
    
    setDocumentValue(maskedValue);
    form.setValue("cnpj", cleanValue);
  };

  return (
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
          Verificando CPF...
        </p>
      )}
      {isLoadingCNPJ && (
        <p className="text-blue-500 text-xs mt-1">
          Buscando dados do CNPJ...
        </p>
      )}
      {cpfMessage && !isLoadingCPF && (
        <p className="text-green-600 text-xs mt-1">
          {cpfMessage}
        </p>
      )}
    </div>
  );
}
