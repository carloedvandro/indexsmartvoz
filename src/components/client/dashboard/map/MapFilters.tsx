
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';

interface MapFiltersProps {
  activePeriod: string;
  onPeriodChange: (period: string) => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function MapFilters({ activePeriod, onPeriodChange, activeView, onViewChange }: MapFiltersProps) {
  const periods = [
    { id: 'today', label: 'Hoje', icon: Calendar },
    { id: 'week', label: 'Semana', icon: TrendingUp },
    { id: 'month', label: 'Mês', icon: BarChart3 }
  ];

  const views = [
    { id: 'sales', label: 'Vendas' },
    { id: 'growth', label: 'Crescimento' },
    { id: 'plans', label: 'Planos' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Filtro de Período */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Período:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {periods.map((period) => {
            const IconComponent = period.icon;
            return (
              <motion.button
                key={period.id}
                onClick={() => onPeriodChange(period.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${
                  activePeriod === period.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-3 h-3" />
                {period.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Filtro de Visualização */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Visualizar:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {views.map((view) => (
            <motion.button
              key={view.id}
              onClick={() => onViewChange(view.id)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                activeView === view.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {view.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
