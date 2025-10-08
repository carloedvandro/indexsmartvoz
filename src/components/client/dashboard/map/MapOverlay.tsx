import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
interface MapOverlayProps {
  regionsData: Record<string, RegionData>;
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
}
export function MapOverlay({
  regionsData,
  activeRegion,
  setActiveRegion
}: MapOverlayProps) {
  const isMobile = useIsMobile();
  return <div className="absolute inset-2 w-full h-full">
      {/* Norte - área verde superior - movida 5px para cima no mobile */}
      <motion.div className="absolute cursor-pointer" style={{
      top: isMobile ? 'calc(8% + 85px)' : 'calc(8% + 90px)',
      // 5px para cima no mobile (85px vs 90px)
      left: 'calc(15% - 30px)',
      width: '70%',
      height: '35%'
    }} whileHover={{
      scale: 1.02
    }} onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}>
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'norte' && <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              NORTE
            </div>}
        </div>
      </motion.div>

      {/* Nordeste - área azul direita - mantida na posição original */}
      <motion.div className="absolute cursor-pointer" style={{
      top: 'calc(25% + 11.5px)',
      right: 'calc(12.5% + 1.5px)',
      width: '45%',
      height: '35%'
    }} whileHover={{
      scale: 1.02
    }} onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}>
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'nordeste' && <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              NORDESTE
            </div>}
        </div>
      </motion.div>

      {/* Centro-Oeste - área laranja centro - mantida na posição original */}
      <motion.div className="absolute cursor-pointer" style={{
      top: '35%',
      left: '35%',
      width: '30%',
      height: '25%'
    }} whileHover={{
      scale: 1.02
    }} onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}>
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'centrooeste' && <div className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">
              CENTRO-OESTE
            </div>}
        </div>
      </motion.div>

      {/* Sudeste - área vermelha centro-direita - mantida na posição original */}
      <motion.div className="absolute cursor-pointer" style={{
      top: 'calc(50% - 62px)',
      right: 'calc(15% + 40px)',
      width: '40%',
      height: '25%'
    }} whileHover={{
      scale: 1.02
    }} onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}>
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center">
          {activeRegion === 'sudeste' && <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              SUDESTE
            </div>}
        </div>
      </motion.div>

      {/* Sul - área roxa inferior - movida 2px para baixo no mobile */}
      <motion.div className="absolute cursor-pointer" style={{
      bottom: isMobile ? 'calc(32.5% + 5px)' : 'calc(32.5% + 7px)',
      // 2px para baixo no mobile (5px vs 7px)
      left: 'calc(51% - 3px)',
      width: '35%',
      height: '15%'
    }} whileHover={{
      scale: 1.02
    }} onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}>
        <div className="w-full h-full rounded-lg transition-all duration-300 flex items-center justify-center -translate-y-[5px]">
          {activeRegion === 'sul' && <div className="text-white font-bold text-lg bg-black/50 px-3 py-1 rounded">
              SUL
            </div>}
        </div>
      </motion.div>

      {/* Indicadores de atividade em tempo real */}
      {Object.entries(regionsData).map(([key, region], index) => {
      const positions = {
        norte: {
          top: isMobile ? 'calc(25% + 85px)' : 'calc(25% + 90px)',
          // Ajustado para acompanhar a região Norte
          left: 'calc(50% - 30px)',
          transform: 'translate(-50%, -50%)'
        },
        nordeste: {
          top: 'calc(42% + 11.5px)',
          right: 'calc(23.5% + 1.5px)',
          transform: 'translate(50%, -50%)'
        },
        centrooeste: {
          top: 'calc(49%)',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        sudeste: {
          top: 'calc(62% - 62px)',
          right: 'calc(26% + 40px)',
          transform: 'translate(50%, -50%)'
        },
        sul: {
          bottom: isMobile ? 'calc(41% + 5px)' : 'calc(41% + 7px)',
          // Ajustado para acompanhar a região Sul
          left: 'calc(51.5% - 3px)',
          transform: 'translate(-50%, 50%)'
        }
      };
      const pos = positions[key as keyof typeof positions];
      return <motion.div key={key} className="absolute w-1.5 h-1.5 bg-white rounded-full border border-gray-800 pointer-events-none" style={pos} animate={{
        scale: [1, 1.5, 1],
        opacity: [0.8, 1, 0.8]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        delay: index * 0.4
      }} />;
    })}
    </div>;
}