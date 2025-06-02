
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface MapOverlayProps {
  regionsData: Record<string, RegionData>;
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
}

export function MapOverlay({ regionsData, activeRegion, setActiveRegion }: MapOverlayProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Norte - área verde superior */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: '8%',
          left: '15%',
          width: '70%',
          height: '35%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'norte' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg border-2 border-white"
            >
              NORTE
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Nordeste - área azul direita */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: '25%',
          right: '8%',
          width: '45%',
          height: '35%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'nordeste' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg border-2 border-white"
            >
              NORDESTE
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Centro-Oeste - área laranja centro-esquerda */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: '35%',
          left: '8%',
          width: '35%',
          height: '30%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'centrooeste' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-purple-600 text-white font-bold text-sm px-3 py-2 rounded-lg shadow-lg border-2 border-white"
            >
              CENTRO-OESTE
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Sudeste - área vermelha centro-direita */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: '50%',
          right: '15%',
          width: '40%',
          height: '25%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'sudeste' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg border-2 border-white"
            >
              SUDESTE
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Sul - área roxa inferior */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          bottom: '8%',
          left: '20%',
          width: '60%',
          height: '25%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'sul' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-orange-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow-lg border-2 border-white"
            >
              SUL
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Indicadores de atividade em tempo real */}
      {Object.entries(regionsData).map(([key, region], index) => {
        const positions = {
          norte: { top: '25%', left: '50%', transform: 'translate(-50%, -50%)' },
          nordeste: { top: '42%', right: '19%', transform: 'translate(50%, -50%)' },
          centrooeste: { top: '50%', left: '25%', transform: 'translate(-50%, -50%)' },
          sudeste: { top: '62%', right: '23%', transform: 'translate(50%, -50%)' },
          sul: { bottom: '20%', left: '50%', transform: 'translate(-50%, 50%)' }
        };
        
        const pos = positions[key as keyof typeof positions];
        
        return (
          <motion.div
            key={key}
            className="absolute w-2 h-2 bg-white rounded-full border border-gray-800 pointer-events-none"
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
  );
}
