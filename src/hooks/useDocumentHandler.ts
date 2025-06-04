
import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { BankingFormData } from "../components/client/profile/banking/schemas/bankingSchema";
import { cnpjMask, cpfMask, removeMask } from "@/utils/masks";
import { isValidCNPJ } from "@/utils/validation/documentValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { fetchCNPJData } from "@/services/api/cnpjService";
import { fetchCPFData } from "@/services/api/cpfService";

export function useDocumentHandler(
  personType: string,
  setValue: UseFormSetValue<BankingFormData>
) {
  const [documentValue, setDocumentValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle document change (CPF/CNPJ)
  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeMask(value);
    
    let maskedValue = "";
    
    if (personType === "Pessoa Física") {
      maskedValue = cpfMask(value);
      
      if (cleanValue.length === 11) {
        const isValid = isValidCPF(cleanValue);
        if (isValid) {
          setValue("document", cleanValue);
          setIsLoading(true);
          
          // Fetch CPF data to get personal information
          const cpfData = await fetchCPFData(cleanValue);
          
          if (cpfData) {
            // Fill in personal name
            if (cpfData.nome) {
              setValue("account_holder", cpfData.nome);
            }
            
            // Fill in birth date if available
            if (cpfData.data_nascimento) {
              // Convert DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
              const [day, month, year] = cpfData.data_nascimento.split('/');
              if (day && month && year) {
                const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                setValue("opening_date", formattedDate);
              }
            }
          }
          
          setIsLoading(false);
        }
      }
    } else {
      maskedValue = cnpjMask(value);
      
      // Validate and fetch CNPJ data if complete
      if (cleanValue.length === 14) {
        const isValid = isValidCNPJ(cleanValue);
        
        if (isValid) {
          setValue("document", cleanValue);
          setIsLoading(true);
          
          // Fetch CNPJ data to get the opening date and other details
          const cnpjData = await fetchCNPJData(cleanValue);
          
          if (cnpjData) {
            // Fill in company name
            if (cnpjData.razao_social) {
              setValue("account_holder", cnpjData.razao_social);
            }
            
            // Fill in opening date if available
            if (cnpjData.data_inicio_atividade) {
              // Convert DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
              const [day, month, year] = cnpjData.data_inicio_atividade.split('/');
              if (day && month && year) {
                const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                setValue("opening_date", formattedDate);
              }
            }
          }
          
          setIsLoading(false);
        }
      }
    }
    
    setDocumentValue(maskedValue);
  };

  // Reset all fields when person type changes
  useEffect(() => {
    setDocumentValue("");
    setValue("document", "");
    setValue("account_holder", "");
    setValue("opening_date", "");
  }, [personType, setValue]);

  return {
    documentValue,
    isLoading,
    handleDocumentChange
  };
}
