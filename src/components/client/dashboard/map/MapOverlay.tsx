
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
            <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              NORTE
            </div>
          )}
        </div>
      </motion.div>

      {/* Nordeste - área azul direita - movida 7.5px para baixo e 1,5px para esquerda */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(25% + 7.5px)',
          right: 'calc(12.5% + 1.5px)',
          width: '45%',
          height: '35%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'nordeste' && (
            <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              NORDESTE
            </div>
          )}
        </div>
      </motion.div>

      {/* Centro-Oeste - área laranja centro - movida 2px para baixo */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(35% + 2px)',
          left: '35%',
          width: '30%',
          height: '25%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'centrooeste' && (
            <div className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">
              CENTRO-OESTE
            </div>
          )}
        </div>
      </motion.div>

      {/* Sudeste - área vermelha centro-direita - movida 40px para cima e 20px para esquerda */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(50% - 40px)',
          right: 'calc(15% + 20px)',
          width: '40%',
          height: '25%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'sudeste' && (
            <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              SUDESTE
            </div>
          )}
        </div>
      </motion.div>

      {/* Sul - área roxa inferior */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          bottom: '32.5%',
          left: '51%',
          width: '35%',
          height: '15%',
        }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
      >
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'sul' && (
            <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              SUL
            </div>
          )}
        </div>
      </motion.div>

      {/* Indicadores de atividade em tempo real */}
      {Object.entries(regionsData).map(([key, region], index) => {
        const positions = {
          norte: { top: '25%', left: '50%', transform: 'translate(-50%, -50%)' },
          nordeste: { top: 'calc(42% + 7.5px)', right: 'calc(23.5% + 1.5px)', transform: 'translate(50%, -50%)' },
          centrooeste: { top: 'calc(47% + 2px)', left: '50%', transform: 'translate(-50%, -50%)' },
          sudeste: { top: 'calc(62% - 40px)', right: 'calc(23% + 20px)', transform: 'translate(50%, -50%)' },
          sul: { bottom: '41%', left: '51.5%', transform: 'translate(-50%, 50%)' }
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
