
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cpfMask, cnpjMask, removeMask, cepMask } from "@/utils/masks";
import { isValidCPF } from "@/utils/validation/cpfValidation";
import { isValidCNPJ } from "@/utils/validation/documentValidation";
import { capitalizeWords } from "@/utils/textFormat";
import { fetchCPFData } from "@/services/api/cpfService";
import { fetchCNPJData } from "@/services/api/cnpjService";

interface PersonalDataSectionProps {
  form: UseFormReturn<any>;
}

// Estados com nomes completos e suas respectivas cidades principais
const statesAndCities = {
  "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
  "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo"],
  "Amapá": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  "Amazonas": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
  "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas"],
  "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca"],
  "Distrito Federal": ["Brasília", "Gama", "Taguatinga", "Ceilândia", "Sobradinho"],
  "Espírito Santo": ["Vitória", "Vila Velha", "Cariacica", "Serra", "Cachoeiro de Itapemirim", "Linhares"],
  "Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás"],
  "Maranhão": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó"],
  "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres"],
  "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba"],
  "Pará": ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal"],
  "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa"],
  "Paraná": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu"],
  "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Bandeira do Marco", "Caruaru", "Petrolina", "Paulista"],
  "Piauí": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior"],
  "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes"],
  "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão"],
  "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura"],
  "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí"],
  "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba"],
  "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "Tobias Barreto"],
  "Tocantins": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins"]
};

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

export function PersonalDataSection({ form }: PersonalDataSectionProps) {
  const personType = form.watch("person_type");
  const [documentValue, setDocumentValue] = useState(form.getValues("cnpj") || "");
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);
  const [isLoadingCPF, setIsLoadingCPF] = useState(false);

  const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = removeMask(value);
    
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
      console.log("CNPJ digitado:", cleanValue, "Comprimento:", cleanValue.length);
      
      // Validar CNPJ se estiver completo
      if (cleanValue.length === 14) {
        console.log("CNPJ completo, validando...");
        const isValid = isValidCNPJ(cleanValue);
        console.log("CNPJ válido:", isValid);
        
        if (!isValid) {
          form.setError("cnpj", { message: "CNPJ inválido" });
        } else {
          form.clearErrors("cnpj");
          // Buscar dados do CNPJ automaticamente
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
                console.log("Preenchendo data de abertura:", cnpjData.data_inicio_atividade);
                // Converter formato da data de DD/MM/YYYY para YYYY-MM-DD
                const [day, month, year] = cnpjData.data_inicio_atividade.split('/');
                if (day && month && year) {
                  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                  console.log("Data de abertura formatada:", formattedDate);
                  form.setValue("birth_date", formattedDate);
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
        }
      }
    }
    
    setDocumentValue(maskedValue);
    form.setValue("cnpj", cleanValue);
  };

  // Função para lidar com mudanças no campo nome completo
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("full_name", value);
  };

  // Função para lidar com mudanças no tipo de pessoa
  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPersonType = e.target.value;
    form.setValue("person_type", newPersonType);
    
    // Limpar todos os campos relacionados quando mudar o tipo de pessoa
    setDocumentValue("");
    form.setValue("cnpj", "");
    form.setValue("full_name", "");
    form.setValue("birth_date", "");
    form.setValue("address", "");
    form.setValue("address_number", "");
    form.setValue("neighborhood", "");
    form.setValue("city", "");
    form.setValue("state", "");
    form.setValue("zip_code", "");
    form.clearErrors("cnpj");
    
    console.log("Tipo de pessoa alterado para:", newPersonType, "- Campos limpos");
  };

  const isLoadingDocument = isLoadingCPF || isLoadingCNPJ;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-medium text-gray-700">Dados Pessoais</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2 w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            {personType === "Pessoa Jurídica" ? "Razão Social" : "Nome completo"} <span className="text-red-500">*</span>
          </label>
          <input
            value={form.watch("full_name") || ""}
            onChange={handleFullNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder={personType === "Pessoa Jurídica" ? "Razão Social" : "Nome completo"}
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
            value={form.watch("person_type") || ""}
            onChange={handlePersonTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
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
