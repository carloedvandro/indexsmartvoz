
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StateInfo {
  name: string;
  capital: string;
  cities: string[];
  sales: number;
  growth: number;
}

interface RegionData {
  name: string;
  color: string;
  states: Record<string, StateInfo>;
}

export function BrazilMapDesign() {
  const [activeState, setActiveState] = useState<string | null>(null);

  const regionsData: Record<string, RegionData> = {
    norte: {
      name: 'Norte',
      color: '#6B9BD2',
      states: {
        roraima: {
          name: 'RORAIMA',
          capital: 'Boa Vista',
          cities: ['Rorainópolis', 'Caracaraí'],
          sales: 1247,
          growth: 12.5
        },
        amapa: {
          name: 'AMAPÁ',
          capital: 'Macapá',
          cities: ['Santana', 'Laranjal do Jari'],
          sales: 892,
          growth: 9.7
        },
        amazonas: {
          name: 'AMAZONAS',
          capital: 'Manaus',
          cities: ['Parintins', 'Itacoatiara', 'Manacapuru'],
          sales: 3847,
          growth: 18.3
        },
        para: {
          name: 'PARÁ',
          capital: 'Belém',
          cities: ['Ananindeua', 'Santarém', 'Marabá'],
          sales: 2987,
          growth: 15.8
        },
        acre: {
          name: 'ACRE',
          capital: 'Rio Branco',
          cities: ['Cruzeiro do Sul', 'Sena Madureira'],
          sales: 1247,
          growth: 12.5
        },
        rondonia: {
          name: 'RONDÔNIA',
          capital: 'Porto Velho',
          cities: ['Ji-Paraná', 'Ariquemes'],
          sales: 1654,
          growth: 11.2
        },
        tocantins: {
          name: 'TOCANTINS',
          capital: 'Palmas',
          cities: ['Araguaína', 'Gurupi'],
          sales: 1892,
          growth: 14.1
        }
      }
    },
    nordeste: {
      name: 'Nordeste',
      color: '#B983D3',
      states: {
        maranhao: {
          name: 'MARANHÃO',
          capital: 'São Luís',
          cities: ['Imperatriz', 'Timon', 'Caxias'],
          sales: 2743,
          growth: 16.8
        },
        ceara: {
          name: 'CEARÁ',
          capital: 'Fortaleza',
          cities: ['Caucaia', 'Juazeiro do Norte', 'Sobral'],
          sales: 3654,
          growth: 22.1
        },
        riograndedonorte: {
          name: 'RIO GRANDE DO NORTE',
          capital: 'Natal',
          cities: ['Mossoró', 'Parnamirim'],
          sales: 1876,
          growth: 14.7
        },
        paraiba: {
          name: 'PARAÍBA',
          capital: 'João Pessoa',
          cities: ['Campina Grande', 'Santa Rita'],
          sales: 1687,
          growth: 12.9
        },
        pernambuco: {
          name: 'PERNAMBUCO',
          capital: 'Recife',
          cities: ['Olinda', 'Jaboatão', 'Caruaru'],
          sales: 3298,
          growth: 18.5
        },
        alagoas: {
          name: 'ALAGOAS',
          capital: 'Maceió',
          cities: ['Arapiraca', 'Palmeira dos Índios'],
          sales: 1547,
          growth: 13.4
        },
        sergipe: {
          name: 'SERGIPE',
          capital: 'Aracaju',
          cities: ['Nossa Senhora do Socorro', 'Lagarto'],
          sales: 1243,
          growth: 11.8
        },
        bahia: {
          name: 'BAHIA',
          capital: 'Salvador',
          cities: ['Feira de Santana', 'Vitória da Conquista', 'Ilhéus'],
          sales: 4287,
          growth: 19.7
        },
        piaui: {
          name: 'PIAUÍ',
          capital: 'Teresina',
          cities: ['Parnaíba', 'Picos'],
          sales: 1432,
          growth: 10.3
        }
      }
    },
    centrooeste: {
      name: 'Centro-Oeste',
      color: '#7BC97D',
      states: {
        matogrosso: {
          name: 'MATO GROSSO',
          capital: 'Cuiabá',
          cities: ['Várzea Grande', 'Rondonópolis'],
          sales: 2387,
          growth: 13.9
        },
        distritofederal: {
          name: 'DISTRITO FEDERAL',
          capital: 'Brasília',
          cities: ['Taguatinga', 'Ceilândia'],
          sales: 2847,
          growth: 17.3
        },
        goias: {
          name: 'GOIÁS',
          capital: 'Goiânia',
          cities: ['Aparecida de Goiânia', 'Anápolis'],
          sales: 3156,
          growth: 16.2
        },
        matogrossodosul: {
          name: 'MATO GROSSO DO SUL',
          capital: 'Campo Grande',
          cities: ['Dourados', 'Três Lagoas'],
          sales: 2098,
          growth: 12.6
        }
      }
    },
    sudeste: {
      name: 'Sudeste',
      color: '#F4A261',
      states: {
        minasgerais: {
          name: 'MINAS GERAIS',
          capital: 'Belo Horizonte',
          cities: ['Uberlândia', 'Contagem', 'Juiz de Fora'],
          sales: 5847,
          growth: 21.3
        },
        espiritosanto: {
          name: 'ESPÍRITO SANTO',
          capital: 'Vitória',
          cities: ['Vila Velha', 'Cariacica', 'Serra'],
          sales: 2654,
          growth: 15.4
        },
        riodejaneiro: {
          name: 'RIO DE JANEIRO',
          capital: 'Rio de Janeiro',
          cities: ['Niterói', 'Nova Iguaçu', 'Duque de Caxias'],
          sales: 4987,
          growth: 18.9
        },
        saopaulo: {
          name: 'SÃO PAULO',
          capital: 'São Paulo',
          cities: ['Guarulhos', 'Campinas', 'Santos'],
          sales: 8947,
          growth: 24.7
        }
      }
    },
    sul: {
      name: 'Sul',
      color: '#E76F51',
      states: {
        parana: {
          name: 'PARANÁ',
          capital: 'Curitiba',
          cities: ['Londrina', 'Maringá', 'Foz do Iguaçu'],
          sales: 4298,
          growth: 19.8
        },
        santacatarina: {
          name: 'SANTA CATARINA',
          capital: 'Florianópolis',
          cities: ['Joinville', 'Blumenau', 'Itajaí'],
          sales: 3254,
          growth: 18.1
        },
        riograndedosul: {
          name: 'RIO GRANDE DO SUL',
          capital: 'Porto Alegre',
          cities: ['Caxias do Sul', 'Pelotas', 'Santa Maria'],
          sales: 3847,
          growth: 17.2
        }
      }
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Mapa do Brasil - Estados e Cidades</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Dados em tempo real</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mapa do Brasil */}
        <div className="lg:col-span-3">
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <svg viewBox="0 0 800 600" className="w-full h-auto max-h-[500px]">
              {/* Região Norte */}
              <motion.rect
                x="50" y="50" width="700" height="120"
                fill={regionsData.norte.color}
                stroke="#fff"
                strokeWidth="2"
                rx="8"
                className="cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              />
              
              {/* Estados do Norte */}
              <text x="120" y="80" className="fill-white font-bold text-sm">RORAIMA</text>
              <text x="120" y="95" className="fill-white text-xs">Cap: Boa Vista</text>
              <text x="120" y="105" className="fill-white text-xs opacity-80">Rorainópolis</text>
              <text x="120" y="115" className="fill-white text-xs opacity-80">Caracaraí</text>

              <text x="280" y="80" className="fill-white font-bold text-sm">AMAPÁ</text>
              <text x="280" y="95" className="fill-white text-xs">Cap: Macapá</text>
              <text x="280" y="105" className="fill-white text-xs opacity-80">Santana</text>
              <text x="280" y="115" className="fill-white text-xs opacity-80">Laranjal do Jari</text>

              <text x="450" y="80" className="fill-white font-bold text-sm">AMAZONAS</text>
              <text x="450" y="95" className="fill-white text-xs">Cap: Manaus</text>
              <text x="450" y="105" className="fill-white text-xs opacity-80">Parintins</text>
              <text x="450" y="115" className="fill-white text-xs opacity-80">Itacoatiara</text>

              <text x="600" y="80" className="fill-white font-bold text-sm">PARÁ</text>
              <text x="600" y="95" className="fill-white text-xs">Cap: Belém</text>
              <text x="600" y="105" className="fill-white text-xs opacity-80">Ananindeua</text>
              <text x="600" y="115" className="fill-white text-xs opacity-80">Santarém</text>

              <text x="120" y="140" className="fill-white font-bold text-sm">ACRE</text>
              <text x="120" y="155" className="fill-white text-xs">Cap: Rio Branco</text>

              <text x="280" y="140" className="fill-white font-bold text-sm">RONDÔNIA</text>
              <text x="280" y="155" className="fill-white text-xs">Cap: Porto Velho</text>

              <text x="600" y="140" className="fill-white font-bold text-sm">TOCANTINS</text>
              <text x="600" y="155" className="fill-white text-xs">Cap: Palmas</text>

              {/* Região Nordeste */}
              <motion.rect
                x="450" y="180" width="300" height="140"
                fill={regionsData.nordeste.color}
                stroke="#fff"
                strokeWidth="2"
                rx="8"
                className="cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              />

              <text x="470" y="210" className="fill-white font-bold text-sm">MARANHÃO</text>
              <text x="470" y="225" className="fill-white text-xs">Cap: São Luís</text>

              <text x="580" y="210" className="fill-white font-bold text-sm">CEARÁ</text>
              <text x="580" y="225" className="fill-white text-xs">Cap: Fortaleza</text>

              <text x="680" y="210" className="fill-white font-bold text-sm">RIO GRANDE DO NORTE</text>
              <text x="680" y="225" className="fill-white text-xs">Cap: Natal</text>

              <text x="470" y="250" className="fill-white font-bold text-sm">PARAÍBA</text>
              <text x="470" y="265" className="fill-white text-xs">Cap: João Pessoa</text>

              <text x="580" y="250" className="fill-white font-bold text-sm">PERNAMBUCO</text>
              <text x="580" y="265" className="fill-white text-xs">Cap: Recife</text>

              <text x="470" y="290" className="fill-white font-bold text-sm">ALAGOAS</text>
              <text x="470" y="305" className="fill-white text-xs">Cap: Maceió</text>

              <text x="580" y="290" className="fill-white font-bold text-sm">SERGIPE</text>
              <text x="580" y="305" className="fill-white text-xs">Cap: Aracaju</text>

              <text x="680" y="290" className="fill-white font-bold text-sm">BAHIA</text>
              <text x="680" y="305" className="fill-white text-xs">Cap: Salvador</text>

              {/* Região Centro-Oeste */}
              <motion.rect
                x="200" y="200" width="240" height="120"
                fill={regionsData.centrooeste.color}
                stroke="#fff"
                strokeWidth="2"
                rx="8"
                className="cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              />

              <text x="220" y="230" className="fill-white font-bold text-sm">MATO GROSSO</text>
              <text x="220" y="245" className="fill-white text-xs">Cap: Cuiabá</text>
              <text x="220" y="255" className="fill-white text-xs opacity-80">Várzea Grande</text>

              <text x="340" y="230" className="fill-white font-bold text-sm">DISTRITO</text>
              <text x="340" y="245" className="fill-white font-bold text-sm">FEDERAL</text>
              <text x="340" y="260" className="fill-white text-xs">Cap: Brasília</text>

              <text x="340" y="285" className="fill-white font-bold text-sm">GOIÁS</text>
              <text x="340" y="300" className="fill-white text-xs">Cap: Goiânia</text>

              <text x="220" y="285" className="fill-white font-bold text-sm">MATO GROSSO DO SUL</text>
              <text x="220" y="300" className="fill-white text-xs">Cap: Campo Grande</text>

              {/* Região Sudeste */}
              <motion.rect
                x="350" y="330" width="280" height="100"
                fill={regionsData.sudeste.color}
                stroke="#fff"
                strokeWidth="2"
                rx="8"
                className="cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              />

              <text x="370" y="360" className="fill-white font-bold text-sm">MINAS GERAIS</text>
              <text x="370" y="375" className="fill-white text-xs">Cap: Belo Horizonte</text>

              <text x="500" y="360" className="fill-white font-bold text-sm">ESPÍRITO SANTO</text>
              <text x="500" y="375" className="fill-white text-xs">Cap: Vitória</text>

              <text x="370" y="400" className="fill-white font-bold text-sm">SÃO PAULO</text>
              <text x="370" y="415" className="fill-white text-xs">Cap: São Paulo</text>

              <text x="500" y="400" className="fill-white font-bold text-sm">RIO DE JANEIRO</text>
              <text x="500" y="415" className="fill-white text-xs">Cap: Rio de Janeiro</text>

              {/* Região Sul */}
              <motion.rect
                x="300" y="440" width="250" height="100"
                fill={regionsData.sul.color}
                stroke="#fff"
                strokeWidth="2"
                rx="8"
                className="cursor-pointer"
                whileHover={{ opacity: 0.8 }}
              />

              <text x="320" y="470" className="fill-white font-bold text-sm">PARANÁ</text>
              <text x="320" y="485" className="fill-white text-xs">Cap: Curitiba</text>

              <text x="450" y="470" className="fill-white font-bold text-sm">SANTA CATARINA</text>
              <text x="450" y="485" className="fill-white text-xs">Cap: Florianópolis</text>

              <text x="320" y="515" className="fill-white font-bold text-sm">RIO GRANDE DO SUL</text>
              <text x="320" y="530" className="fill-white text-xs">Cap: Porto Alegre</text>
            </svg>
          </div>
        </div>

        {/* Legenda das Regiões */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h4 className="text-lg font-bold text-gray-800 mb-4">REGIÕES:</h4>
            
            {Object.entries(regionsData).map(([key, region]) => (
              <div key={key} className="flex items-center gap-3 mb-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: region.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">{region.name}</span>
              </div>
            ))}
          </div>

          {/* Resumo de Vendas */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Vendas por Região</h4>
            
            {Object.entries(regionsData).map(([key, region]) => {
              const totalSales = Object.values(region.states).reduce((sum, state) => sum + state.sales, 0);
              const avgGrowth = Object.values(region.states).reduce((sum, state) => sum + state.growth, 0) / Object.keys(region.states).length;
              
              return (
                <div key={key} className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-700">{region.name}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      +{avgGrowth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatNumber(totalSales)}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: region.color,
                        width: `${(totalSales / 40000) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
