
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionSummaryCardsProps {
  regionsData: Record<string, RegionData>;
  setActiveRegion: (region: string) => void;
  formatNumber: (num: number) => string;
}

export function RegionSummaryCards({ regionsData, setActiveRegion, formatNumber }: RegionSummaryCardsProps) {
  return (
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
  );
}
