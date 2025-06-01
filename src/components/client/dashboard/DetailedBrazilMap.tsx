
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StateData {
  name: string;
  capital: string;
  mainCities: string[];
  sales: number;
  growth: number;
  color: string;
  position: { x: number; y: number };
}

export function DetailedBrazilMap() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [statesData, setStatesData] = useState<Record<string, StateData>>({
    // REGIÃO NORTE
    acre: {
      name: 'Acre',
      capital: 'Rio Branco',
      mainCities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
      sales: 1247,
      growth: 12.5,
      color: '#1E40AF',
      position: { x: 120, y: 180 }
    },
    amazonas: {
      name: 'Amazonas',
      capital: 'Manaus',
      mainCities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru'],
      sales: 3847,
      growth: 18.3,
      color: '#1E40AF',
      position: { x: 180, y: 140 }
    },
    amapa: {
      name: 'Amapá',
      capital: 'Macapá',
      mainCities: ['Macapá', 'Santana', 'Laranjal do Jari'],
      sales: 892,
      growth: 9.7,
      color: '#1E40AF',
      position: { x: 290, y: 90 }
    },
    para: {
      name: 'Pará',
      capital: 'Belém',
      mainCities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá'],
      sales: 2987,
      growth: 15.8,
      color: '#1E40AF',
      position: { x: 250, y: 150 }
    },
    rondonia: {
      name: 'Rondônia',
      capital: 'Porto Velho',
      mainCities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
      sales: 1654,
      growth: 11.2,
      color: '#1E40AF',
      position: { x: 160, y: 200 }
    },
    roraima: {
      name: 'Roraima',
      capital: 'Boa Vista',
      mainCities: ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
      sales: 743,
      growth: 8.9,
      color: '#1E40AF',
      position: { x: 210, y: 80 }
    },
    tocantins: {
      name: 'Tocantins',
      capital: 'Palmas',
      mainCities: ['Palmas', 'Araguaína', 'Gurupi'],
      sales: 1892,
      growth: 14.1,
      color: '#1E40AF',
      position: { x: 280, y: 220 }
    },

    // REGIÃO NORDESTE
    alagoas: {
      name: 'Alagoas',
      capital: 'Maceió',
      mainCities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
      sales: 1547,
      growth: 13.4,
      color: '#7C3AED',
      position: { x: 380, y: 260 }
    },
    bahia: {
      name: 'Bahia',
      capital: 'Salvador',
      mainCities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Ilhéus'],
      sales: 4287,
      growth: 19.7,
      color: '#7C3AED',
      position: { x: 350, y: 280 }
    },
    ceara: {
      name: 'Ceará',
      capital: 'Fortaleza',
      mainCities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Sobral'],
      sales: 3654,
      growth: 22.1,
      color: '#7C3AED',
      position: { x: 360, y: 190 }
    },
    maranhao: {
      name: 'Maranhão',
      capital: 'São Luís',
      mainCities: ['São Luís', 'Imperatriz', 'Timon', 'Caxias'],
      sales: 2743,
      growth: 16.8,
      color: '#7C3AED',
      position: { x: 310, y: 180 }
    },
    paraiba: {
      name: 'Paraíba',
      capital: 'João Pessoa',
      mainCities: ['João Pessoa', 'Campina Grande', 'Santa Rita'],
      sales: 1687,
      growth: 12.9,
      color: '#7C3AED',
      position: { x: 390, y: 230 }
    },
    pernambuco: {
      name: 'Pernambuco',
      capital: 'Recife',
      mainCities: ['Recife', 'Olinda', 'Jaboatão', 'Caruaru'],
      sales: 3298,
      growth: 18.5,
      color: '#7C3AED',
      position: { x: 380, y: 240 }
    },
    piaui: {
      name: 'Piauí',
      capital: 'Teresina',
      mainCities: ['Teresina', 'Parnaíba', 'Picos'],
      sales: 1432,
      growth: 10.3,
      color: '#7C3AED',
      position: { x: 330, y: 200 }
    },
    riograndedonorte: {
      name: 'Rio Grande do Norte',
      capital: 'Natal',
      mainCities: ['Natal', 'Mossoró', 'Parnamirim'],
      sales: 1876,
      growth: 14.7,
      color: '#7C3AED',
      position: { x: 400, y: 210 }
    },
    sergipe: {
      name: 'Sergipe',
      capital: 'Aracaju',
      mainCities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
      sales: 1243,
      growth: 11.8,
      color: '#7C3AED',
      position: { x: 370, y: 270 }
    },

    // REGIÃO CENTRO-OESTE
    distritofederal: {
      name: 'Distrito Federal',
      capital: 'Brasília',
      mainCities: ['Brasília', 'Taguatinga', 'Ceilândia'],
      sales: 2847,
      growth: 17.3,
      color: '#059669',
      position: { x: 320, y: 260 }
    },
    goias: {
      name: 'Goiás',
      capital: 'Goiânia',
      mainCities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
      sales: 3156,
      growth: 16.2,
      color: '#059669',
      position: { x: 300, y: 270 }
    },
    matogrosso: {
      name: 'Mato Grosso',
      capital: 'Cuiabá',
      mainCities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
      sales: 2387,
      growth: 13.9,
      color: '#059669',
      position: { x: 240, y: 260 }
    },
    matogrossodosul: {
      name: 'Mato Grosso do Sul',
      capital: 'Campo Grande',
      mainCities: ['Campo Grande', 'Dourados', 'Três Lagoas'],
      sales: 2098,
      growth: 12.6,
      color: '#059669',
      position: { x: 260, y: 310 }
    },

    // REGIÃO SUDESTE
    espiritosanto: {
      name: 'Espírito Santo',
      capital: 'Vitória',
      mainCities: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra'],
      sales: 2654,
      growth: 15.4,
      color: '#DC2626',
      position: { x: 370, y: 320 }
    },
    minasgerais: {
      name: 'Minas Gerais',
      capital: 'Belo Horizonte',
      mainCities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
      sales: 5847,
      growth: 21.3,
      color: '#DC2626',
      position: { x: 330, y: 320 }
    },
    riodejaneiro: {
      name: 'Rio de Janeiro',
      capital: 'Rio de Janeiro',
      mainCities: ['Rio de Janeiro', 'Niterói', 'Nova Iguaçu', 'Duque de Caxias'],
      sales: 4987,
      growth: 18.9,
      color: '#DC2626',
      position: { x: 350, y: 350 }
    },
    saopaulo: {
      name: 'São Paulo',
      capital: 'São Paulo',
      mainCities: ['São Paulo', 'Guarulhos', 'Campinas', 'Santos'],
      sales: 8947,
      growth: 24.7,
      color: '#DC2626',
      position: { x: 310, y: 350 }
    },

    // REGIÃO SUL
    parana: {
      name: 'Paraná',
      capital: 'Curitiba',
      mainCities: ['Curitiba', 'Londrina', 'Maringá', 'Foz do Iguaçu'],
      sales: 4298,
      growth: 19.8,
      color: '#EA580C',
      position: { x: 290, y: 380 }
    },
    riograndedosul: {
      name: 'Rio Grande do Sul',
      capital: 'Porto Alegre',
      mainCities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria'],
      sales: 3847,
      growth: 17.2,
      color: '#EA580C',
      position: { x: 270, y: 420 }
    },
    santacatarina: {
      name: 'Santa Catarina',
      capital: 'Florianópolis',
      mainCities: ['Florianópolis', 'Joinville', 'Blumenau', 'Itajaí'],
      sales: 3254,
      growth: 18.1,
      color: '#EA580C',
      position: { x: 310, y: 400 }
    }
  });

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStatesData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(state => {
          const variation = Math.random() * 10 - 5;
          newData[state].sales += Math.round(variation);
          newData[state].growth += (Math.random() - 0.5) * 0.2;
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, num));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Mapa Detalhado do Brasil - Estados e Cidades</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa do Brasil com Estados e Cidades */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              {/* Definições de filtros para efeito 3D */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="rgba(0,0,0,0.3)"/>
                </filter>
                <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                </linearGradient>
              </defs>

              {/* Contorno do Brasil simplificado por regiões */}
              {/* REGIÃO NORTE */}
              <motion.path
                d="M50 50 L450 50 L450 180 L320 180 L300 200 L280 220 L50 220 Z"
                fill={activeState?.includes('norte') ? '#1E40AF' : '#3B82F6'}
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ fillOpacity: 0.9, scale: 1.02 }}
              />

              {/* REGIÃO NORDESTE */}
              <motion.path
                d="M300 180 L450 180 L450 300 L380 300 L370 280 L350 260 L320 240 L300 200 Z"
                fill={activeState?.includes('nordeste') ? '#7C3AED' : '#8B5CF6'}
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ fillOpacity: 0.9, scale: 1.02 }}
              />

              {/* REGIÃO CENTRO-OESTE */}
              <motion.path
                d="M50 220 L280 220 L300 240 L320 260 L300 300 L280 320 L50 320 Z"
                fill={activeState?.includes('centrooeste') ? '#059669' : '#10B981'}
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ fillOpacity: 0.9, scale: 1.02 }}
              />

              {/* REGIÃO SUDESTE */}
              <motion.path
                d="M280 300 L380 300 L450 300 L450 380 L320 380 L300 360 L280 340 Z"
                fill={activeState?.includes('sudeste') ? '#DC2626' : '#EF4444'}
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ fillOpacity: 0.9, scale: 1.02 }}
              />

              {/* REGIÃO SUL */}
              <motion.path
                d="M220 340 L320 340 L450 340 L450 450 L220 450 Z"
                fill={activeState?.includes('sul') ? '#EA580C' : '#F97316'}
                fillOpacity={0.7}
                stroke="#fff"
                strokeWidth="2"
                filter="url(#shadow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ fillOpacity: 0.9, scale: 1.02 }}
              />

              {/* Estados e Cidades escritos no mapa */}
              {Object.entries(statesData).map(([key, state]) => (
                <g key={key}>
                  {/* Nome do Estado */}
                  <motion.text
                    x={state.position.x}
                    y={state.position.y}
                    textAnchor="middle"
                    className="fill-white font-bold text-xs pointer-events-none drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {state.name.toUpperCase()}
                  </motion.text>
                  
                  {/* Capital */}
                  <motion.text
                    x={state.position.x}
                    y={state.position.y + 12}
                    textAnchor="middle"
                    className="fill-white font-medium text-[10px] pointer-events-none drop-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Cap: {state.capital}
                  </motion.text>

                  {/* Principais Cidades */}
                  {state.mainCities.slice(1, 3).map((city, index) => (
                    <motion.text
                      key={city}
                      x={state.position.x}
                      y={state.position.y + 24 + (index * 10)}
                      textAnchor="middle"
                      className="fill-white font-normal text-[8px] pointer-events-none drop-shadow-sm opacity-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      {city}
                    </motion.text>
                  ))}

                  {/* Indicador de vendas */}
                  <motion.circle
                    cx={state.position.x + 25}
                    cy={state.position.y - 10}
                    r="8"
                    fill={state.color}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={() => setActiveState(activeState === key ? null : key)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <text
                    x={state.position.x + 25}
                    y={state.position.y - 6}
                    textAnchor="middle"
                    className="fill-white font-bold text-[8px] pointer-events-none"
                  >
                    {Math.round(state.growth)}%
                  </text>
                </g>
              ))}

              {/* Legenda das Regiões */}
              <g transform="translate(20, 400)">
                <rect width="120" height="80" fill="rgba(255,255,255,0.9)" rx="5" stroke="#ddd"/>
                <text x="10" y="15" className="fill-gray-800 font-bold text-[10px]">REGIÕES:</text>
                <circle cx="15" cy="25" r="4" fill="#3B82F6"/>
                <text x="25" y="29" className="fill-gray-700 text-[8px]">Norte</text>
                <circle cx="15" cy="35" r="4" fill="#8B5CF6"/>
                <text x="25" y="39" className="fill-gray-700 text-[8px]">Nordeste</text>
                <circle cx="15" cy="45" r="4" fill="#10B981"/>
                <text x="25" y="49" className="fill-gray-700 text-[8px]">Centro-Oeste</text>
                <circle cx="15" cy="55" r="4" fill="#EF4444"/>
                <text x="25" y="59" className="fill-gray-700 text-[8px]">Sudeste</text>
                <circle cx="15" cy="65" r="4" fill="#F97316"/>
                <text x="25" y="69" className="fill-gray-700 text-[8px]">Sul</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Painel de Detalhes do Estado */}
        <div className="space-y-4">
          {activeState ? (
            <motion.div
              key={activeState}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: statesData[activeState].color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: statesData[activeState].color }}
                ></div>
                <h4 className="text-xl font-bold text-gray-800">
                  {statesData[activeState].name}
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-600">Capital</p>
                  <p className="text-lg font-bold text-gray-800">{statesData[activeState].capital}</p>
                </div>
                
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-2">Principais Cidades</p>
                  <div className="flex flex-wrap gap-1">
                    {statesData[activeState].mainCities.map((city) => (
                      <span key={city} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-600">Vendas</p>
                  <p className="text-lg font-bold text-gray-800">{formatNumber(statesData[activeState].sales)}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    +{statesData[activeState].growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Selecione um estado</p>
              <p className="text-sm text-gray-500">Clique nos círculos do mapa para ver detalhes</p>
            </div>
          )}

          {/* Lista dos Estados por Região */}
          <div className="bg-white rounded-xl p-4 shadow-sm border max-h-96 overflow-y-auto">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Estados por Região</h4>
            
            {['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'].map((regiao) => {
              const estadosRegiao = Object.entries(statesData).filter(([_, state]) => {
                if (regiao === 'Norte') return ['Acre', 'Amazonas', 'Amapá', 'Pará', 'Rondônia', 'Roraima', 'Tocantins'].includes(state.name);
                if (regiao === 'Nordeste') return ['Alagoas', 'Bahia', 'Ceará', 'Maranhão', 'Paraíba', 'Pernambuco', 'Piauí', 'Rio Grande do Norte', 'Sergipe'].includes(state.name);
                if (regiao === 'Centro-Oeste') return ['Distrito Federal', 'Goiás', 'Mato Grosso', 'Mato Grosso do Sul'].includes(state.name);
                if (regiao === 'Sudeste') return ['Espírito Santo', 'Minas Gerais', 'Rio de Janeiro', 'São Paulo'].includes(state.name);
                if (regiao === 'Sul') return ['Paraná', 'Rio Grande do Sul', 'Santa Catarina'].includes(state.name);
                return false;
              });

              return (
                <div key={regiao} className="mb-4">
                  <h5 className="font-semibold text-gray-700 mb-2">{regiao}</h5>
                  <div className="space-y-1">
                    {estadosRegiao.map(([key, state]) => (
                      <button
                        key={key}
                        onClick={() => setActiveState(key)}
                        className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{state.name}</span>
                          <span className="text-xs text-gray-500">{formatNumber(state.sales)}</span>
                        </div>
                        <div className="text-xs text-gray-600">Cap: {state.capital}</div>
                      </button>
                    ))}
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
