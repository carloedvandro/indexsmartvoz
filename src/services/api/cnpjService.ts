
import { log, logDocumentData, logError } from "@/utils/logging/userLogger";

export interface CNPJData {
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

export const fetchCNPJData = async (cnpj: string): Promise<CNPJData | null> => {
  try {
    log("info", "Fetching CNPJ data", { cnpj });
    
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log("Dados brutos da API Brasil:", data);
      
      // Mapear os dados da API para o formato esperado
      const mappedData: CNPJData = {
        razao_social: data.razao_social || data.nome_empresarial,
        nome_fantasia: data.nome_fantasia,
        data_inicio_atividade: data.data_inicio_atividade,
        cnpj: data.cnpj,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        municipio: data.municipio,
        uf: data.uf,
        cep: data.cep
      };
      
      console.log("Dados mapeados:", mappedData);
      logDocumentData("CNPJ", mappedData);
      return mappedData;
    } else {
      console.log("Erro na resposta da API:", response.status, response.statusText);
      return null;
    }
  } catch (error) {
    logError("Error fetching CNPJ data", error);
    console.error("Erro completo ao buscar CNPJ:", error);
    return null;
  }
};
