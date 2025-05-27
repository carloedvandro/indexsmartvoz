
import React from 'react';

interface ProgressBarTooltipProps {
  visible: boolean;
  pixValue: number;
  boletoValue: number;
  position: { x: number; y: number };
}

export const ProgressBarTooltip: React.FC<ProgressBarTooltipProps> = ({
  visible,
  pixValue,
  boletoValue,
  position
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 transition-all duration-200 ease-out scale-105"
      style={{
        left: position.x,
        top: position.y - 120,
      }}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[180px]">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-black text-white rounded text-sm font-medium">
            <span>{formatCurrency(pixValue)} no Pix</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-black text-white rounded text-sm font-medium">
            <span>{formatCurrency(boletoValue)} no Boleto Bancário</span>
          </div>
        </div>
        {/* Arrow pointer */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
          <div className="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white -top-px left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};
