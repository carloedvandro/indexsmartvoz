
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionRankingProps {
  regionsData: Record<string, RegionData>;
  formatNumber: (num: number) => string;
  setActiveRegion: (region: string) => void;
}

export function RegionRanking({ regionsData, formatNumber, setActiveRegion }: RegionRankingProps) {
  return (
    <div className="bg-transparent rounded-xl p-6 border">
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
  );
}
