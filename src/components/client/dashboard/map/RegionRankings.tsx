
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface RegionRankingsProps {
  regionsData: Record<string, RegionData>;
  setActiveRegion: (region: string) => void;
}

export function RegionRankings({ regionsData, setActiveRegion }: RegionRankingsProps) {
  return (
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
  );
}
