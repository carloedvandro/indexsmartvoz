
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegionData } from './types';

interface MapTooltipProps {
  region: RegionData | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

export function MapTooltip({ region, position, isVisible }: MapTooltipProps) {
  if (!region || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed z-50 pointer-events-none"
        style={{
          left: position.x + 10,
          top: position.y - 10,
        }}
      >
        <div className="bg-black/90 text-white p-3 rounded-lg shadow-xl border border-gray-700 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: region.color }}
            />
            <h4 className="font-bold text-sm">{region.name}</h4>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-300">Vendas:</span>
              <span className="font-medium">{new Intl.NumberFormat('pt-BR').format(region.sales)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Crescimento:</span>
              <span className="font-medium text-green-400">+{region.growth.toFixed(1)}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Plano destaque:</span>
              <span className="font-medium text-blue-400">{region.topPlan}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-300">Vendas do plano:</span>
              <span className="font-medium">{new Intl.NumberFormat('pt-BR').format(region.planSales)}</span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <p className="text-xs text-gray-400">Clique para ver mais detalhes</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
