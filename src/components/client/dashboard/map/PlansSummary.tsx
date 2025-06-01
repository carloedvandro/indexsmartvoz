
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface PlansSummaryProps {
  regionsData: Record<string, RegionData>;
  formatNumber: (num: number) => string;
  setActiveRegion: (region: string) => void;
}

export function PlansSummary({ regionsData, formatNumber, setActiveRegion }: PlansSummaryProps) {
  return (
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
  );
}
