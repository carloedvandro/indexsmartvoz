
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
      {/* Norte - área verde superior - movida 120px para baixo e 30px para esquerda (movida mais 10px para cima) */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(8% + 100px)', // Movida 10px para cima (de +110px para +100px)
          left: 'calc(15% - 30px)',
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

      {/* Nordeste - área azul direita - movida 5px para cima (de +21.5px para +16.5px) */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(25% + 16.5px)', // Movida 5px para cima (de +21.5px para +16.5px)
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

      {/* Centro-Oeste - área laranja centro - movida 4px para cima (de +4px para 0px) */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: '35%', // Movida 4px para cima (removido o +4px)
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

      {/* Sudeste - área vermelha centro-direita - movida 3px para esquerda no mobile */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: 'calc(50% - 62px)', // Mantida a posição vertical atual
          right: 'calc(15% + 49px)', // Movida 3px para esquerda (de +46px para +49px)
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

      {/* Sul - área roxa inferior - movida 10px para cima e 3px para esquerda no mobile */}
      <motion.div
        className="absolute cursor-pointer"
        style={{
          bottom: 'calc(32.5% + 9px)', // Movida mais 2px para cima (totalizando 12px para cima)
          left: 'calc(51% - 3px)', // Mantida a posição horizontal (3px para esquerda)
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
          norte: { top: 'calc(25% + 100px)', left: 'calc(50% - 30px)', transform: 'translate(-50%, -50%)' }, // Ajustado para acompanhar a região Norte
          nordeste: { top: 'calc(42% + 16.5px)', right: 'calc(23.5% + 1.5px)', transform: 'translate(50%, -50%)' }, // Ajustado para acompanhar a região Nordeste (5px para cima)
          centrooeste: { top: 'calc(49%)', left: '50%', transform: 'translate(-50%, -50%)' }, // Ajustado para acompanhar a região Centro-Oeste
          sudeste: { top: 'calc(62% - 62px)', right: 'calc(26% + 49px)', transform: 'translate(50%, -50%)' }, // Ajustado para acompanhar a região Sudeste (3px para esquerda)
          sul: { bottom: 'calc(41% + 9px)', left: 'calc(51.5% - 3px)', transform: 'translate(-50%, 50%)' } // Ajustado para acompanhar a região Sul
        };
        
        const pos = positions[key as keyof typeof positions];
        
        return (
          <motion.div
            key={key}
            className="absolute w-1.5 h-1.5 bg-white rounded-full border border-gray-800 pointer-events-none"
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
