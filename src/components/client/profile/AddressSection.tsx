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

// Estados com nomes completos e suas respectivas cidades (expandido com todas as cidades)
const statesAndCities = {
  "Acre": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó", "Brasileia", "Epitaciolândia", "Xapuri", "Capixaba", "Plácido de Castro", "Acrelândia", "Assis Brasil", "Bujari", "Jordão", "Manoel Urbano", "Marechal Thaumaturgo", "Mâncio Lima", "Porto Acre", "Porto Walter", "Rodrigues Alves", "Santa Rosa do Purus", "Senador Guiomard"],
  "Alagoas": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "Penedo", "União dos Palmares", "São Miguel dos Campos", "Coruripe", "Delmiro Gouveia", "Campo Alegre", "Santana do Ipanema", "Girau do Ponciano", "Viçosa", "São Luís do Quitunde", "Maribondo", "Pilar", "Marechal Deodoro", "Igaci", "Branquinha", "Campestre", "Anadia", "Flexeiras", "Messias", "Murici", "São Sebastião", "Craíbas", "Feira Grande", "Quebrangulo", "São José da Tapera", "Traipu", "Água Branca", "Canapi", "Delmiro Gouveia", "Inhapi", "Mata Grande", "Olho d'Água do Casado", "Pariconha", "Piranhas", "Batalha", "Belo Monte", "Cacimbinhas", "Jacaré dos Homens", "Major Isidoro", "Monteirópolis", "Olivença", "Ouro Branco", "Palestina", "Pão de Açúcar", "Poço das Trincheiras", "Santana do Mundaú", "São Brás", "São José da Laje", "Taquarana", "Teotônio Vilela", "Atalaia", "Barra de Santo Antônio", "Barra de São Miguel", "Cajueiro", "Capela", "Colônia Leopoldina", "Jequiá da Praia", "Joaquim Gomes", "Jundiá", "Junqueiro", "Maragogi", "Nova Floresta", "Novo Lino", "Paripueira", "Passo de Camaragibe", "Paulo Jacinto", "Porto Calvo", "Porto de Pedras", "Roteiro", "São Luís do Quitunde", "Belém", "Cacimbinhas", "Carneiros", "Coité do Nóia", "Dois Riachos", "Estrela de Alagoas", "Jaramataia", "Minador do Negrão", "Olho d'Água das Flores", "Olivença", "Senador Rui Palmeira"],
  "Amapá": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão", "Porto Grande", "Vitória do Jari", "Calçoene", "Amapá", "Ferreira Gomes", "Cutias", "Itaubal", "Pedra Branca do Amapari", "Pracuúba", "Serra do Navio", "Tartarugalzinho"],
  "Amazonas": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari", "Tefé", "Tabatinga", "Maués", "São Gabriel da Cachoeira", "Humaitá", "Lábrea", "Manicoré", "Barcelos", "Eirunepé", "Santa Isabel do Rio Negro", "Carauari", "Fonte Boa", "Tonantins", "Benjamin Constant", "Novo Airão", "Presidente Figueiredo", "Rio Preto da Eva", "Iranduba", "Careiro", "Autazes", "Silves", "Urucurituba", "São Sebastião do Uatumã", "Itapiranga", "Urucará", "Nhamundá", "Barreirinha", "Boa Vista do Ramos", "Maués", "Novo Aripuanã", "Apuí", "Borba", "Nova Olinda do Norte", "Canutama", "Tapauá", "Beruri", "Anori", "Anamã", "Codajás", "Careiro da Várzea", "Manaquiri", "Caapiranga", "Alvarães", "Uarini", "Maraã", "Jutaí", "São Paulo de Olivença", "Amaturá", "Santo Antônio do Içá", "Atalaia do Norte", "Guajará", "Ipixuna", "Envira", "Feijó", "Carauari", "Juruá", "Itamarati", "Japurá", "Pauini", "Boca do Acre", "Canutama"],
  "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas", "Jequié", "Teixeira de Freitas", "Alagoinhas", "Porto Seguro", "Simões Filho", "Paulo Afonso", "Eunápolis", "Santo Antônio de Jesus", "Valença", "Candeias", "Guanambi", "Jacobina", "Senhor do Bonfim", "Serrinha", "Itapetinga", "Irecê", "Casa Nova", "Brumado", "Conceição do Coité", "Tucano", "Euclides da Cunha", "Ribeira do Pombal", "Santaluz", "Monte Santo", "Cícero Dantas", "Jeremoabo", "Paulo Afonso", "Glória", "Rodelas", "Chorrochó", "Macururé", "Petrolina", "Remanso", "Sobradinho", "Sento Sé", "Campo Formoso", "Juazeiro", "Curaçá", "Uauá", "Andorinha", "Antônio Gonçalves", "Caldeirão Grande", "Filadélfia", "Itiúba", "Jaguarari", "Pindobaçu", "Ponto Novo", "Quijingue", "Saúde", "Senhor do Bonfim", "Serrolândia", "Umburanas", "Várzea da Roça", "Várzea do Poço", "Várzea Nova"],
  "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato", "Itapipoca", "Maranguape", "Iguatu", "Quixadá", "Pacatuba", "Aquiraz", "Quixeramobim", "Canindé", "Russas", "Crateús", "Tianguá", "Aracati", "Cascavel", "Pacajus", "Horizonte", "São Gonçalo do Amarante", "Eusébio", "Pacatuba", "Guaiúba", "Itaitinga", "Chorozinho", "Ocara", "Aracoiaba", "Redenção", "Acarape", "Barreira", "Capistrano", "Palmácia", "Pacoti", "Guaramiranga", "Mulungu", "Baturité", "Caridade", "Ibaretama", "Baixio", "Aracoiaba", "Aratuba", "Itapiúna", "Ocara", "Pacoti", "Palmácia", "Redenção", "Acarape", "Barreira", "Baturité", "Capistrano", "Guaramiranga", "Itapiúna", "Mulungu", "Pacoti", "Palmácia"],
  "Distrito Federal": ["Brasília", "Gama", "Taguatinga", "Ceilândia", "Sobradinho", "Planaltina", "Águas Claras", "Vicente Pires", "Samambaia", "Santa Maria", "São Sebastião", "Recanto das Emas", "Riacho Fundo", "Núcleo Bandeirante", "Brazlândia", "Cruzeiro", "Sudoeste/Octogonal", "Lago Sul", "Lago Norte", "Jardim Botânico", "SIA", "Guará", "Candangolândia", "Paranoá", "Itapoã", "Fercal", "SCIA", "Sobradinho II", "Varjão"],
  "Espírito Santo": ["Vitória", "Vila Velha", "Cariacica", "Serra", "Cachoeiro de Itapemirim", "Linhares", "São Mateus", "Colatina", "Guarapari", "Viana", "Nova Venécia", "Barra de São Francisco", "Aracruz", "Alegre", "Castelo", "Marataízes", "Anchieta", "Piúma", "Itapemirim", "Presidente Kennedy", "Iconha", "Rio Novo do Sul", "Vargem Alta", "Jerônimo Monteiro", "Atilio Vivacqua", "Muqui", "Mimoso do Sul", "Apiacá", "Bom Jesus do Norte", "Divino de São Lourenço", "Dores do Rio Preto", "Guaçuí", "Ibitirama", "Iúna", "Muniz Freire", "São José do Calçado", "Conceição do Castelo", "Venda Nova do Imigrante", "Domingos Martins", "Marechal Floriano", "Alfredo Chaves", "Brejetuba", "Laranja da Terra", "Santa Leopoldina", "Santa Maria de Jetibá", "Santa Teresa", "Fundão", "Ibiraçu", "João Neiva", "Rio Bananal", "Baixo Guandu", "Governador Lindenberg", "Itaguaçu", "Itarana", "Laranja da Terra", "Marilândia", "Pancas", "Rio Bananal", "São Domingos do Norte", "São Gabriel da Palha", "São Roque do Canaã", "Vila Valério"],
  "Goiás": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás", "Valparaíso de Goiás", "Trindade", "Formosa", "Novo Gama", "Itumbiara", "Senador Canedo", "Catalão", "Jataí", "Planaltina", "Caldas Novas", "Santo Antônio do Descoberto", "Goianésia", "Cidade Ocidental", "Mineiros", "Quirinópolis", "Cristalina", "Inhumas", "Alexânia", "Nerópolis", "Abadia de Goiás", "Hidrolândia", "Goianira", "Bela Vista de Goiás", "Santa Helena de Goiás", "Morrinhos", "Piracanjuba", "Palmeiras de Goiás", "Porangatu", "Minaçu", "Niquelândia", "Uruaçu", "Ceres", "Goianésia", "Itapaci", "Rialma", "Rubiataba", "Santa Isabel", "São Luíz do Norte", "Guaraíta", "Itapuranga", "Jaraguá", "Pilar de Goiás", "Santa Rosa de Goiás", "Carmo do Rio Verde", "Crixás", "Fazenda Nova", "Goiás", "Itaberaí", "Jesúpolis", "Matrinchã", "Morro Agudo de Goiás", "Nova América", "Sanclerlândia", "São Luíz de Montes Belos", "Turvânia"],
  "Maranhão": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia", "Bacabal", "Balsas", "Barra do Corda", "Chapadinha", "Santa Inês", "Pinheiro", "Pedreiras", "Zé Doca", "Presidente Dutra", "Viana", "Rosário", "Tutóia", "Coroatá", "Lago da Pedra", "São Mateus do Maranhão", "Arari", "Vitória do Mearim", "Esperantinópolis", "Igarapé Grande", "Lima Campos", "Tuntum", "Governador Archer", "Governador Luiz Rocha", "São Raimundo das Mangabeiras", "Carolina", "Riachão", "Estreito", "Porto Franco", "Davinópolis", "João Lisboa", "Montes Altos", "Amarante do Maranhão", "Sítio Novo", "Campestre do Maranhão", "Nova Iorque", "Lajeado Novo", "São Pedro dos Crentes", "Fortaleza dos Nogueiras", "São João dos Patos", "Grajaú", "Arame", "Itaipava do Grajaú", "Jenipapo dos Vieiras", "Sítio Novo", "Bom Jardim", "Monção", "São Benedito do Rio Preto", "Santa Luzia", "Humberto de Campos", "Primeira Cruz", "Santo Amaro do Maranhão", "Alcântara", "Bequimão", "Central do Maranhão", "Mirinzal", "Porto Rico do Maranhão", "Presidente Sarney"],
  "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Cáceres", "Barra do Garças", "Primavera do Leste", "Alta Floresta", "Lucas do Rio Verde", "Colíder", "Pontes e Lacerda", "Sorriso", "Nova Mutum", "Diamantino", "Juína", "Mirassol d'Oeste", "Água Boa", "Guarantã do Norte", "Poxoréu", "Campo Verde", "Jaciara", "Juscimeira", "São José do Povo", "Pedra Preta", "Dom Aquino", "Itiquira", "Alto Garças", "Alto Taquari", "Alcinópolis", "Sonora", "Coxim", "Pedro Gomes", "Rio Verde de Mato Grosso", "São Gabriel do Oeste", "Camapuã", "Figueirão", "Bandeirantes", "Jaraguari", "Nova Alvorada do Sul", "Terenos", "Dois Irmãos do Buriti", "Sidrolândia", "Nova Andradina", "Batayporã", "Anaurilândia", "Brasilândia", "Santa Rita do Pardo", "Água Clara", "Ribas do Rio Pardo", "Inocência", "Selvíria", "Três Lagoas", "Paranaíba", "Aparecida do Taboado", "Cassilândia", "Chapadão do Sul", "Costa Rica", "Figueirão", "Paraíso das Águas"],
  "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Naviraí", "Nova Andradina", "Sidrolândia", "Maracaju", "São Gabriel do Oeste", "Coxim", "Aquidauana", "Paranaíba", "Amambai", "Chapadão do Sul", "Anastácio", "Bonito", "Miranda", "Jardim", "Ribas do Rio Pardo", "Cassilândia", "Aparecida do Taboado", "Inocência", "Selvíria", "Água Clara", "Costa Rica", "Figueirão", "Paraíso das Águas", "Camapuã", "Coxim", "Pedro Gomes", "Rio Verde de Mato Grosso", "São Gabriel do Oeste", "Sonora", "Alcinópolis", "Bandeirantes", "Jaraguari", "Nova Alvorada do Sul", "Terenos", "Dois Irmãos do Buriti", "Rochedo", "Corguinho", "Rio Negro", "Bodoquena", "Bonito", "Jardim", "Guia Lopes da Laguna", "Nioaque", "Caracol", "Bela Vista", "Antônio João", "Aral Moreira", "Laguna Carapã", "Juti", "Caarapó", "Vicentina", "Jateí", "Glória de Dourados", "Deodápolis", "Angélica", "Ivinhema", "Novo Horizonte do Sul", "Taquarussu", "Anaurilândia", "Bataguassu", "Santa Rita do Pardo", "Brasilândia", "Ribas do Rio Pardo"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga", "Sete Lagoas", "Divinópolis", "Santa Luzia", "Ibirité", "Poços de Caldas", "Patos de Minas", "Pouso Alegre", "Teófilo Otoni", "Barbacena", "Sabará", "Varginha", "Conselheiro Lafaiete", "Vespasiano", "Itabira", "Araguari", "Passos", "Ubá", "Coronel Fabriciano", "Muriaé", "Ituiutaba", "Lavras", "Nova Lima", "São João del Rei", "Itaúna", "Pará de Minas", "Paracatu", "Caratinga", "Nova Serrana", "Santa Rita do Sapucaí", "Viçosa", "Manhuaçu", "Timóteo", "Unaí", "Curvelo", "Alfenas", "João Monlevade", "Três Corações", "Januária", "Leopoldina", "Cataguases", "Ouro Preto", "Janaúba", "São Sebastião do Paraíso", "Patrocínio", "Mariana", "Esmeraldas", "Ponte Nova", "Frutal", "Formiga", "Brasília de Minas", "Bocaiúva", "Machado", "Congonhas", "São Lourenço", "Nanuque", "Caxambu", "Monte Carmelo", "Três Pontas", "Carmo do Paranaíba", "Campo Belo", "Boa Esperança", "Guaxupé", "Oliveira", "São Gotardo", "Piumhi", "Lagoa da Prata", "João Pinheiro", "Buritis", "Arinos", "Vazante", "Dom Bosco", "Presidente Olegário", "Lagoa Grande", "Coromandel", "Romaria", "Serra do Salitre", "Estrela do Sul", "Guimarânia", "Indianópolis", "Nova Ponte", "Perdizes", "Tupaciguara", "Veríssimo"],
  "Pará": ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal", "Abaetetuba", "Cametá", "Marituba", "Tucuruí", "Bragança", "Paragominas", "Redenção", "Altamira", "Itaituba", "Breves", "Oriximiná", "Capanema", "Tailândia", "Barcarena", "São Félix do Xingu", "Rondon do Pará", "Conceição do Araguaia", "Viseu", "Moju", "Igarapé-Miri", "São Miguel do Guamá", "Benevides", "Vigia", "Santa Izabel do Pará", "Santo Antônio do Tauá", "Tomé-Açu", "Acará", "Concórdia do Pará", "Bujaru", "Tailândia", "Goianésia do Pará", "Bonito", "Capitão Poço", "Garrafão do Norte", "Irituia", "Mãe do Rio", "Nova Esperança do Piriá", "Ourém", "Peixe-Boi", "Primavera", "Quatipuru", "Santa Luzia do Pará", "Santa Maria do Pará", "São Domingos do Capim", "São Francisco do Pará", "São João da Ponta", "São João de Pirabas", "Salinópolis", "Terra Alta", "Tracuateua", "Curuçá", "Maracanã", "Magalhães Barata", "Marapanim", "São Caetano de Odivelas", "Colares", "Vigia de Nazaré", "São João da Ponta", "Augusto Corrêa"],
  "Paraíba": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Cajazeiras", "Cabedelo", "Guarabira", "Mamanguape", "Esperança", "Monteiro", "Itabaiana", "Princesa Isabel", "Picuí", "Sumé", "Conceição", "Pombal", "São Bento", "Areia", "Solânea", "Alagoa Grande", "Ingá", "Itabaiana", "Mogeiro", "Mulungu", "Pilar", "Sertãozinho", "Alagoinha", "Araçagi", "Duas Estradas", "Logradouro", "Pilões", "Pilõezinhos", "Serra da Raiz", "Borborema", "Barra de Santa Rosa", "Cuité", "Damião", "Frei Martinho", "Nova Floresta", "Nova Palmeira", "Olivedos", "Pedra Lavrada", "Pocinhos", "Seridó", "Soledade", "Taperoá", "Assunção", "Baraúna", "Congo", "Livramento", "Santana de Mangueira", "São José de Espinharas", "Aparecida", "Cacimba de Dentro", "Cacimbas", "Casserengue", "Riachão", "Riachão do Bacamarte", "Salgado de São Félix", "São José dos Ramos", "São Sebastião de Lagoa de Roça", "Sobrado", "Caldas Brandão", "Cruz do Espírito Santo", "Juripiranga", "Pedras de Fogo", "Salgadinho", "Sapé", "Alagoinha", "Araçagi", "Capim", "Itapororoca", "Jacaraú", "Duas Estradas"],
  "Paraná": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá", "Araucária", "Toledo", "Apucarana", "Pinhais", "Campo Largo", "Arapongas", "Almirante Tamandaré", "Umuarama", "Piraquara", "Cambé", "São Carlos", "Francisco Beltrão", "Fazenda Rio Grande", "Paranavaí", "Carambeí", "Medianeira", "Irati", "Cianorte", "Telêmaco Borba", "Castro", "Rolândia", "Sarandi", "Fazenda Rio Grande", "Lapa", "Mandirituba", "Tijucas do Sul", "Campina Grande do Sul", "Bocaiúva do Sul", "Tunas do Paraná", "Adrianópolis", "Cerro Azul", "Doutor Ulysses", "Ribeira", "Itaperuçu", "Rio Branco do Sul", "Quitandinha", "Piên", "São José da Boa Vista", "Sengés", "Arapoti", "Jaguariaíva", "Palmeira", "Porto Amazonas", "Balsa Nova", "Contenda", "Araucária", "São José dos Pinhais", "Fazenda Rio Grande", "Quatro Barras", "Campina Grande do Sul", "Colombo", "Almirante Tamandaré", "Rio Branco do Sul", "Piraquara", "Pinhais", "Campo Largo", "Carambeí", "Castro", "Ponta Grossa"],
  "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Bandeira do Marco", "Caruaru", "Petrolina", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "Garanhuns", "Vitória de Santo Antão", "Igarassu", "São Lourenço da Mata", "Santa Cruz do Capibaribe", "Abreu e Lima", "Ipojuca", "Serra Talhada", "Araripina", "Goiana", "Belo Jardim", "Arcoverde", "Ouricuri", "Escada", "Ribeirão", "Timbaúba", "Limoeiro", "Palmares", "Carpina", "Pesqueira", "Surubim", "Bezerros", "São Bento do Una", "Brejo da Madre de Deus", "Toritama", "Vertentes", "Riacho das Almas", "Agrestina", "Casinhas", "Cupira", "Jataúba", "Panelas", "São Caetano", "Tacaimbó", "Tupanatinga", "Venturosa", "Afogados da Ingazeira", "Carnaíba", "Iguaraci", "Ingazeira", "Itapetim", "Quixaba", "Santa Terezinha", "São José do Egito", "Solidão", "Tabira", "Tuparetama", "Flores", "Floresta", "Betânia", "Custódia", "Sertânia", "Buíque", "Tupanatinga", "Águas Belas", "Angelim", "Bom Conselho", "Brejão", "Calçado", "Canhotinho", "Capoeiras", "Correntes", "Iati", "Jucati", "Jupi", "Lagoa do Ouro", "Lajedo", "Palmeirina", "Paranatama", "Pedra", "Salgueiro", "São José do Belmonte", "Verdejante", "Mirandiba", "Parnamirim", "Terra Nova"],
  "Piauí": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano", "Campo Maior", "Barras", "União", "Altos", "Pedro II", "Valença do Piauí", "São Raimundo Nonato", "Esperantina", "Oeiras", "Amarante", "Regeneração", "Luzilândia", "Corrente", "Simplício Mendes", "Beneditinos", "José de Freitas", "Demerval Lobão", "Miguel Alves", "Monsenhor Gil", "Lagoa Alegre", "Pau D'Arco do Piauí", "Hugo Napoleão", "Coivaras", "Francinópolis", "Wall Ferraz", "Nazária", "São João do Piauí", "Inhuma", "Cocal", "Buriti dos Lopes", "Caxingó", "Caraúbas do Piauí", "Ilha Grande", "Joaquim Pires", "Luís Correia", "Madeiro", "Murici dos Portelas", "Sigefredo Pacheco", "São José do Divino", "Bom Jesus", "Cristino Castro", "Currais", "Gilbués", "Monte Alegre do Piauí", "Redenção do Gurguéia", "Santa Filomena", "Sebastião Leal", "Uruçuí", "Alvorada do Gurguéia", "Antônio Almeida", "Avelino Lopes", "Barreiras do Piauí", "Bom Jesus", "Canto do Buriti", "Colônia do Gurguéia", "Corrente", "Cristalândia do Piauí", "Cristino Castro", "Curimatá", "Currais", "Eliseu Martins", "Guaribas", "Jerumenha", "Landri Sales", "Manoel Emídio", "Marcos Parente", "Palmeira do Piauí", "Parnaguá", "Riacho Frio", "Ribeiro Gonçalves", "Santa Luz", "São Gonçalo do Gurguéia", "São João do Piauí"],
  "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "São João de Meriti", "Petrópolis", "Volta Redonda", "Magé", "Macaé", "Itaboraí", "Cabo Frio", "Angra dos Reis", "Nova Friburgo", "Barra Mansa", "Teresópolis", "Mesquita", "Nilópolis", "Maricá", "Queimados", "Resende", "Araruama", "Tanguá", "Saquarema", "Paracambi", "Mangaratiba", "Guapimirim", "Seropédica", "Itaguaí", "São Pedro da Aldeia", "Rio das Ostras", "Búzios", "Silva Jardim", "Casimiro de Abreu", "Rio Bonito", "Cachoeiras de Macacu", "Japeri", "Nova Iguaçu", "Belford Roxo", "São João de Meriti", "Nilópolis", "Mesquita", "Queimados", "Itaguaí", "Seropédica", "Paracambi", "Engenheiro Paulo de Frontin", "Mendes", "Miguel Pereira", "Paty do Alferes", "Vassouras", "Paraíba do Sul", "Três Rios", "Areal", "Comendador Levy Gasparian", "São José do Vale do Rio Preto", "Sapucaia", "Sumidouro", "Carmo", "Cantagalo", "Cordeiro", "Macuco", "Santa Maria Madalena", "Trajano de Moraes", "Duas Barras", "Bom Jardim", "Nova Friburgo", "Cachoeiras de Macacu", "Silva Jardim", "Casimiro de Abreu", "Rio das Ostras", "Carapebus", "Quissamã", "Conceição de Macabu", "São Fidélis", "Campos dos Goytacazes", "São Francisco de Itabapoana", "São João da Barra", "Italva", "Itaocara", "Aperibé", "Cambuci", "Laje do Muriaé", "Natividade", "Porciúncula", "Varre-Sai", "Miracema", "Itaperuna", "Bom Jesus do Itapoana", "Santo Antônio de Pádua"],
  "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba", "Ceará-Mirim", "Currais Novos", "Caicó", "Açu", "João Câmara", "Nova Cruz", "Santo Antônio", "Canguaretama", "Touros", "São José de Mipibu", "Extremoz", "Santa Cruz", "Pau dos Ferros", "Apodi", "Areia Branca", "Baraúna", "Grossos", "Porto do Mangue", "Carnaubais", "Pendências", "Alto do Rodrigues", "Upanema", "Caraúbas", "Governador Dix-Sept Rosado", "Janduís", "Messias Targino", "Triunfo Potiguar", "Umarizal", "Encanto", "Francisco Dantas", "Frutuoso Gomes", "João Dias", "José da Penha", "Lucrécia", "Major Sales", "Marcelino Vieira", "Paraná", "Pilões", "Portalegre", "Rafael Fernandes", "Rafael Godeiro", "Riacho da Cruz", "Riacho de Santana", "São Miguel", "Serrinha dos Pintos", "Taboleiro Grande", "Tenente Ananias", "Venha-Ver", "Viçosa", "Alexandria", "Almino Afonso", "Antônio Martins", "Campo Grande", "Doutor Severiano", "Encanto", "João Dias", "José da Penha", "Luís Gomes", "Martins", "Patu", "São Francisco do Oeste", "Serrinha dos Pintos", "Taboleiro Grande", "Umarizal", "Venha-Ver"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo", "Rio Grande", "Alvorada", "Passo Fundo", "Sapucaia do Sul", "Uruguaiana", "Santa Cruz do Sul", "Cachoeirinha", "Bagé", "Bento Gonçalves", "Erechim", "Guaíba", "Cachoeira do Sul", "Santana do Livramento", "Ijuí", "Sapiranga", "Santo Ângelo", "Alegrete", "Lajeado", "Marau", "Santa Rosa", "Cruz Alta", "Montenegro", "São Borja", "São Gabriel", "Carazinho", "Venâncio Aires", "Parobé", "Taquara", "Gramado", "Canela", "Osório", "Tramandaí", "Torres", "Capão da Canoa", "Xangri-lá", "Cidreira", "Imbé", "Palmares do Sul", "Mostardas", "Tavares", "São José do Norte", "Jaguarão", "Arroio Grande", "Pedro Osório", "Turuçu", "Cerrito", "Capão do Leão", "Morro Redondo", "Canguçu", "São Lourenço do Sul", "Camaquã", "Tapes", "Arambaré", "Barra do Ribeiro", "Sertão Santana", "Butiá", "Minas do Leão", "Charqueadas", "Triunfo", "General Câmara", "Eldorado do Sul", "Barão", "Mariana Pimentel", "Sertão", "Pantano Grande", "Rio Pardo", "Encruzilhada do Sul", "Amaral Ferrador", "Piratini", "Pinheiro Machado", "Candiota", "Hulha Negra", "Aceguá", "Pedras Altas", "Herval", "Arroio do Padre", "Cristal", "Conquista", "Lavras do Sul", "Caçapava do Sul", "Vila Nova do Sul", "Santana da Boa Vista", "Toropi", "São Vicente do Sul", "Jari", "Nova Palma", "Faxinal do Soturno", "Ivorá", "Dona Francisca", "Pinhal Grande", "São João do Polêsine", "Silveira Martins", "Restinga Sêca", "Formigueiro", "São Sepé", "Dilermando de Aguiar", "Itaara", "São Pedro do Sul", "Mata", "São Martinho da Serra", "Quevedos", "Júlio de Castilhos", "Tupanciretã", "Santiago", "Unistalda", "Jaguari", "Nova Esperança do Sul", "Cacequi", "São Francisco de Assis", "Manoel Viana", "Rosário do Sul", "Dom Pedrito", "São Borja", "Itaqui", "Maçambará", "Alegrete", "Barra do Quaraí", "Quaraí", "Uruguaiana"],
  "Rondônia": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal", "Rolim de Moura", "Guajará-Mirim", "Jaru", "Ouro Preto do Oeste", "Buritis", "Costa Marques", "Espigão d'Oeste", "Colorado do Oeste", "Cerejeiras", "Pimenta Bueno", "Presidente Médici", "Machadinho d'Oeste", "São Miguel do Guaporé", "Nova Brasilândia d'Oeste", "Theobroma", "Alto Alegre dos Parecis", "Santa Luzia d'Oeste", "Parecis", "Nova Mamoré", "São Francisco do Guaporé", "Seringueiras", "Teixeirópolis", "Urupá", "Mirante da Serra", "Vale do Anari", "Nova União", "Rio Crespo", "Cujubim", "Cacaulândia", "Governador Jorge Teixeira", "Alto Paraíso", "Monte Negro", "Campo Novo de Rondônia", "Novo Horizonte do Oeste", "Vale do Paraíso", "Castanheiras", "Corumbiara", "Chupinguaia", "Pimenteiras do Oeste", "Primavera de Rondônia", "São Felipe d'Oeste", "Ministro Andreazza", "Alvorada d'Oeste", "Nova Londrina"],
  "Roraima": ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí", "São João da Baliza", "São Luiz", "Bonfim", "Cantá", "Normandia", "Pacaraima", "Iracema", "Amajari", "Caroebe", "Uiramutã"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí", "Lages", "Palhoça", "Balneário Camboriú", "Biguaçu", "Tubarão", "São Bento do Sul", "Caçador", "Camboriú", "Navegantes", "Concórdia", "Rio do Sul", "Araranguá", "Gaspar", "Brusque", "Canoinhas", "São Francisco do Sul", "Videira", "Mafra", "Imbituba", "Jaraguá do Sul", "Içara", "Indaial", "Herval d'Oeste", "Braço do Norte", "Laguna", "Sombrio", "Maravilha", "Xanxerê", "São Miguel do Oeste", "Pinhalzinho", "Itapiranga", "Mondaí", "São Carlos", "Guaraciaba", "Cunha Porã", "Descanso", "Dionísio Cerqueira", "Guarujá do Sul", "Palmitos", "Riqueza", "Romelândia", "São José do Cedro", "Anchieta", "Bandeirante", "Barra Bonita", "Caibi", "Flor do Sertão", "Iporã do Oeste", "Iraceminha", "Modelo", "Santa Helena", "São Bernardino", "Tunápolis", "Novo Horizonte", "Entre Rios", "Marema", "Paraíso", "Romilândia", "Santa Terezinha do Progresso", "Santiago do Sul", "Seara", "Xavantina", "Abelardo Luz", "Água Doce", "Bom Jesus", "Capinzal", "Catanduvas", "Coronel Freitas", "Galvão", "Ibiam", "Irani", "Irati", "Jupiá", "Lacerdópolis", "Lindóia do Sul", "Marema", "Nova Erechim", "Ouro Verde", "Paial", "Passos Maia", "Peritiba", "Piratuba", "Ponte Serrada", "Quilombo", "São Domingos", "Vargeão", "Vargem Bonita", "Xaxim"],
  "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba", "Mauá", "São José dos Campos", "Mogi das Cruzes", "Diadema", "Jundiaí", "Carapicuíba", "Piracicaba", "Bauru", "São Vicente", "Franca", "Guarujá", "Taubaté", "Praia Grande", "Limeira", "Suzano", "Taboão da Serra", "Sumaré", "Barueri", "Embu das Artes", "São Carlos", "Marília", "Indaiatuba", "Cotia", "Americana", "Jacareí", "Araraquara", "Santos", "Presidente Prudente", "São José do Rio Preto", "Hortolândia", "Itaquaquecetuba", "Francisco Morato", "Itapevi", "Ferraz de Vasconcelos", "Itu", "Bragança Paulista", "Pindamonhangaba", "Itapetininga", "Araçatuba", "Assis", "Leme", "Botucatu", "Atibaia", "Araras", "Catanduva", "Salto", "Jaú", "Ourinhos", "Birigui", "Jales", "Mococa", "Rio Claro", "Votuporanga", "Fernandópolis", "Tupã", "Andradina", "Itapecerica da Serra", "Batatais", "São João da Boa Vista", "Matão", "Itapira", "Cruzeiro", "Guaratinguetá", "Lorena", "Aparecida", "Cachoeira Paulista", "Canas", "Cunha", "Lagoinha", "Natividade da Serra", "Paraibuna", "Redenção da Serra", "São Bento do Sapucaí", "São José do Barreiro", "São Luiz do Paraitinga", "Silveiras", "Ubatuba", "Caraguatatuba", "Ilhabela", "São Sebastião", "Bertioga", "Peruíbe", "Itanhaém", "Mongaguá", "Cubatão", "São Vicente", "Praia Grande", "Guarujá", "Santos"],
  "Sergipe": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "Tobias Barreto", "Simão Dias", "Propriá", "São Cristóvão", "Laranjeiras", "Umbaúba", "Ribeirópolis", "Aquidabã", "Carmópolis", "Maruim", "Rosário do Catete", "Santo Amaro das Brotas", "Divina Pastora", "Riachuelo", "Barra dos Coqueiros", "Canindé de São Francisco", "Poço Redondo", "Porto da Folha", "Monte Alegre de Sergipe", "Nossa Senhora da Glória", "Gararu", "Itabi", "Nossa Senhora de Lourdes", "Graccho Cardoso", "Feira Nova", "Cedro de São João", "Carira", "Frei Paulo", "Pinhão", "Nossa Senhora Aparecida", "São Miguel do Aleixo", "Campo do Brito", "Macambira", "São Domingos", "Areia Branca", "Pedra Mole", "Santa Rosa de Lima", "Moita Bonita", "Malhador", "Ribeirópolis", "Nossa Senhora das Dores", "Capela", "Siriri", "Cumbe", "Telha", "Brejo Grande", "Ilha das Flores", "Neópolis", "Pacatuba", "Santana do São Francisco", "Canhoba", "Muribeca", "Japaratuba", "Pirambu", "Barra dos Coqueiros", "Cristinápolis", "Tomar do Geru", "Arauá", "Pedrinhas", "Salgado", "Boquim", "Riachão do Dantas", "Indiaroba", "Santa Luzia do Itanhy"],
  "Tocantins": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins", "Colinas do Tocantins", "Guaraí", "Formoso do Araguaia", "Dianópolis", "Taguatinga", "Miracema do Tocantins", "Araguatins", "Tocantinópolis", "Pedro Afonso", "Xambioá", "Augustinópolis", "Alvorada", "Wanderlândia", "Ananás", "Filadélfia", "Axixá do Tocantins", "Babaçulândia", "Buriti do Tocantins", "Esperantina", "Goiatins", "Itaguatins", "Luzinópolis", "Maurilândia do Tocantins", "Nazaré", "Palmeiras do Tocantins", "Praia Norte", "Riachinho", "Sampaio", "São Bento do Tocantins", "São Miguel do Tocantins", "São Sebastião do Tocantins", "Sítio Novo do Tocantins", "Aragominas", "Carmolândia", "Nova Olinda", "Palmeirante", "Santa Fé do Araguaia", "Aragominas", "Bandeirantes do Tocantins", "Bernardo Sayão", "Brasilândia do Tocantins", "Brejinho de Nazaré", "Caseara", "Couto Magalhães", "Cristalândia", "Divinópolis do Tocantins", "Dois Irmãos do Tocantins", "Fátima", "Figueirópolis", "Fortaleza do Tabocão", "Goianorte", "Itacajá", "Itapiratins", "Juarina", "Lagoa da Confusão", "Lajeado", "Marianópolis do Tocantins", "Monte do Carmo", "Natividade", "Nova Rosalândia", "Oliveira de Fátima", "Peixe", "Pequizeiro", "Pium", "Ponte Alta do Bom Jesus", "Ponte Alta do Tocantins", "Pugmil", "Recursolândia", "Rio da Conceição", "Rio dos Bois", "Rio Sono", "Sandolândia", "Santa Rita do Tocantins", "Santa Rosa do Tocantins", "Santa Tereza do Tocantins", "Santa Terezinha do Tocantins", "São Félix do Tocantins", "São Salvador do Tocantins", "Silvanópolis", "Sucupira", "Tocantínia", "Tupirama", "Tupiratins"]
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
