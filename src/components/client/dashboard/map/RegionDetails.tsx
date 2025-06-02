
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionDetailsProps {
  activeRegion: string | null;
  regionsData: Record<string, RegionData>;
  formatNumber: (num: number) => string;
}

export function RegionDetails({ activeRegion, regionsData, formatNumber }: RegionDetailsProps) {
  if (!activeRegion) {
    return (
      <div className="bg-transparent rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v10h12V6H4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">Selecione uma região</p>
        <p className="text-sm text-gray-500">Clique em qualquer região do mapa para ver os dados em tempo real</p>
      </div>
    );
  }

  const regionData = regionsData[activeRegion];

  return (
    <motion.div
      key={activeRegion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-transparent rounded-xl p-6 border-l-4"
      style={{ borderLeftColor: regionData.color }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: regionData.color }}
        ></div>
        <h4 className="text-xl font-bold text-gray-800">
          Região {regionData.name}
        </h4>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-transparent rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              +{regionData.growth.toFixed(1)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {formatNumber(regionData.sales)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: regionData.color,
                width: `${(regionData.sales / 20000) * 100}%`
              }}
            ></div>
          </div>
        </div>
        
        <div className="bg-transparent rounded-lg p-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Plano Mais Vendido</p>
          <p className="text-xl font-bold text-gray-800 mb-1">
            {regionData.topPlan}
          </p>
          <p className="text-sm text-gray-600">
            {formatNumber(regionData.planSales)} vendas hoje
          </p>
        </div>
      </div>
    </motion.div>
  );
}
