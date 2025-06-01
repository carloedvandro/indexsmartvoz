
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RegionData {
  name: string;
  sales: number;
  topPlan: string;
  planSales: number;
  color: string;
  growth: number;
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
      growth: 15.3
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#A855F7',
      growth: 22.7
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#9333EA',
      growth: 8.9
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#7C3AED',
      growth: 31.2
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#6D28D9',
      growth: 18.6
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
        <h3 className="text-lg font-semibold text-gray-800">Vendas por Região - Tempo Real</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa do Brasil em estilo roxo 3D */}
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto">
            <div className="relative w-full h-full flex justify-center items-center">
              <img 
                src="/lovable-uploads/68d83fda-39ef-4be8-b118-3fff93e206b5.png" 
                alt="Mapa do Brasil em estilo 3D roxo com marcadores" 
                className="w-full h-full object-contain max-h-96 drop-shadow-2xl"
              />
              
              {/* Overlay interativo para regiões com posicionamento preciso */}
              <div className="absolute inset-0 w-full h-full">
                {/* Norte - área superior */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '8%',
                    left: '25%',
                    width: '50%',
                    height: '25%',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'norte' && (
                      <div className="text-white font-bold text-sm bg-purple-600/90 px-3 py-1 rounded-full shadow-lg">
                        NORTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Nordeste - área direita superior */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '15%',
                    right: '8%',
                    width: '35%',
                    height: '30%',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'nordeste' && (
                      <div className="text-white font-bold text-sm bg-purple-600/90 px-3 py-1 rounded-full shadow-lg">
                        NORDESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Centro-Oeste - área centro-esquerda */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '35%',
                    left: '15%',
                    width: '25%',
                    height: '25%',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'centrooeste' && (
                      <div className="text-white font-bold text-xs bg-purple-600/90 px-2 py-1 rounded-full shadow-lg">
                        CENTRO-OESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Sudeste - área centro-direita */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '45%',
                    right: '25%',
                    width: '30%',
                    height: '20%',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'sudeste' && (
                      <div className="text-white font-bold text-sm bg-purple-600/90 px-3 py-1 rounded-full shadow-lg">
                        SUDESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Sul - área inferior */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    bottom: '15%',
                    left: '30%',
                    width: '40%',
                    height: '15%',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'sul' && (
                      <div className="text-white font-bold text-sm bg-purple-600/90 px-3 py-1 rounded-full shadow-lg">
                        SUL
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Indicadores de atividade em tempo real com estilo dos marcadores */}
                {Object.entries(regionsData).map(([key, region], index) => {
                  const positions = {
                    norte: { top: '20%', left: '50%' },
                    nordeste: { top: '30%', right: '25%' },
                    centrooeste: { top: '47%', left: '27%' },
                    sudeste: { top: '55%', right: '37%' },
                    sul: { bottom: '22%', left: '50%' }
                  };
                  
                  const pos = positions[key as keyof typeof positions];
                  
                  return (
                    <motion.div
                      key={key}
                      className="absolute w-6 h-6 bg-white rounded-full border-3 border-purple-600 pointer-events-none shadow-xl flex items-center justify-center"
                      style={pos}
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: ['0 0 0 0 rgba(147, 51, 234, 0.7)', '0 0 0 10px rgba(147, 51, 234, 0)', '0 0 0 0 rgba(147, 51, 234, 0)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    >
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
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
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: regionsData[activeRegion].color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: regionsData[activeRegion].color }}
                ></div>
                <h4 className="text-xl font-bold text-gray-800">
                  Região {regionsData[activeRegion].name}
                </h4>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
                        width: `${(regionsData[activeRegion].sales / 20000) * 100}%`
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
            <div className="bg-purple-50 rounded-xl p-6 text-center border-2 border-dashed border-purple-200">
              <div className="text-purple-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-purple-700 font-medium">Selecione uma região</p>
              <p className="text-sm text-purple-600">Clique em qualquer região do mapa para ver os dados em tempo real</p>
            </div>
          )}

          {/* Ranking das regiões com tema roxo */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏆</span>
              Ranking de Vendas
            </h4>
            <div className="space-y-3">
              {Object.entries(regionsData)
                .sort(([,a], [,b]) => b.sales - a.sales)
                .map(([key, region], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-all duration-200 border border-purple-100"
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
                      <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: region.color }}></div>
                      <div>
                        <span className="font-semibold text-gray-800">{region.name}</span>
                        <p className="text-xs text-gray-500">{region.topPlan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{formatNumber(region.sales)}</p>
                      <p className="text-xs text-green-600 font-medium">+{region.growth.toFixed(1)}%</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo dos planos mais vendidos com tema roxo */}
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
                <div className="w-3 h-3 rounded shadow-sm" style={{ backgroundColor: region.color }}></div>
                <span className="text-sm font-bold text-gray-800">{region.name}</span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-auto"></div>
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
