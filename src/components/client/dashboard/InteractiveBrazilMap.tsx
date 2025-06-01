
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
      color: '#8B5CF6',
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
      color: '#F59E0B',
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
        {/* Mapa do Brasil */}
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Norte */}
              <motion.path
                d="M50 50 L350 50 L350 150 L50 150 Z"
                fill={regionsData.norte.color}
                fillOpacity={activeRegion === 'norte' ? 0.8 : 0.6}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
              />
              <text x="200" y="100" textAnchor="middle" className="fill-white font-semibold text-sm">
                NORTE
              </text>

              {/* Nordeste */}
              <motion.path
                d="M250 150 L350 150 L350 250 L250 250 Z"
                fill={regionsData.nordeste.color}
                fillOpacity={activeRegion === 'nordeste' ? 0.8 : 0.6}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
              />
              <text x="300" y="200" textAnchor="middle" className="fill-white font-semibold text-sm">
                NORDESTE
              </text>

              {/* Centro-Oeste */}
              <motion.path
                d="M50 150 L250 150 L250 300 L50 300 Z"
                fill={regionsData.centrooeste.color}
                fillOpacity={activeRegion === 'centrooeste' ? 0.8 : 0.6}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
              />
              <text x="150" y="225" textAnchor="middle" className="fill-white font-semibold text-sm">
                CENTRO-OESTE
              </text>

              {/* Sudeste */}
              <motion.path
                d="M250 250 L350 250 L350 300 L250 300 Z"
                fill={regionsData.sudeste.color}
                fillOpacity={activeRegion === 'sudeste' ? 0.8 : 0.6}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
              />
              <text x="300" y="275" textAnchor="middle" className="fill-white font-semibold text-sm">
                SUDESTE
              </text>

              {/* Sul */}
              <motion.path
                d="M200 300 L350 300 L350 350 L200 350 Z"
                fill={regionsData.sul.color}
                fillOpacity={activeRegion === 'sul' ? 0.8 : 0.6}
                stroke="#fff"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
              />
              <text x="275" y="325" textAnchor="middle" className="fill-white font-semibold text-sm">
                SUL
              </text>
            </svg>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Clique nas regiões para ver detalhes
          </p>
        </div>

        {/* Dados da região */}
        <div className="space-y-4">
          {activeRegion ? (
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Região {regionsData[activeRegion].name}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Total de Vendas</p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatNumber(regionsData[activeRegion].sales)}
                  </p>
                  <p className="text-sm text-green-600">
                    +{regionsData[activeRegion].growth.toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm text-gray-600">Plano Mais Vendido</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {regionsData[activeRegion].topPlan}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatNumber(regionsData[activeRegion].planSales)} vendas
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600">Selecione uma região para ver os detalhes</p>
            </div>
          )}

          {/* Ranking das regiões */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Ranking de Vendas
            </h4>
            <div className="space-y-2">
              {Object.entries(regionsData)
                .sort(([,a], [,b]) => b.sales - a.sales)
                .map(([key, region], index) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 bg-white rounded cursor-pointer hover:bg-blue-50"
                    onClick={() => setActiveRegion(key)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: region.color }}></div>
                      <span className="font-medium">{region.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatNumber(region.sales)}</p>
                      <p className="text-xs text-green-600">+{region.growth.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo dos planos mais vendidos */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(regionsData).map(([key, region]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: region.color }}></div>
              <span className="text-sm font-medium">{region.name}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">Plano destaque:</p>
            <p className="text-sm font-semibold">{region.topPlan}</p>
            <p className="text-xs text-gray-600">{formatNumber(region.planSales)} vendas</p>
          </div>
        ))}
      </div>
    </div>
  );
}
