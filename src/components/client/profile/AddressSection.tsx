import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { cepMask, removeMask } from "@/utils/masks";
import { fetchCepData } from "@/services/cepService";
import { useToast } from "@/hooks/use-toast";
import { capitalizeWords } from "@/utils/textFormat";

interface AddressSectionProps {
  form: UseFormReturn<any>;
}

// Estados com nomes completos e suas respectivas cidades (expandido significativamente)
const statesAndCities = {
  "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó", "Brasileia", "Epitaciolândia", "Xapuri", "Capixaba", "Plácido de Castro"],
  "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo", "União dos Palmares", "São Miguel dos Campos", "Coruripe", "Delmiro Gouveia", "Campo Alegre"],
  "Amapá": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão", "Porto Grande", "Vitória do Jari", "Calçoene", "Amapá", "Ferreira Gomes"],
  "Amazonas": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari", "Tefé", "Tabatinga", "Maués", "São Gabriel da Cachoeira", "Humaitá"],
  "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas", "Jequié", "Teixeira de Freitas", "Alagoinhas", "Porto Seguro", "Simões Filho", "Paulo Afonso", "Eunápolis", "Santo Antônio de Jesus", "Valença", "Candeias", "Guanambi", "Jacobina"],
  "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá", "Pacatuba", "Aquiraz", "Quixeramobim", "Canindé", "Russas", "Crateús", "Tianguá", "Aracati", "Cascavel", "Pacajus"],
  "Distrito Federal": ["Brasília", "Gama", "Taguatinga", "Ceilândia", "Sobradinho", "Planaltina", "Águas Claras", "Vicente Pires", "Samambaia", "Santa Maria"],
  "Espírito Santo": ["Vitória", "Vila Velha", "Cariacica", "Serra", "Cachoeiro de Itapemirim", "Linhares", "São Mateus", "Colatina", "Guarapari", "Viana", "Nova Venécia", "Barra de São Francisco", "Aracruz", "Alegre", "Castelo"],
  "Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama", "Itumbiara", "Senador Canedo", "Catalão", "Jataí", "Planaltina", "Caldas Novas", "Santo Antônio do Descoberto", "Goianésia", "Cidade Ocidental", "Mineiros"],
  "Maranhão": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas", "Barra do Corda", "Chapadinha", "Santa Inês", "Pinheiro", "Pedreiras", "Zé Doca", "Presidente Dutra", "Viana", "Rosário", "Tutóia"],
  "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Barra do Garças", "Primavera do Leste", "Alta Floresta", "Lucas do Rio Verde", "Colíder", "Pontes e Lacerda", "Sorriso", "Nova Mutum", "Diamantino", "Juína", "Mirassol d'Oeste", "Água Boa", "Guarantã do Norte", "Poxoréu"],
  "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí", "Nova Andradina", "Sidrolândia", "Maracaju", "São Gabriel do Oeste", "Coxim", "Aquidauana", "Paranaíba", "Amambai", "Chapadão do Sul", "Anastácio", "Bonito", "Miranda", "Jardim", "Ribas do Rio Pardo"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga", "Sete Lagoas", "Divinópolis", "Santa Luzia", "Ibirité", "Poços de Caldas", "Patos de Minas", "Pouso Alegre", "Teófilo Otoni", "Barbacena", "Sabará", "Varginha", "Conselheiro Lafaiete", "Vespasiano", "Itabira", "Araguari", "Passos", "Ubá", "Coronel Fabriciano", "Muriaé", "Ituiutaba"],
  "Pará": ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal", "Abaetetuba", "Cametá", "Marituba", "Tucuruí", "Bragança", "Paragominas", "Redenção", "Altamira", "Itaituba", "Breves", "Oriximiná", "Capanema", "Tailândia", "Barcarena"],
  "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cajazeiras", "Cabedelo", "Guarabira", "Mamanguape", "Esperança", "Monteiro", "Itabaiana", "Princesa Isabel", "Picuí", "Sumé", "Conceição", "Pombal", "São Bento", "Areia"],
  "Paraná": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais", "Campo Largo", "Arapongas", "Almirante Tamandaré", "Umuarama", "Piraquara", "Cambé", "São Carlos", "Francisco Beltrão", "Fazenda Rio Grande", "Paranavaí", "Carambeí", "Medianeira", "Irati", "Cianorte", "Telêmaco Borba", "Castro"],
  "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Bandeira do Marco", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão", "Igarassu", "São Lourenço da Mata", "Santa Cruz do Capibaribe", "Abreu e Lima", "Ipojuca", "Serra Talhada", "Araripina", "Goiana", "Belo Jardim"],
  "Piauí": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior", "Barras", "União", "Altos", "Pedro II", "Valença do Piauí", "São Raimundo Nonato", "Esperantina", "Oeiras", "Amarante", "Regeneração", "Luzilândia", "Corrente", "Simplício Mendes", "Beneditinos"],
  "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "São João de Meriti", "Petrópolis", "Volta Redonda", "Magé", "Macaé", "Itaboraí", "Cabo Frio", "Angra dos Reis", "Nova Friburgo", "Barra Mansa", "Teresópolis", "Mesquita", "Nilópolis", "Maricá", "Queimados", "Resende", "Araruama", "Tanguá", "Saquarema", "Paracambi", "Mangaratiba", "Guapimirim", "Seropédica"],
  "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Currais Novos", "Caicó", "Açu", "João Câmara", "Nova Cruz", "Santo Antônio", "Canguaretama", "Touros", "São José de Mipibu", "Extremoz", "Santa Cruz", "Pau dos Ferros", "Apodi", "Areia Branca"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul", "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba", "Cachoeira do Sul", "Santana do Livramento", "Ijuí", "Sapiranga", "Santo Ângelo", "Alegrete", "Lajeado", "Marau", "Santa Rosa", "Cruz Alta", "Montenegro", "São Borja", "São Gabriel", "Carazinho", "Venâncio Aires", "Parobé", "Taquara", "Gramado", "Canela", "Osório", "Tramandaí", "Torres", "Capão da Canoa", "Xangri-lá", "Cidreira", "Imbé", "Palmares do Sul", "Mostardas", "Tavares", "São José do Norte", "Jaguarão", "Arroio Grande", "Pedro Osório", "Turuçu", "Cerrito", "Capão do Leão", "Morro Redondo", "Canguçu", "São Lourenço do Sul", "Camaquã", "Tapes", "Arambaré", "Barra do Ribeiro", "Sertão Santana", "Butiá", "Minas do Leão", "Charqueadas", "Triunfo", "General Câmara", "Eldorado do Sul", "Barão", "Mariana Pimentel", "Sertão", "Pantano Grande", "Rio Pardo", "Encruzilhada do Sul", "Amaral Ferrador", "Piratini", "Pinheiro Machado", "Candiota", "Hulha Negra", "Aceguá", "Pedras Altas", "Herval", "Arroio do Padre", "Cristal", "Conquista", "Lavras do Sul", "Caçapava do Sul", "Vila Nova do Sul", "Santana da Boa Vista", "Toropi", "São Vicente do Sul", "Jari", "Nova Palma", "Faxinal do Soturno", "Ivorá", "Dona Francisca", "Pinhal Grande", "São João do Polêsine", "Silveira Martins", "Restinga Sêca", "Formigueiro", "São Sepé", "Dilermando de Aguiar", "Itaara", "São Pedro do Sul", "Mata", "São Martinho da Serra", "Quevedos", "Júlio de Castilhos", "Tupanciretã", "Santiago", "Unistalda", "Jaguari", "Nova Esperança do Sul", "Cacequi", "São Francisco de Assis", "Manoel Viana", "Rosário do Sul", "Dom Pedrito", "São Borja", "Itaqui", "Maçambará", "Alegrete", "Barra do Quaraí", "Quaraí", "Artigas", "Bella Unión", "Uruguaiana", "Barra do Quaraí", "São Gabriel", "Lavras do Sul", "Bagé", "Hulha Negra", "Candiota", "Aceguá", "Pedras Altas", "Herval", "Pinheiro Machado", "Piratini", "Canguçu", "Cerrito", "Pedro Osório", "Arroio Grande", "Jaguarão", "Rio Grande", "São José do Norte", "Mostardas", "Tavares", "Palmares do Sul", "Cidreira", "Tramandaí", "Imbé", "Xangri-lá", "Capão da Canoa", "Torres", "Arroio do Sal", "Terra de Areia", "Maquiné", "Osório", "Santo Antônio da Patrulha", "Rolante", "Riozinho", "Taquara", "Parobé", "Igrejinha", "Três Coroas", "Gramado", "Canela", "Nova Petrópolis", "Picada Café", "Presidente Lucena", "Ivoti", "Dois Irmãos", "Morro Reuter", "São Vendelino", "Portão", "Estância Velha", "Campo Bom", "Novo Hamburgo", "São Leopoldo", "Sapucaia do Sul", "Esteio", "Canoas", "Cachoeirinha", "Gravataí", "Glorinha", "São José do Hortêncio", "Tupandi", "Montenegro", "Pareci Novo", "São Pedro da Serra", "Poço das Antas", "Linha Nova", "Brochier", "Maratá", "Salvador do Sul", "Carlos Barbosa", "Garibaldi", "Bento Gonçalves", "Monte Belo do Sul", "Pinto Bandeira", "Farroupilha", "Caxias do Sul", "Flores da Cunha", "Nova Roma do Sul", "Nova Pádua", "Veranópolis", "Vila Flores", "André da Rocha", "Protásio Alves", "Guabiju", "Vista Alegre do Prata", "São Valentim do Sul", "Nova Araçá", "União da Serra", "Casca", "David Canabarro", "Muliterno", "Serafina Corrêa", "Nova Bassano", "Paraí", "São Domingos do Sul", "Fagundes Varela", "Vila Maria", "Cotiporã", "Barra Funda", "São Jorge", "Água Santa", "Ibiaçá", "Lagoa Vermelha", "Esmeralda", "Vacaria", "Muitos Capões", "Bom Jesus", "São José dos Ausentes", "Cambará do Sul", "São Francisco de Paula"],
  "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura", "Guajará-Mirim", "Jaru", "Ouro Preto do Oeste", "Buritis", "Costa Marques", "Espigão d'Oeste", "Colorado do Oeste", "Cerejeiras", "Pimenta Bueno", "Presidente Médici", "Machadinho d'Oeste", "São Miguel do Guaporé", "Nova Brasilândia d'Oeste", "Theobroma"],
  "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí", "São João da Baliza", "São Luiz", "Bonfim", "Cantá", "Normandia", "Pacaraima", "Iracema", "Amajari", "Caroebe", "Uiramutã"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí", "Lages", "Palhoça", "Balneário Camboriú", "Biguaçu", "Tubarão", "São Bento do Sul", "Caçador", "Camboriú", "Navegantes", "Concórdia", "Rio do Sul", "Araranguá", "Gaspar", "Brusque", "Canoinhas", "São Francisco do Sul", "Videira", "Mafra", "Imbituba", "Jaraguá do Sul", "Içara", "Indaial", "Herval d'Oeste"],
  "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba", "Mauá", "São José dos Campos", "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba", "Piracicaba", "Bauru", "São Vicente", "Franca", "Guarujá", "Taubaté", "Praia Grande", "Limeira", "Suzano", "Taboão da Serra", "Sumaré", "Barueri", "Embu das Artes", "São Carlos", "Marília", "Indaiatuba", "Cotia", "Americana", "Jacareí", "Araraquara", "Santos", "Presidente Prudente", "São José do Rio Preto", "Hortolândia", "Itaquaquecetuba"],
  "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "Tobias Barreto", "Simão Dias", "Propriá", "São Cristóvão", "Laranjeiras", "Umbaúba", "Ribeirópolis", "Aquidabã", "Carmópolis", "Maruim", "Rosário do Catete", "Santo Amaro das Brotas", "Divina Pastora", "Riachuelo", "Barra dos Coqueiros"],
  "Tocantins": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins", "Guaraí", "Formoso do Araguaia", "Dianópolis", "Taguatinga", "Miracema do Tocantins", "Araguatins", "Tocantinópolis", "Pedro Afonso", "Xambioá", "Augustinópolis", "Alvorada", "Wanderlândia", "Ananás", "Filadélfia"]
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

  // Escutar mudanças no CEP vindas do CNPJ
  useEffect(() => {
    const handleCepUpdate = () => {
      const currentCep = form.getValues("zip_code");
      if (currentCep) {
        setCepValue(cepMask(currentCep));
      }
    };

    window.addEventListener('cep-update', handleCepUpdate);
    return () => window.removeEventListener('cep-update', handleCepUpdate);
  }, [form]);

  // Também escutar mudanças diretas no formulário
  useEffect(() => {
    const currentCep = form.watch("zip_code");
    if (currentCep && currentCep !== removeMask(cepValue)) {
      setCepValue(cepMask(currentCep));
    }
  }, [form.watch("zip_code")]);

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
          // Aplicar capitalização nos dados que vêm do CEP
          form.setValue("address", capitalizeWords(cepData.logradouro || ""));
          form.setValue("neighborhood", capitalizeWords(cepData.bairro || ""));
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
