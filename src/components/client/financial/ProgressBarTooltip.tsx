
import React from 'react';

interface ProgressBarTooltipProps {
  visible: boolean;
  value: number;
  paymentMethod: 'pix' | 'boleto';
  position: { x: number; y: number };
  sectionCenter?: number; // Nova prop para receber o centro da seção
}

export const ProgressBarTooltip: React.FC<ProgressBarTooltipProps> = ({
  visible,
  value,
  paymentMethod,
  position,
  sectionCenter
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!visible) return null;

  const text = paymentMethod === 'pix' 
    ? `${formatCurrency(value)} no Pix`
    : `${formatCurrency(value)} no Boleto Bancário`;

  // Usar o centro da seção se fornecido, senão usar a posição do mouse
  const xPosition = sectionCenter !== undefined ? sectionCenter : position.x;
  const yOffset = -45;

  return (
    <div 
      className="fixed z-50 pointer-events-none"
      style={{
        left: xPosition,
        top: position.y + yOffset,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="bg-black text-white rounded-lg px-3 py-2 text-sm font-medium shadow-lg">
        <div className="text-center">
          {text}
        </div>
        {/* Arrow pointer */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      </div>
    </div>
  );
};
