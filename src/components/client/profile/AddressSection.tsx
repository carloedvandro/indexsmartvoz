
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cepMask, removeMask } from "@/utils/masks";
import { fetchCepData } from "@/services/cepService";
import { useToast } from "@/hooks/use-toast";
import { capitalizeWords } from "@/utils/textFormat";

interface AddressSectionProps {
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

// Mapeamento para converter nomes completos para abreviações (para compatibilidade com CEP)
const stateAbbreviations: { [key: string]: string } = {
  "Acre": "AC",
  "Alagoas": "AL",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Bahia": "BA",
  "Ceará": "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  "Goiás": "GO",
  "Maranhão": "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  "Pará": "PA",
  "Paraíba": "PB",
  "Paraná": "PR",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  "Sergipe": "SE",
  "Tocantins": "TO"
};

// Mapeamento reverso para converter abreviações para nomes completos
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

export function AddressSection({ form }: AddressSectionProps) {
  const [cepValue, setCepValue] = useState(form.getValues("zip_code") || "");
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const { toast } = useToast();
  
  const selectedState = form.watch("state");
  const cities = selectedState ? statesAndCities[selectedState as keyof typeof statesAndCities] || [] : [];

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const maskedValue = cepMask(value);
    const cleanValue = removeMask(value);
    
    setCepValue(maskedValue);
    form.setValue("zip_code", cleanValue);
    
    // Se CEP estiver completo, buscar endereço
    if (cleanValue.length === 8) {
      setIsLoadingCep(true);
      try {
        const cepData = await fetchCepData(cleanValue);
        if (cepData) {
          form.setValue("address", capitalizeWords(cepData.logradouro));
          form.setValue("neighborhood", capitalizeWords(cepData.bairro));
          form.setValue("city", cepData.localidade);
          // Converter abreviação do CEP para nome completo
          const fullStateName = abbreviationToFullName[cepData.uf];
          if (fullStateName) {
            form.setValue("state", fullStateName);
          }
          
          toast({
            title: "CEP encontrado",
            description: "Endereço preenchido automaticamente",
          });
        } else {
          toast({
            title: "CEP não encontrado",
            description: "Verifique o CEP digitado",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Erro ao buscar CEP",
          description: "Tente novamente",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("address", value);
  };

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("neighborhood", value);
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeWords(e.target.value);
    form.setValue("complement", value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <MapPin className="h-5 w-5 text-gray-600" />
        <h3 className="text-base font-medium text-gray-700">Endereço</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            CEP <span className="text-red-500">*</span>
          </label>
          <input
            value={cepValue}
            onChange={handleCepChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="00000-000"
            maxLength={9}
            disabled={isLoadingCep}
          />
          {isLoadingCep && (
            <p className="text-blue-500 text-xs mt-1">Buscando endereço...</p>
          )}
          {form.formState.errors.zip_code && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.zip_code.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("state")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="">Selecione o estado</option>
            {Object.keys(statesAndCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {form.formState.errors.state && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.state.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Cidade <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("city")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none pr-10 text-sm"
            disabled={!selectedState}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="">
              {selectedState ? "Selecione a cidade" : "Primeiro selecione o estado"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {form.formState.errors.city && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.city.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Endereço <span className="text-red-500">*</span>
          </label>
          <input
            value={form.watch("address") || ""}
            onChange={handleAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="Rua, Avenida, etc."
          />
          {form.formState.errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.address.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Número <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("address_number")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="123"
          />
          {form.formState.errors.address_number && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.address_number.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Bairro <span className="text-red-500">*</span>
          </label>
          <input
            value={form.watch("neighborhood") || ""}
            onChange={handleNeighborhoodChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="Nome do bairro"
          />
          {form.formState.errors.neighborhood && (
            <p className="text-red-500 text-xs mt-1">
              {String(form.formState.errors.neighborhood.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Complemento
          </label>
          <input
            value={form.watch("complement") || ""}
            onChange={handleComplementChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            placeholder="Apto, Bloco, etc."
          />
        </div>
      </div>
    </div>
  );
}
