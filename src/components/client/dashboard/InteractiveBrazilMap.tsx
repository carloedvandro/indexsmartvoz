
import React, { useState, useEffect } from 'react';
import { BrazilMapSVG } from './map/BrazilMapSVG';
import { RegionMarkers } from './map/RegionMarkers';
import { RegionDetailsPanel } from './map/RegionDetailsPanel';
import { RegionRankings } from './map/RegionRankings';
import { RegionSummaryCards } from './map/RegionSummaryCards';
import { RegionData } from './map/types';

export function InteractiveBrazilMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [regionsData, setRegionsData] = useState<Record<string, RegionData>>({
    norte: {
      name: 'Norte',
      sales: 2847,
      topPlan: 'Smartvoz 100GB',
      planSales: 1425,
      color: '#8B5CF6',
      growth: 15.3,
      percentage: 7
    },
    nordeste: {
      name: 'Nordeste',
      sales: 8493,
      topPlan: 'Smartvoz 80GB',
      planSales: 4632,
      color: '#A855F7',
      growth: 22.7,
      percentage: 20
    },
    centrooeste: {
      name: 'Centro-Oeste',
      sales: 3621,
      topPlan: 'Smartvoz 120GB',
      planSales: 1987,
      color: '#9333EA',
      growth: 8.9,
      percentage: 10
    },
    sudeste: {
      name: 'Sudeste',
      sales: 15642,
      topPlan: 'Smartvoz 100GB',
      planSales: 8934,
      color: '#7C3AED',
      growth: 31.2,
      percentage: 45
    },
    sul: {
      name: 'Sul',
      sales: 6789,
      topPlan: 'Smartvoz 140GB',
      planSales: 3456,
      color: '#6D28D9',
      growth: 18.6,
      percentage: 18
    }
  });

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRegionsData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(region => {
          // Simular pequenas variações nas vendas
          const variation = Math.random() * 10 - 5; // -5 a +5
          newData[region].sales += Math.round(variation);
          newData[region].planSales += Math.round(variation * 0.6);
          
          // Atualizar crescimento
          newData[region].growth += (Math.random() - 0.5) * 0.2;
        });
        return newData;
      });
    }, 3000); // Atualizar a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.max(0, num));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-1">Distribuição Regional de</h3>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Vendas B2B no Brasil:</h3>
          <p className="text-sm text-gray-500 mt-1">Fonte: ABRASCA</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mapa 3D do Brasil criado com CSS */}
        <div className="relative">
          <BrazilMapSVG 
            activeRegion={activeRegion}
            setActiveRegion={setActiveRegion}
            regionsData={regionsData}
          />
          <RegionMarkers 
            activeRegion={activeRegion}
            setActiveRegion={setActiveRegion}
            regionsData={regionsData}
          />
        </div>

        {/* Dados da região */}
        <div className="space-y-4">
          <RegionDetailsPanel 
            activeRegion={activeRegion}
            regionsData={regionsData}
            formatNumber={formatNumber}
          />

          <RegionRankings 
            regionsData={regionsData}
            setActiveRegion={setActiveRegion}
          />
        </div>
      </div>

      <RegionSummaryCards 
        regionsData={regionsData}
        setActiveRegion={setActiveRegion}
        formatNumber={formatNumber}
      />
    </div>
  );
}
