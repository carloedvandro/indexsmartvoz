
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { cpfMask, cnpjMask, removeMask } from "@/utils/masks";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { isValidCNPJ } from "@/utils/validation/documentValidation";
import { capitalizeWords } from "@/utils/textFormat";
import { fetchCNPJData, fetchCPFData } from "../services/documentService";
import { abbreviationToFullName } from "../data/brazilianStates";
import { convertDateFormat } from "../utils/dateUtils";

export const useDocumentHandler = (form: UseFormReturn<any>) => {
  const [documentValue, setDocumentValue] = useState(form.getValues("cnpj") || "");
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);
  const [isLoadingCPF, setIsLoadingCPF] = useState(false);

  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeMask(value);
    const personType = form.watch("person_type");
    
    let maskedValue = "";
    if (personType === "Pessoa Física") {
      maskedValue = cpfMask(value);
      console.log("CPF digitado:", cleanValue, "Comprimento:", cleanValue.length);
      
      // Validar CPF se estiver completo
      if (cleanValue.length === 11) {
        console.log("CPF completo, validando...");
        const isValid = isValidCPF(cleanValue);
        console.log("CPF válido:", isValid);
        
        if (!isValid) {
          form.setError("cnpj", { message: "CPF inválido" });
        } else {
          form.clearErrors("cnpj");
          // Buscar dados do CPF automaticamente
          console.log("Iniciando busca de dados do CPF...");
          setIsLoadingCPF(true);
          try {
            const cpfData = await fetchCPFData(cleanValue);
            console.log("Dados retornados do CPF:", cpfData);
            
            if (cpfData) {
              // Preencher nome completo com capitalização
              if (cpfData.nome) {
                console.log("Preenchendo nome:", cpfData.nome);
                form.setValue("full_name", capitalizeWords(cpfData.nome));
              }
              
              // Preencher data de nascimento se disponível
              if (cpfData.data_nascimento) {
                console.log("Preenchendo data de nascimento:", cpfData.data_nascimento);
                const formattedDate = convertDateFormat(cpfData.data_nascimento);
                if (formattedDate) {
                  console.log("Data formatada:", formattedDate);
                  form.setValue("birth_date", formattedDate);
                }
              }

              // Preencher endereço se disponível
              if (cpfData.endereco) {
                console.log("Preenchendo endereço do CPF:", cpfData.endereco);
                
                if (cpfData.endereco.logradouro) {
                  form.setValue("address", capitalizeWords(cpfData.endereco.logradouro));
                }
                
                if (cpfData.endereco.numero) {
                  form.setValue("address_number", cpfData.endereco.numero);
                }
                
                if (cpfData.endereco.bairro) {
                  form.setValue("neighborhood", capitalizeWords(cpfData.endereco.bairro));
                }
                
                if (cpfData.endereco.cidade) {
                  form.setValue("city", cpfData.endereco.cidade);
                }
                
                if (cpfData.endereco.uf) {
                  // Converter abreviação para nome completo
                  const fullStateName = abbreviationToFullName[cpfData.endereco.uf];
                  if (fullStateName) {
                    form.setValue("state", fullStateName);
                  }
                }
                
                if (cpfData.endereco.cep) {
                  const cleanCep = cpfData.endereco.cep.replace(/\D/g, '');
                  form.setValue("zip_code", cleanCep);
                  // Disparar evento para atualizar o campo CEP na interface
                  const event = new Event('cep-update');
                  window.dispatchEvent(event);
                }
              }
            } else {
              console.log("Nenhum dado encontrado para o CPF");
            }
          } catch (error) {
            console.error("Erro ao buscar dados do CPF:", error);
          } finally {
            setIsLoadingCPF(false);
          }
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
            console.log("Dados do CNPJ recebidos:", cnpjData);
            
            if (cnpjData) {
              // Preencher campos automaticamente com capitalização
              if (cnpjData.razao_social || cnpjData.nome_fantasia) {
                const companyName = cnpjData.razao_social || cnpjData.nome_fantasia || "";
                console.log("Preenchendo nome da empresa:", companyName);
                form.setValue("full_name", capitalizeWords(companyName));
              }
              
              // Preencher data de abertura da empresa
              if (cnpjData.data_inicio_atividade) {
                console.log("Data de início da atividade recebida:", cnpjData.data_inicio_atividade);
                const formattedDate = convertDateFormat(cnpjData.data_inicio_atividade);
                if (formattedDate) {
                  console.log("Data de abertura formatada:", formattedDate);
                  form.setValue("birth_date", formattedDate);
                } else {
                  console.log("Erro ao formatar data de abertura");
                }
              }

              // Preencher endereço se disponível com capitalização
              if (cnpjData.logradouro) {
                form.setValue("address", capitalizeWords(cnpjData.logradouro));
              }
              
              if (cnpjData.numero) {
                form.setValue("address_number", cnpjData.numero);
              }
              
              if (cnpjData.bairro) {
                form.setValue("neighborhood", capitalizeWords(cnpjData.bairro));
              }
              
              if (cnpjData.municipio) {
                form.setValue("city", cnpjData.municipio);
              }
              
              if (cnpjData.uf) {
                // Converter abreviação para nome completo
                const fullStateName = abbreviationToFullName[cnpjData.uf];
                if (fullStateName) {
                  form.setValue("state", fullStateName);
                }
              }
              
              if (cnpjData.cep) {
                const cleanCep = cnpjData.cep.replace(/\D/g, '');
                form.setValue("zip_code", cleanCep);
                // Disparar evento para atualizar o campo CEP na interface
                const event = new Event('cep-update');
                window.dispatchEvent(event);
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

  return {
    documentValue,
    setDocumentValue,
    isLoadingCNPJ,
    isLoadingCPF,
    handleDocumentChange
  };
};
