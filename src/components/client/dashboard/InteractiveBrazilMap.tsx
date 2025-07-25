import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RegionData } from './map/types';
import { MapOverlay } from './map/MapOverlay';
import { RegionDetails } from './map/RegionDetails';
import { RegionRanking } from './map/RegionRanking';
import { PlansSummary } from './map/PlansSummary';
import { useIsMobile } from '@/hooks/use-mobile';

export function InteractiveBrazilMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [regionsData, setRegionsData] = useState<Record<string, RegionData>>({
    norte: {
      name: 'Norte',
      sales: 2847,
      topPlan: 'Smartvoz 100GB',
      planSales: 1425,
      color: '#10B981',
      growth: 15.3
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#3B82F6',
      growth: 22.7
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#8B5CF6',
      growth: 8.9
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#EF4444',
      growth: 31.2
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#F59E0B',
      growth: 18.6
    }
  });

  // Simular atualizações em tempo real - APENAS CRESCIMENTO
  useEffect(() => {
    const interval = setInterval(() => {
      setRegionsData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(region => {
          // Gerar apenas variações positivas (0 a +5) - reduzido para ser mais sutil
          const positiveVariation = Math.random() * 5;
          newData[region].sales += Math.round(positiveVariation);
          newData[region].planSales += Math.round(positiveVariation * 0.6);
          
          // Atualizar crescimento - apenas positivo (0 a +0.2%) - reduzido
          const growthIncrease = Math.random() * 0.2;
          newData[region].growth += growthIncrease;
        });
        return newData;
      });
    }, 8000); // Aumentado de 3 segundos para 8 segundos

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, num));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-gray-800">Vendas por Região - Tempo Real</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa 3D do Brasil */}
        <div className="relative">
          <div 
            className="relative w-full mx-auto -translate-x-[5px]"
            style={{ 
              height: isMobile ? '600px' : '750px',
              transform: 'scale(1.22) translateX(-5px)',
              transformOrigin: isMobile ? 'center top' : 'center top',
              marginTop: isMobile ? '-230px' : '0'
            }}
          >
            <div className="relative w-full h-full flex justify-center items-center">
              <img 
                src="/lovable-uploads/0dad93aa-051a-49c8-9a6e-ffe6b5108e20.png" 
                alt="Mapa 3D do Brasil por regiões" 
                className="w-full h-full object-contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
              
              <MapOverlay 
                regionsData={regionsData}
                activeRegion={activeRegion}
                setActiveRegion={setActiveRegion}
              />
            </div>
          </div>
          <p className="text-center text-sm text-gray-600" style={{ marginTop: '-53px' }}>
            Clique nas regiões para ver detalhes em tempo real
          </p>
        </div>

        {/* Dados da região */}
        <div className="space-y-4">
          <RegionDetails 
            activeRegion={activeRegion}
            regionsData={regionsData}
            formatNumber={formatNumber}
          />

          <RegionRanking 
            regionsData={regionsData}
            formatNumber={formatNumber}
            setActiveRegion={setActiveRegion}
          />
        </div>
      </div>

      <PlansSummary 
        regionsData={regionsData}
        formatNumber={formatNumber}
        setActiveRegion={setActiveRegion}
      />
    </>
  );
}
