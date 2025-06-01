
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RegionData {
  name: string;
  percentage: number;
  states: string[];
  cities: string[];
  color: string;
}

export function ModernBrazilMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regionsData: Record<string, RegionData> = {
    norte: {
      name: 'Norte',
      percentage: 7,
      states: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
      cities: ['Manaus', 'Belém', 'Porto Velho', 'Rio Branco', 'Macapá', 'Boa Vista', 'Palmas'],
      color: '#4A90E2'
    },
    nordeste: {
      name: 'Nordeste',
      percentage: 20,
      states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
      cities: ['Salvador', 'Recife', 'Fortaleza', 'São Luís', 'Maceió', 'João Pessoa', 'Natal', 'Teresina', 'Aracaju'],
      color: '#2E5BBA'
    },
    centrooeste: {
      name: 'Centro-Oeste',
      percentage: 10,
      states: ['DF', 'GO', 'MT', 'MS'],
      cities: ['Brasília', 'Goiânia', 'Cuiabá', 'Campo Grande'],
      color: '#1E4A8C'
    },
    sudeste: {
      name: 'Sudeste',
      percentage: 45,
      states: ['ES', 'MG', 'RJ', 'SP'],
      cities: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória'],
      color: '#0F3460'
    },
    sul: {
      name: 'Sul',
      percentage: 18,
      states: ['PR', 'RS', 'SC'],
      cities: ['Porto Alegre', 'Curitiba', 'Florianópolis'],
      color: '#2A5F8F'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Mapa do Brasil - Distribuição por Regiões</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mapa Real do Brasil */}
        <div className="relative">
          <div className="aspect-[4/5] max-w-lg mx-auto relative">
            {/* SVG do Mapa Real do Brasil */}
            <svg 
              viewBox="0 0 400 500" 
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                transform: 'perspective(1000px) rotateX(10deg) rotateY(-5deg)'
              }}
            >
              {/* Região Norte */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
                style={{
                  filter: activeRegion === 'norte' ? 'brightness(1.2)' : 'brightness(1)'
                }}
              >
                <path
                  d="M50,20 L350,20 L350,140 L280,160 L250,150 L200,160 L150,140 L100,150 L50,130 Z"
                  fill={regionsData.norte.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="200" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                  NORTE
                </text>
                <text x="200" y="80" textAnchor="middle" fill="white" fontSize="10">
                  AM PA RO AC RR AP TO
                </text>
                <text x="200" y="95" textAnchor="middle" fill="white" fontSize="9">
                  Manaus • Belém • Porto Velho
                </text>
                <text x="200" y="108" textAnchor="middle" fill="white" fontSize="9">
                  Rio Branco • Boa Vista • Macapá • Palmas
                </text>
              </g>

              {/* Região Nordeste */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
                style={{
                  filter: activeRegion === 'nordeste' ? 'brightness(1.2)' : 'brightness(1)'
                }}
              >
                <path
                  d="M280,160 L380,140 L390,160 L400,180 L395,220 L385,260 L370,280 L350,290 L320,285 L300,270 L280,250 L270,220 L275,190 Z"
                  fill={regionsData.nordeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="330" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  NORDESTE
                </text>
                <text x="330" y="215" textAnchor="middle" fill="white" fontSize="9">
                  BA PE CE RN PB AL SE PI MA
                </text>
                <text x="330" y="228" textAnchor="middle" fill="white" fontSize="8">
                  Salvador • Recife • Fortaleza
                </text>
                <text x="330" y="240" textAnchor="middle" fill="white" fontSize="8">
                  Natal • João Pessoa • Maceió
                </text>
                <text x="330" y="252" textAnchor="middle" fill="white" fontSize="8">
                  Aracaju • Teresina • São Luís
                </text>
              </g>

              {/* Região Centro-Oeste */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
                style={{
                  filter: activeRegion === 'centrooeste' ? 'brightness(1.2)' : 'brightness(1)'
                }}
              >
                <path
                  d="M150,140 L280,160 L275,190 L270,220 L260,250 L240,280 L220,290 L180,295 L140,285 L120,270 L100,250 L90,220 L95,190 L110,160 Z"
                  fill={regionsData.centrooeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="185" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  CENTRO-OESTE
                </text>
                <text x="185" y="225" textAnchor="middle" fill="white" fontSize="9">
                  MT MS GO DF
                </text>
                <text x="185" y="238" textAnchor="middle" fill="white" fontSize="8">
                  Brasília • Goiânia
                </text>
                <text x="185" y="250" textAnchor="middle" fill="white" fontSize="8">
                  Cuiabá • Campo Grande
                </text>
              </g>

              {/* Região Sudeste */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
                style={{
                  filter: activeRegion === 'sudeste' ? 'brightness(1.2)' : 'brightness(1)'
                }}
              >
                <path
                  d="M220,290 L350,290 L370,280 L375,300 L380,320 L370,350 L350,370 L320,380 L280,375 L250,365 L230,350 L215,330 L210,310 Z"
                  fill={regionsData.sudeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="295" y="325" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  SUDESTE
                </text>
                <text x="295" y="340" textAnchor="middle" fill="white" fontSize="10">
                  SP RJ MG ES
                </text>
                <text x="295" y="353" textAnchor="middle" fill="white" fontSize="9">
                  São Paulo • Rio de Janeiro
                </text>
                <text x="295" y="365" textAnchor="middle" fill="white" fontSize="9">
                  Belo Horizonte • Vitória
                </text>
              </g>

              {/* Região Sul */}
              <g 
                className="cursor-pointer transition-all duration-300"
                onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
                style={{
                  filter: activeRegion === 'sul' ? 'brightness(1.2)' : 'brightness(1)'
                }}
              >
                <path
                  d="M210,310 L230,350 L250,365 L280,375 L320,380 L325,400 L315,430 L295,450 L270,465 L240,470 L210,465 L185,450 L170,430 L165,400 L175,370 L190,340 Z"
                  fill={regionsData.sul.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text x="245" y="415" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  SUL
                </text>
                <text x="245" y="430" textAnchor="middle" fill="white" fontSize="10">
                  RS SC PR
                </text>
                <text x="245" y="443" textAnchor="middle" fill="white" fontSize="9">
                  Porto Alegre • Curitiba
                </text>
                <text x="245" y="455" textAnchor="middle" fill="white" fontSize="9">
                  Florianópolis
                </text>
              </g>
            </svg>

            {/* Porcentagens flutuantes igual à imagem */}
            <div className="absolute top-4 left-1/4 transform -translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">7%</div>
                <div className="text-purple-600 text-sm font-medium">Norte</div>
              </div>
            </div>

            <div className="absolute top-1/4 right-0 transform translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">20%</div>
                <div className="text-purple-600 text-sm font-medium">Nordeste</div>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">10%</div>
                <div className="text-purple-600 text-sm font-medium">Centro-Oeste</div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-0 transform translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">45%</div>
                <div className="text-purple-600 text-sm font-medium">Sudeste</div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/4 transform -translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">18%</div>
                <div className="text-purple-600 text-sm font-medium">Sul</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes da região selecionada */}
        <div className="space-y-4">
          {activeRegion ? (
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: regionsData[activeRegion].color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: regionsData[activeRegion].color }}
                ></div>
                <h4 className="text-xl font-bold text-gray-800">
                  Região {regionsData[activeRegion].name}
                </h4>
                <span className="text-2xl font-bold text-purple-600">
                  {regionsData[activeRegion].percentage}%
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-700 mb-2">Estados:</h5>
                  <div className="flex flex-wrap gap-2">
                    {regionsData[activeRegion].states.map((state, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold text-gray-700 mb-2">Principais Cidades:</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {regionsData[activeRegion].cities.map((city, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{city}</span>
                      </div>
                    ))}
                  </div>
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
              <p className="text-gray-600 font-medium">Clique em uma região</p>
              <p className="text-sm text-gray-500">Selecione qualquer região do mapa para ver estados e cidades</p>
            </div>
          )}

          {/* Resumo das regiões */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Resumo das Regiões</h4>
            <div className="space-y-3">
              {Object.entries(regionsData).map(([key, region]) => (
                <motion.div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setActiveRegion(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: region.color }}></div>
                    <div>
                      <span className="font-semibold text-gray-800">{region.name}</span>
                      <p className="text-xs text-gray-500">{region.states.length} estados</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600 text-lg">{region.percentage}%</p>
                    <p className="text-xs text-gray-500">{region.cities.length} cidades</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
