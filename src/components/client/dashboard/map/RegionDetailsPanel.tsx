
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionDetailsPanelProps {
  activeRegion: string | null;
  regionsData: Record<string, RegionData>;
  formatNumber: (num: number) => string;
}

export function RegionDetailsPanel({ activeRegion, regionsData, formatNumber }: RegionDetailsPanelProps) {
  if (!activeRegion) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 text-center border-2 border-dashed border-purple-200">
        <div className="text-purple-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-purple-700 font-medium">Selecione uma região</p>
        <p className="text-sm text-purple-600">Clique em qualquer região do mapa para ver os dados em tempo real</p>
      </div>
    );
  }

  const region = regionsData[activeRegion];

  return (
    <motion.div
      key={activeRegion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-l-4"
      style={{ borderLeftColor: region.color }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-6 h-6 rounded-full shadow-lg border-2 border-white"
          style={{ backgroundColor: region.color }}
        ></div>
        <h4 className="text-xl font-bold text-gray-800">
          Região {region.name}
        </h4>
        <span className="text-lg font-bold text-purple-600">
          {region.percentage}%
        </span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              +{region.growth.toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {formatNumber(region.sales)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: region.color,
                width: `${region.percentage * 2}%`
              }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
          <p className="text-sm font-medium text-gray-600 mb-2">Plano Mais Vendido</p>
          <p className="text-xl font-bold text-gray-800 mb-1">
            {region.topPlan}
          </p>
          <p className="text-sm text-gray-600">
            {formatNumber(region.planSales)} vendas hoje
          </p>
        </div>
      </div>
    </motion.div>
  );
}
