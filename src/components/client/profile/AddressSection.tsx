
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cepMask, removeMask } from "@/utils/masks";
import { fetchCepData } from "@/services/cepService";
import { useToast } from "@/hooks/use-toast";

interface AddressSectionProps {
  form: UseFormReturn<any>;
}

// Estados e suas respectivas cidades principais (mantendo as principais para performance)
const statesAndCities = {
  "AC": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
  "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo"],
  "AP": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  "AM": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
  "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas"],
  "CE": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca"],
  "DF": ["Brasília", "Gama", "Taguatinga", "Ceilândia", "Sobradinho"],
  "ES": ["Vitória", "Vila Velha", "Cariacica", "Serra", "Cachoeiro de Itapemirim", "Linhares"],
  "GO": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás"],
  "MA": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó"],
  "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres"],
  "MS": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí"],
  "MG": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba"],
  "PA": ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal"],
  "PB": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa"],
  "PR": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu"],
  "PE": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Bandeira do Marco", "Caruaru", "Petrolina", "Paulista"],
  "PI": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior"],
  "RJ": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes"],
  "RN": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim"],
  "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão"],
  "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura"],
  "RR": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí"],
  "SC": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí"],
  "SP": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba"],
  "SE": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "Tobias Barreto"],
  "TO": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins"]
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
          form.setValue("address", cepData.logradouro);
          form.setValue("neighborhood", cepData.bairro);
          form.setValue("city", cepData.localidade);
          form.setValue("state", cepData.uf);
          
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <MapPin className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-700">Endereço</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CEP <span className="text-red-500">*</span>
          </label>
          <input
            value={cepValue}
            onChange={handleCepChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="00000-000"
            maxLength={9}
            disabled={isLoadingCep}
          />
          {isLoadingCep && (
            <p className="text-blue-500 text-sm mt-1">Buscando endereço...</p>
          )}
          {form.formState.errors.zip_code && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.zip_code.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("state")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
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
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.state.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade <span className="text-red-500">*</span>
          </label>
          <select
            {...form.register("city")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
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
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.city.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Rua, Avenida, etc."
          />
          {form.formState.errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.address.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("address_number")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="123"
          />
          {form.formState.errors.address_number && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.address_number.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bairro <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("neighborhood")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nome do bairro"
          />
          {form.formState.errors.neighborhood && (
            <p className="text-red-500 text-sm mt-1">
              {String(form.formState.errors.neighborhood.message || "Campo obrigatório")}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complemento
          </label>
          <input
            {...form.register("complement")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Apto, Bloco, etc."
          />
        </div>
      </div>
    </div>
  );
}
