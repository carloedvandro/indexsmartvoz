
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RegionData {
  name: string;
  sales: number;
  topPlan: string;
  planSales: number;
  color: string;
  growth: number;
  percentage: number;
}

export function InteractiveBrazilMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [regionsData, setRegionsData] = useState<Record<string, RegionData>>({
    norte: {
      name: 'Norte',
      sales: 2847,
      topPlan: 'Smartvoz 100GB',
      planSales: 1425,
      color: '#8B5CF6',
      growth: 15.3,
      percentage: 7
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#A855F7',
      growth: 22.7,
      percentage: 20
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#9333EA',
      growth: 8.9,
      percentage: 10
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#7C3AED',
      growth: 31.2,
      percentage: 45
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#6D28D9',
      growth: 18.6,
      percentage: 18
    }
  });

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRegionsData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(region => {
          // Simular pequenas variações nas vendas
          const variation = Math.random() * 10 - 5; // -5 a +5
          newData[region].sales += Math.round(variation);
          newData[region].planSales += Math.round(variation * 0.6);
          
          // Atualizar crescimento
          newData[region].growth += (Math.random() - 0.5) * 0.2;
        });
        return newData;
      });
    }, 3000); // Atualizar a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, num));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-1">Distribuição Regional de</h3>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Vendas B2B no Brasil:</h3>
          <p className="text-sm text-gray-500 mt-1">Fonte: ABRASCA</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mapa do Brasil em estilo azul 3D */}
        <div className="relative">
          <div className="aspect-square max-w-lg mx-auto relative">
            {/* Container do mapa com background */}
            <div 
              className="relative w-full h-full flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
              style={{
                background: 'linear-gradient(135deg, #f0f4ff 0%, #f3e8ff 100%)'
              }}
            >
              <img 
                src="/lovable-uploads/2bd63a8f-d19c-4a50-9f5a-6b8f67577c47.png" 
                alt="Mapa do Brasil em estilo 3D azul com distribuição regional" 
                className="w-full h-full object-contain max-h-96 drop-shadow-xl"
              />
              
              {/* Círculos com porcentagens - Norte */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  top: '15%',
                  left: '15%',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: '#8B5CF6' }}
                  >
                    <span className="text-2xl">{regionsData.norte.percentage}%</span>
                    <span className="text-xs">Norte</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-pulse"></div>
                </div>
              </motion.div>

              {/* Círculos com porcentagens - Nordeste */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  top: '10%',
                  right: '10%',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: '#A855F7' }}
                  >
                    <span className="text-2xl">{regionsData.nordeste.percentage}%</span>
                    <span className="text-xs">Nordeste</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-pulse"></div>
                </div>
              </motion.div>

              {/* Círculos com porcentagens - Centro-Oeste */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  top: '45%',
                  left: '5%',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: '#9333EA' }}
                  >
                    <span className="text-2xl">{regionsData.centrooeste.percentage}%</span>
                    <span className="text-xs text-center leading-tight">Centro-Oeste</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-pulse"></div>
                </div>
              </motion.div>

              {/* Círculos com porcentagens - Sudeste */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  top: '50%',
                  right: '5%',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: '#7C3AED' }}
                  >
                    <span className="text-2xl">{regionsData.sudeste.percentage}%</span>
                    <span className="text-xs">Sudeste</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-pulse"></div>
                </div>
              </motion.div>

              {/* Círculos com porcentagens - Sul */}
              <motion.div
                className="absolute cursor-pointer"
                style={{
                  bottom: '15%',
                  left: '25%',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
              >
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg border-4 border-white"
                    style={{ backgroundColor: '#6D28D9' }}
                  >
                    <span className="text-2xl">{regionsData.sul.percentage}%</span>
                    <span className="text-xs">Sul</span>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-300 opacity-30 animate-pulse"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Clique nas regiões para ver detalhes em tempo real
          </p>
        </div>

        {/* Dados da região */}
        <div className="space-y-4">
          {activeRegion ? (
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: regionsData[activeRegion].color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-6 h-6 rounded-full shadow-lg border-2 border-white"
                  style={{ backgroundColor: regionsData[activeRegion].color }}
                ></div>
                <h4 className="text-xl font-bold text-gray-800">
                  Região {regionsData[activeRegion].name}
                </h4>
                <span className="text-lg font-bold text-purple-600">
                  {regionsData[activeRegion].percentage}%
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      +{regionsData[activeRegion].growth.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {formatNumber(regionsData[activeRegion].sales)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: regionsData[activeRegion].color,
                        width: `${regionsData[activeRegion].percentage * 2}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">Plano Mais Vendido</p>
                  <p className="text-xl font-bold text-gray-800 mb-1">
                    {regionsData[activeRegion].topPlan}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatNumber(regionsData[activeRegion].planSales)} vendas hoje
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 text-center border-2 border-dashed border-purple-200">
              <div className="text-purple-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-purple-700 font-medium">Selecione uma região</p>
              <p className="text-sm text-purple-600">Clique em qualquer região do mapa para ver os dados em tempo real</p>
            </div>
          )}

          {/* Ranking das regiões */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏆</span>
              Ranking de Vendas B2B
            </h4>
            <div className="space-y-3">
              {Object.entries(regionsData)
                .sort(([,a], [,b]) => b.percentage - a.percentage)
                .map(([key, region], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-all duration-200 border border-purple-100"
                    onClick={() => setActiveRegion(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                        index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' : 'bg-gradient-to-r from-purple-500 to-purple-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="w-4 h-4 rounded shadow-sm border border-white" style={{ backgroundColor: region.color }}></div>
                      <div>
                        <span className="font-semibold text-gray-800">{region.name}</span>
                        <p className="text-xs text-gray-500">{region.topPlan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600 text-lg">{region.percentage}%</p>
                      <p className="text-xs text-green-600 font-medium">+{region.growth.toFixed(1)}%</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo dos planos mais vendidos */}
      <div className="mt-8">
        <h4 className="text-lg font-bold text-gray-800 mb-4">Resumo dos Planos por Região</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(regionsData).map(([key, region]) => (
            <motion.div 
              key={key} 
              className="bg-white rounded-lg p-4 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-all duration-200 border border-purple-100"
              style={{ borderLeftColor: region.color }}
              onClick={() => setActiveRegion(key)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 rounded shadow-sm border border-white" style={{ backgroundColor: region.color }}></div>
                <span className="text-sm font-bold text-gray-800">{region.name}</span>
                <span className="text-sm font-bold text-purple-600 ml-auto">{region.percentage}%</span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-600 mb-1">Plano destaque:</p>
              <p className="text-sm font-bold text-gray-800 mb-2">{region.topPlan}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-600">{formatNumber(region.planSales)} vendas</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  +{region.growth.toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
