
import { CNPJData, CPFData } from "../types/personalDataTypes";

export const fetchCNPJData = async (cnpj: string): Promise<CNPJData | null> => {
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

export const fetchCPFData = async (cpf: string): Promise<CPFData | null> => {
  try {
    console.log("Buscando dados do CPF:", cpf);
    
    // Primeira tentativa: API ServeRest (gratuita e funcional)
    const response1 = await fetch(`https://api.invertexto.com/api/v1/validator?token=8624|CQSNpGsR6XhQYRELpOPJfxNzUNfEKOAl&value=${cpf}`);
    if (response1.ok) {
      const data = await response1.json();
      console.log("Resposta API invertexto:", data);
      if (data.valid) {
        // Esta API só valida, não retorna dados pessoais
        console.log("CPF válido, mas API não retorna dados pessoais");
      }
    }

    // Simular dados completos para demonstração incluindo endereço
    console.log("Simulando dados completos do CPF para teste...");
    
    // Simular um delay realista
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retornar dados simulados completos para demonstração
    return {
      nome: "João da Silva Santos",
      data_nascimento: "15/03/1985",
      cpf: cpf,
      situacao: "regular",
      endereco: {
        logradouro: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        cidade: "São Paulo",
        uf: "SP",
        cep: "01234567"
      }
    };
    
  } catch (error) {
    console.error("Erro ao buscar dados do CPF:", error);
    return null;
  }
};
