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
      color: '#10B981',
      growth: 15.3
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#3B82F6',
      growth: 22.7
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#F59E0B',
      growth: 8.9
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#EF4444',
      growth: 31.2
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#8B5CF6',
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
        {/* Mapa moderno do Brasil */}
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto">
            <div className="relative w-full h-full flex justify-center items-center">
              <img 
                src="/lovable-uploads/ceec55aa-c124-44fc-a14a-94437b064980.png" 
                alt="Mapa moderno do Brasil por regiões" 
                className="w-full h-full object-contain max-h-96"
              />
              
              {/* Overlay interativo para regiões com posicionamento ajustado */}
              <div className="absolute inset-0 w-full h-full">
                {/* Norte - área verde superior */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '10%',
                    left: '20%',
                    width: '60%',
                    height: '30%',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
                >
                  <div className="w-full h-full rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'norte' && (
                      <div className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded">
                        NORTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Nordeste - área azul direita */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '20%',
                    right: '10%',
                    width: '40%',
                    height: '35%',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
                >
                  <div className="w-full h-full rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'nordeste' && (
                      <div className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded">
                        NORDESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Centro-Oeste - área laranja centro-esquerda */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '35%',
                    left: '10%',
                    width: '30%',
                    height: '30%',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
                >
                  <div className="w-full h-full rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'centrooeste' && (
                      <div className="text-white font-bold text-xs bg-black/70 px-2 py-1 rounded">
                        CENTRO-OESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Sudeste - área vermelha centro-direita */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    top: '45%',
                    right: '20%',
                    width: '35%',
                    height: '25%',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
                >
                  <div className="w-full h-full rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'sudeste' && (
                      <div className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded">
                        SUDESTE
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Sul - área roxa inferior */}
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    bottom: '15%',
                    left: '25%',
                    width: '50%',
                    height: '20%',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
                >
                  <div className="w-full h-full rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300 flex items-center justify-center">
                    {activeRegion === 'sul' && (
                      <div className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded">
                        SUL
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Indicadores de atividade em tempo real */}
                {Object.entries(regionsData).map(([key, region], index) => {
                  const positions = {
                    norte: { top: '25%', left: '50%' },
                    nordeste: { top: '37%', right: '27%' },
                    centrooeste: { top: '50%', left: '25%' },
                    sudeste: { top: '57%', right: '37%' },
                    sul: { bottom: '25%', left: '50%' }
                  };
                  
                  const pos = positions[key as keyof typeof positions];
                  
                  return (
                    <motion.div
                      key={key}
                      className="absolute w-3 h-3 bg-white rounded-full border-2 border-gray-800 pointer-events-none shadow-lg"
                      style={pos}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4
                      }}
                    />
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
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-l-4"
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
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
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
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
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
            <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Selecione uma região</p>
              <p className="text-sm text-gray-500">Clique em qualquer região do mapa para ver os dados em tempo real</p>
            </div>
          )}

          {/* Ranking das regiões */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
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
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setActiveRegion(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: region.color }}></div>
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

      {/* Resumo dos planos mais vendidos */}
      <div className="mt-8">
        <h4 className="text-lg font-bold text-gray-800 mb-4">Resumo dos Planos por Região</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(regionsData).map(([key, region]) => (
            <motion.div 
              key={key} 
              className="bg-white rounded-lg p-4 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-all duration-200"
              style={{ borderLeftColor: region.color }}
              onClick={() => setActiveRegion(key)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: region.color }}></div>
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
