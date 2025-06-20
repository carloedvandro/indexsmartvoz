
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RegionData } from './types';

interface RegionComparisonChartProps {
  regionsData: Record<string, RegionData>;
  activeView: string;
}

export function RegionComparisonChart({ regionsData, activeView }: RegionComparisonChartProps) {
  const chartData = Object.entries(regionsData).map(([key, region]) => ({
    name: region.name,
    vendas: region.sales,
    crescimento: region.growth,
    planos: region.planSales,
    color: region.color
  }));

  const getDataKey = () => {
    switch (activeView) {
      case 'growth': return 'crescimento';
      case 'plans': return 'planos';
      default: return 'vendas';
    }
  };

  const getLabel = () => {
    switch (activeView) {
      case 'growth': return 'Crescimento (%)';
      case 'plans': return 'Vendas de Planos';
      default: return 'Total de Vendas';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold text-gray-800">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-gray-600">Vendas: </span>
              <span className="font-medium">{new Intl.NumberFormat('pt-BR').format(data.vendas)}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Crescimento: </span>
              <span className="font-medium text-green-600">+{data.crescimento.toFixed(1)}%</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Vendas de Planos: </span>
              <span className="font-medium">{new Intl.NumberFormat('pt-BR').format(data.planos)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">
        Comparação por Região - {getLabel()}
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey={getDataKey()} 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
