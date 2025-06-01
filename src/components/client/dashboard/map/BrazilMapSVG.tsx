
import React from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './types';

interface BrazilMapSVGProps {
  activeRegion: string | null;
  setActiveRegion: (region: string | null) => void;
  regionsData: Record<string, RegionData>;
}

export function BrazilMapSVG({ activeRegion, setActiveRegion, regionsData }: BrazilMapSVGProps) {
  return (
    <div className="relative">
      <div className="aspect-square max-w-lg mx-auto relative">
        <div 
          className="relative w-full h-full flex justify-center items-center rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
            perspective: '1000px'
          }}
        >
          <div 
            className="relative w-80 h-96 cursor-pointer transition-transform duration-500 hover:scale-105"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(-10deg)'
            }}
          >
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.3))' }}
            >
              {/* Região Norte */}
              <motion.path
                d="M80 80 L320 80 L320 180 L280 200 L200 190 L120 170 L80 150 Z"
                fill="url(#gradient-norte)"
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion(activeRegion === 'norte' ? null : 'norte')}
                style={{ filter: 'drop-shadow(0 5px 15px rgba(59, 130, 246, 0.4))' }}
              />

              {/* Região Nordeste */}
              <motion.path
                d="M280 200 L380 190 L390 280 L360 320 L280 300 L280 200 Z"
                fill="url(#gradient-nordeste)"
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion(activeRegion === 'nordeste' ? null : 'nordeste')}
                style={{ filter: 'drop-shadow(0 5px 15px rgba(37, 99, 235, 0.4))' }}
              />

              {/* Região Centro-Oeste */}
              <motion.path
                d="M120 170 L200 190 L280 200 L280 300 L200 320 L120 300 L100 250 L120 170 Z"
                fill="url(#gradient-centrooeste)"
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion(activeRegion === 'centrooeste' ? null : 'centrooeste')}
                style={{ filter: 'drop-shadow(0 5px 15px rgba(59, 130, 246, 0.4))' }}
              />

              {/* Região Sudeste */}
              <motion.path
                d="M200 320 L280 300 L360 320 L340 400 L260 420 L200 400 L200 320 Z"
                fill="url(#gradient-sudeste)"
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion(activeRegion === 'sudeste' ? null : 'sudeste')}
                style={{ filter: 'drop-shadow(0 5px 15px rgba(29, 78, 216, 0.4))' }}
              />

              {/* Região Sul */}
              <motion.path
                d="M200 400 L260 420 L240 480 L160 470 L140 450 L160 420 L200 400 Z"
                fill="url(#gradient-sul)"
                stroke="#1e40af"
                strokeWidth="2"
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveRegion(activeRegion === 'sul' ? null : 'sul')}
                style={{ filter: 'drop-shadow(0 5px 15px rgba(37, 99, 235, 0.4))' }}
              />

              {/* Gradientes para efeito 3D */}
              <defs>
                <linearGradient id="gradient-norte" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="gradient-nordeste" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="gradient-centrooeste" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="gradient-sudeste" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="gradient-sul" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Clique nas regiões para ver detalhes em tempo real
      </p>
    </div>
  );
}
