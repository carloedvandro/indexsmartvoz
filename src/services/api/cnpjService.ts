
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
      logDocumentData("CNPJ", data);
      return data;
    }
    
    return null;
  } catch (error) {
    logError("Error fetching CNPJ data", error);
    return null;
  }
};
