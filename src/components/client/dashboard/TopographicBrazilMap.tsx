
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RegionData {
  name: string;
  sales: number;
  topPlan: string;
  planSales: number;
  color: string;
  growth: number;
  elevation: number; // Nova propriedade para elevação
}

export function TopographicBrazilMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [regionsData, setRegionsData] = useState<Record<string, RegionData>>({
    norte: {
      name: 'Norte',
      sales: 2847,
      topPlan: 'Smartvoz 100GB',
      planSales: 1425,
      color: '#22c55e',
      growth: 15.3,
      elevation: 300
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#f59e0b',
      growth: 22.7,
      elevation: 600
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#f97316',
      growth: 8.9,
      elevation: 800
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#dc2626',
      growth: 31.2,
      elevation: 1000
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#7c3aed',
      growth: 18.6,
      elevation: 500
    }
  });

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRegionsData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(region => {
          const variation = Math.random() * 10 - 5;
          newData[region].sales += Math.round(variation);
          newData[region].planSales += Math.round(variation * 0.6);
          newData[region].growth += (Math.random() - 0.5) * 0.2;
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, num));
  };

  const getElevationColor = (elevation: number) => {
    if (elevation <= 200) return '#16a34a'; // Verde escuro
    if (elevation <= 400) return '#22c55e'; // Verde
    if (elevation <= 600) return '#84cc16'; // Verde claro
    if (elevation <= 800) return '#eab308'; // Amarelo
    if (elevation <= 1000) return '#f59e0b'; // Laranja
    return '#dc2626'; // Vermelho
  };

  const getShadowIntensity = (elevation: number) => {
    return Math.min(elevation / 1000 * 20, 20);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Mapa Topográfico 3D - Brasil</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Tempo Real</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Elevação:</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#16a34a' }}></div>
              <span className="text-gray-400">0-200m</span>
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-gray-400">200-400m</span>
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#eab308' }}></div>
              <span className="text-gray-400">600-800m</span>
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#dc2626' }}></div>
              <span className="text-gray-400">800m+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mapa Topográfico 3D */}
        <div className="relative">
          <div className="aspect-square max-w-lg mx-auto">
            <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden shadow-2xl">
              {/* Fundo topográfico com curvas de nível */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <pattern id="topographic-lines" patternUnits="userSpaceOnUse" width="40" height="40">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3"/>
                      <circle cx="20" cy="20" r="10" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.5"/>
                      <circle cx="20" cy="20" r="5" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.7"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#topographic-lines)"/>
                </svg>
              </div>

              {/* Regiões do Brasil com efeito 3D */}
              <svg viewBox="0 0 400 300" className="w-full h-full relative z-10">
                <defs>
                  {/* Gradientes para cada região */}
                  {Object.entries(regionsData).map(([key, region]) => (
                    <linearGradient key={key} id={`gradient-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getElevationColor(region.elevation)} stopOpacity="0.9"/>
                      <stop offset="50%" stopColor={region.color} stopOpacity="0.8"/>
                      <stop offset="100%" stopColor={getElevationColor(region.elevation)} stopOpacity="0.7"/>
                    </linearGradient>
                  ))}
                  
                  {/* Filtros de sombra para profundidade */}
                  <filter id="elevation-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
                  </filter>
                  
                  <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="-1" dy="-2" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.4"/>
                  </filter>
                </defs>

                {/* Norte */}
                <motion.path
                  d="M80 40 L320 40 L300 120 L100 120 Z"
                  fill={`url(#gradient-norte)`}
                  filter="url(#elevation-shadow)"
                  className="cursor-pointer transition-all duration-300"
                  stroke="#059669"
                  strokeWidth="1"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
                  style={{
                    filter: `drop-shadow(0 ${getShadowIntensity(regionsData.norte.elevation)}px ${getShadowIntensity(regionsData.norte.elevation) * 2}px rgba(0,0,0,0.3))`
                  }}
                />

                {/* Nordeste */}
                <motion.path
                  d="M300 40 L380 60 L370 140 L290 120 Z"
                  fill={`url(#gradient-nordeste)`}
                  filter="url(#elevation-shadow)"
                  className="cursor-pointer transition-all duration-300"
                  stroke="#d97706"
                  strokeWidth="1"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
                  style={{
                    filter: `drop-shadow(0 ${getShadowIntensity(regionsData.nordeste.elevation)}px ${getShadowIntensity(regionsData.nordeste.elevation) * 2}px rgba(0,0,0,0.3))`
                  }}
                />

                {/* Centro-Oeste */}
                <motion.path
                  d="M80 120 L200 120 L190 180 L90 180 Z"
                  fill={`url(#gradient-centrooeste)`}
                  filter="url(#elevation-shadow)"
                  className="cursor-pointer transition-all duration-300"
                  stroke="#ea580c"
                  strokeWidth="1"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
                  style={{
                    filter: `drop-shadow(0 ${getShadowIntensity(regionsData.centrooeste.elevation)}px ${getShadowIntensity(regionsData.centrooeste.elevation) * 2}px rgba(0,0,0,0.3))`
                  }}
                />

                {/* Sudeste */}
                <motion.path
                  d="M200 120 L320 140 L300 200 L180 180 Z"
                  fill={`url(#gradient-sudeste)`}
                  filter="url(#elevation-shadow)"
                  className="cursor-pointer transition-all duration-300"
                  stroke="#b91c1c"
                  strokeWidth="1"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
                  style={{
                    filter: `drop-shadow(0 ${getShadowIntensity(regionsData.sudeste.elevation)}px ${getShadowIntensity(regionsData.sudeste.elevation) * 2}px rgba(0,0,0,0.3))`
                  }}
                />

                {/* Sul */}
                <motion.path
                  d="M120 180 L280 200 L260 260 L140 240 Z"
                  fill={`url(#gradient-sul)`}
                  filter="url(#elevation-shadow)"
                  className="cursor-pointer transition-all duration-300"
                  stroke="#7c2d12"
                  strokeWidth="1"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
                  style={{
                    filter: `drop-shadow(0 ${getShadowIntensity(regionsData.sul.elevation)}px ${getShadowIntensity(regionsData.sul.elevation) * 2}px rgba(0,0,0,0.3))`
                  }}
                />

                {/* Marcadores de elevação */}
                {Object.entries(regionsData).map(([key, region], index) => {
                  const positions = {
                    norte: { x: 200, y: 80 },
                    nordeste: { x: 340, y: 100 },
                    centrooeste: { x: 135, y: 150 },
                    sudeste: { x: 250, y: 160 },
                    sul: { x: 200, y: 220 }
                  };
                  
                  const pos = positions[key as keyof typeof positions];
                  
                  return (
                    <g key={key}>
                      {/* Pico de elevação */}
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r="8"
                        fill="#ffffff"
                        stroke={region.color}
                        strokeWidth="2"
                        filter="url(#elevation-shadow)"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.4
                        }}
                      />
                      {/* Indicador de elevação */}
                      <text
                        x={pos.x}
                        y={pos.y + 25}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-700"
                      >
                        {region.elevation}m
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Label da região ativa */}
              {activeRegion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg font-bold text-sm"
                >
                  {regionsData[activeRegion].name.toUpperCase()}
                  <div className="text-xs opacity-75">
                    Elevação: {regionsData[activeRegion].elevation}m
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Mapa topográfico interativo com relevo em 3D
          </p>
        </div>

        {/* Painel de dados */}
        <div className="space-y-6">
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
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {regionsData[activeRegion].elevation}m
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-600">Vendas Totais</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      +{regionsData[activeRegion].growth.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-2">
                    {formatNumber(regionsData[activeRegion].sales)}
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-600 mb-2">Plano Destaque</p>
                  <p className="text-xl font-bold text-gray-800">
                    {regionsData[activeRegion].topPlan}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatNumber(regionsData[activeRegion].planSales)} vendas
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z"/>
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Clique em uma região</p>
              <p className="text-sm text-gray-500">Explore os dados topográficos e de vendas</p>
            </div>
          )}

          {/* Ranking por elevação */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🏔️</span>
              Ranking por Elevação
            </h4>
            <div className="space-y-3">
              {Object.entries(regionsData)
                .sort(([,a], [,b]) => b.elevation - a.elevation)
                .map(([key, region], index) => (
                  <motion.div
                    key={key}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={() => setActiveRegion(key)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getElevationColor(region.elevation) }}></div>
                      <div>
                        <span className="font-semibold text-gray-800">{region.name}</span>
                        <p className="text-xs text-gray-500">{formatNumber(region.sales)} vendas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{region.elevation}m</p>
                      <p className="text-xs text-green-600">+{region.growth.toFixed(1)}%</p>
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
