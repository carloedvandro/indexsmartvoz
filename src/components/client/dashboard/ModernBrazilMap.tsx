
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
        {/* Mapa 3D do Brasil */}
        <div className="relative">
          <div className="aspect-square max-w-lg mx-auto relative">
            {/* SVG do Mapa do Brasil com efeito 3D */}
            <svg 
              viewBox="0 0 600 600" 
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
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
                  d="M150,50 L450,50 L450,200 L300,200 L150,200 Z"
                  fill={regionsData.norte.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    transform: 'perspective(1000px) rotateX(15deg) rotateY(-5deg)',
                    transformOrigin: 'center'
                  }}
                />
                <text x="300" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  NORTE
                </text>
                <text x="300" y="130" textAnchor="middle" fill="white" fontSize="10">
                  AM PA RO AC RR AP TO
                </text>
                <text x="300" y="145" textAnchor="middle" fill="white" fontSize="9">
                  Manaus • Belém • Porto Velho
                </text>
                <text x="300" y="160" textAnchor="middle" fill="white" fontSize="9">
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
                  d="M350,200 L550,200 L550,350 L350,350 Z"
                  fill={regionsData.nordeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    transform: 'perspective(1000px) rotateX(15deg) rotateY(-5deg)',
                    transformOrigin: 'center'
                  }}
                />
                <text x="450" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  NORDESTE
                </text>
                <text x="450" y="265" textAnchor="middle" fill="white" fontSize="10">
                  BA PE CE RN PB AL SE PI MA
                </text>
                <text x="450" y="280" textAnchor="middle" fill="white" fontSize="9">
                  Salvador • Recife • Fortaleza
                </text>
                <text x="450" y="295" textAnchor="middle" fill="white" fontSize="9">
                  Natal • João Pessoa • Maceió
                </text>
                <text x="450" y="310" textAnchor="middle" fill="white" fontSize="9">
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
                  d="M150,200 L350,200 L350,350 L150,350 Z"
                  fill={regionsData.centrooeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    transform: 'perspective(1000px) rotateX(15deg) rotateY(-5deg)',
                    transformOrigin: 'center'
                  }}
                />
                <text x="250" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  CENTRO-OESTE
                </text>
                <text x="250" y="265" textAnchor="middle" fill="white" fontSize="10">
                  MT MS GO DF
                </text>
                <text x="250" y="280" textAnchor="middle" fill="white" fontSize="9">
                  Brasília • Goiânia
                </text>
                <text x="250" y="295" textAnchor="middle" fill="white" fontSize="9">
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
                  d="M250,350 L500,350 L500,450 L250,450 Z"
                  fill={regionsData.sudeste.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    transform: 'perspective(1000px) rotateX(15deg) rotateY(-5deg)',
                    transformOrigin: 'center'
                  }}
                />
                <text x="375" y="385" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  SUDESTE
                </text>
                <text x="375" y="405" textAnchor="middle" fill="white" fontSize="10">
                  SP RJ MG ES
                </text>
                <text x="375" y="420" textAnchor="middle" fill="white" fontSize="9">
                  São Paulo • Rio de Janeiro
                </text>
                <text x="375" y="435" textAnchor="middle" fill="white" fontSize="9">
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
                  d="M200,450 L400,450 L400,550 L200,550 Z"
                  fill={regionsData.sul.color}
                  stroke="#fff"
                  strokeWidth="2"
                  style={{
                    transform: 'perspective(1000px) rotateX(15deg) rotateY(-5deg)',
                    transformOrigin: 'center'
                  }}
                />
                <text x="300" y="485" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  SUL
                </text>
                <text x="300" y="505" textAnchor="middle" fill="white" fontSize="10">
                  RS SC PR
                </text>
                <text x="300" y="520" textAnchor="middle" fill="white" fontSize="9">
                  Porto Alegre • Curitiba
                </text>
                <text x="300" y="535" textAnchor="middle" fill="white" fontSize="9">
                  Florianópolis
                </text>
              </g>
            </svg>

            {/* Porcentagens flutuantes */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
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

            <div className="absolute bottom-1/4 right-0 transform translate-x-1/2">
              <div className="bg-purple-100 rounded-full p-3 shadow-lg relative">
                <div className="w-3 h-3 bg-purple-600 rounded-full absolute -top-1 -right-1"></div>
                <div className="text-purple-600 font-bold text-lg">45%</div>
                <div className="text-purple-600 text-sm font-medium">Sudeste</div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2">
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
