import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { isValidCNPJ } from "@/utils/validation/documentValidation";
import { fetchCPFData } from "@/services/api/cpfService";
import { fetchCNPJData } from "@/services/api/cnpjService";
import { capitalizeWords } from "@/utils/textFormat";

// Mapeamento para converter abreviações para nomes completos
const abbreviationToFullName: { [key: string]: string } = {
  "AC": "Acre",
  "AL": "Alagoas",
  "AP": "Amapá",
  "AM": "Amazonas",
  "BA": "Bahia",
  "CE": "Ceará",
  "DF": "Distrito Federal",
  "ES": "Espírito Santo",
  "GO": "Goiás",
  "MA": "Maranhão",
  "MT": "Mato Grosso",
  "MS": "Mato Grosso do Sul",
  "MG": "Minas Gerais",
  "PA": "Pará",
  "PB": "Paraíba",
  "PR": "Paraná",
  "PE": "Pernambuco",
  "PI": "Piauí",
  "RJ": "Rio de Janeiro",
  "RN": "Rio Grande do Norte",
  "RS": "Rio Grande do Sul",
  "RO": "Rondônia",
  "RR": "Roraima",
  "SC": "Santa Catarina",
  "SP": "São Paulo",
  "SE": "Sergipe",
  "TO": "Tocantins"
};

export function useDocumentValidation(form: UseFormReturn<any>, personType: string) {
  const [isLoadingCPF, setIsLoadingCPF] = useState(false);
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);
  const [cpfMessage, setCpfMessage] = useState("");

  const fillCPFData = async (cleanValue: string) => {
    console.log("Iniciando busca de dados do CPF...");
    setIsLoadingCPF(true);
    setCpfMessage("Verificando CPF...");
    
    try {
      const cpfData = await fetchCPFData(cleanValue);
      console.log("Dados retornados do CPF:", cpfData);
      
      if (cpfData && cpfData.nome) {
        // Preencher nome completo com capitalização
        console.log("Preenchendo nome:", cpfData.nome);
        form.setValue("full_name", capitalizeWords(cpfData.nome));
        
        // Preencher data de nascimento se disponível
        if (cpfData.data_nascimento) {
          console.log("Preenchendo data de nascimento:", cpfData.data_nascimento);
          // Converter formato da data de DD/MM/YYYY para YYYY-MM-DD
          const [day, month, year] = cpfData.data_nascimento.split('/');
          if (day && month && year) {
            const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            console.log("Data formatada:", formattedDate);
            form.setValue("birth_date", formattedDate);
          }
        }

        // Preencher endereço se disponível
        if (cpfData.endereco) {
          console.log("Preenchendo dados de endereço do CPF:", cpfData.endereco);
          
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
          }
        }
        
        setCpfMessage("Dados preenchidos automaticamente");
      } else {
        console.log("Nenhum dado encontrado para o CPF - preenchimento manual necessário");
        setCpfMessage("CPF válido - preencha os dados manualmente");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do CPF:", error);
      setCpfMessage("CPF válido - preencha os dados manualmente");
    } finally {
      setIsLoadingCPF(false);
      // Limpar mensagem após 3 segundos
      setTimeout(() => setCpfMessage(""), 3000);
    }
  };

  const fillCNPJData = async (cleanValue: string) => {
    console.log("Iniciando busca de dados do CNPJ...");
    setIsLoadingCNPJ(true);
    try {
      const cnpjData = await fetchCNPJData(cleanValue);
      console.log("Dados retornados do CNPJ:", cnpjData);
      
      if (cnpjData) {
        // Preencher campos automaticamente com capitalização
        if (cnpjData.razao_social || cnpjData.nome_fantasia) {
          const companyName = cnpjData.razao_social || cnpjData.nome_fantasia || "";
          console.log("Preenchendo razão social:", companyName);
          form.setValue("full_name", capitalizeWords(companyName));
        }
        
        // Preencher data de abertura se disponível
        if (cnpjData.data_inicio_atividade) {
          console.log("Data de abertura recebida da API:", cnpjData.data_inicio_atividade);
          
          // A API BrasilAPI retorna no formato YYYY-MM-DD, que é o formato correto para input[type="date"]
          if (cnpjData.data_inicio_atividade.includes('-')) {
            // Se já está no formato YYYY-MM-DD
            console.log("Data já no formato correto:", cnpjData.data_inicio_atividade);
            form.setValue("birth_date", cnpjData.data_inicio_atividade);
          } else if (cnpjData.data_inicio_atividade.includes('/')) {
            // Se está no formato DD/MM/YYYY, converter para YYYY-MM-DD
            const [day, month, year] = cnpjData.data_inicio_atividade.split('/');
            if (day && month && year) {
              const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
              console.log("Data convertida de DD/MM/YYYY para YYYY-MM-DD:", formattedDate);
              form.setValue("birth_date", formattedDate);
            }
          }
        }

        // Preencher endereço se disponível com capitalização
        if (cnpjData.logradouro) {
          console.log("Preenchendo logradouro:", cnpjData.logradouro);
          form.setValue("address", capitalizeWords(cnpjData.logradouro));
        }
        
        if (cnpjData.numero) {
          console.log("Preenchendo número:", cnpjData.numero);
          form.setValue("address_number", cnpjData.numero);
        }
        
        if (cnpjData.bairro) {
          console.log("Preenchendo bairro:", cnpjData.bairro);
          form.setValue("neighborhood", capitalizeWords(cnpjData.bairro));
        }
        
        if (cnpjData.municipio) {
          console.log("Preenchendo cidade:", cnpjData.municipio);
          form.setValue("city", cnpjData.municipio);
        }
        
        if (cnpjData.uf) {
          console.log("Preenchendo estado:", cnpjData.uf);
          // Converter abreviação para nome completo
          const fullStateName = abbreviationToFullName[cnpjData.uf];
          if (fullStateName) {
            form.setValue("state", fullStateName);
          }
        }
        
        if (cnpjData.cep) {
          console.log("Preenchendo CEP:", cnpjData.cep);
          const cleanCep = cnpjData.cep.replace(/\D/g, '');
          form.setValue("zip_code", cleanCep);
        }
      } else {
        console.log("Nenhum dado encontrado para o CNPJ");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do CNPJ:", error);
    } finally {
      setIsLoadingCNPJ(false);
    }
  };

  const validateCPF = (cleanValue: string) => {
    console.log("CPF completo, validando...");
    const isValid = isValidCPF(cleanValue);
    console.log("CPF válido:", isValid);
    
    if (!isValid) {
      form.setError("cnpj", { message: "CPF inválido" });
      setCpfMessage("");
    } else {
      form.clearErrors("cnpj");
      fillCPFData(cleanValue);
    }
  };

  const validateCNPJ = (cleanValue: string) => {
    console.log("CNPJ completo, validando...");
    const isValid = isValidCNPJ(cleanValue);
    console.log("CNPJ válido:", isValid);
    
    if (!isValid) {
      form.setError("cnpj", { message: "CNPJ inválido" });
    } else {
      form.clearErrors("cnpj");
      fillCNPJData(cleanValue);
    }
  };

  return {
    isLoadingCPF,
    isLoadingCNPJ,
    validateCPF,
    validateCNPJ,
    cpfMessage,
    isLoadingDocument: isLoadingCPF || isLoadingCNPJ
  };
}
