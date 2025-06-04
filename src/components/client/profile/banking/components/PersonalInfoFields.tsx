
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, UseFormSetValue } from "react-hook-form";
import { BankingFormData } from "../schemas/bankingSchema";
import { useState, useEffect } from "react";
import { cnpjMask, cpfMask, removeMask } from "@/utils/masks";
import { isValidCNPJ } from "@/utils/validation/documentValidation";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { log, logDocumentData, logError } from "@/utils/logging/userLogger";

interface PersonalInfoFieldsProps {
  control: Control<BankingFormData>;
  setValue: UseFormSetValue<BankingFormData>;
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

interface CPFData {
  nome?: string;
  data_nascimento?: string;
  cpf?: string;
  situacao?: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
  };
}

export function PersonalInfoFields({ control, setValue }: PersonalInfoFieldsProps) {
  const [documentValue, setDocumentValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const personType = control._formValues.person_type || "";
  
  // Function to fetch CNPJ data
  const fetchCNPJData = async (cnpj: string): Promise<CNPJData | null> => {
    try {
      log("info", "Fetching CNPJ data", { cnpj });
      setIsLoading(true);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch CPF data (simulated for demonstration)
  const fetchCPFData = async (cpf: string): Promise<CPFData | null> => {
    try {
      log("info", "Fetching CPF data", { cpf });
      setIsLoading(true);
      
      // Simular dados do CPF com endereço para demonstração
      // Em produção, isso seria uma API real de consulta de CPF
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados baseados no CPF
      const mockData: CPFData = {
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
      
      logDocumentData("CPF", mockData);
      return mockData;
    } catch (error) {
      logError("Error fetching CPF data", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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
        }
      }
    } else {
      maskedValue = cnpjMask(value);
      
      // Validate and fetch CNPJ data if complete
      if (cleanValue.length === 14) {
        const isValid = isValidCNPJ(cleanValue);
        
        if (isValid) {
          setValue("document", cleanValue);
          
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
        }
      }
    }
    
    setDocumentValue(maskedValue);
  };

  // Reset document value when person type changes
  useEffect(() => {
    setDocumentValue("");
  }, [personType]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="person_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de pessoa</FormLabel>
            <Select onValueChange={(value) => {
              field.onChange(value);
              setDocumentValue("");
            }} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de pessoa" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Pessoa Física">Pessoa Física</SelectItem>
                <SelectItem value="Pessoa Jurídica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {personType && (
        <FormItem>
          <FormLabel>{personType === "Pessoa Física" ? "CPF" : "CNPJ"}</FormLabel>
          <div className="relative">
            <Input
              value={documentValue}
              onChange={handleDocumentChange}
              placeholder={personType === "Pessoa Física" ? "000.000.000-00" : "00.000.000/0000-00"}
              className={isLoading ? "pr-10" : ""}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </FormItem>
      )}

      <FormField
        control={control}
        name="account_holder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {personType === "Pessoa Jurídica" ? "Razão social" : "Nome completo"}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="opening_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{personType === "Pessoa Física" ? "Data de nascimento" : "Data de abertura"}</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
