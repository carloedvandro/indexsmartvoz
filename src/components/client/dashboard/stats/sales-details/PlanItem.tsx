
import React from "react";

interface PlanItemProps {
  plan: {
    name: string;
    fullName: string;
    value: number;
    price: number;
    totalAmount: number;
    color: string;
  };
  isActive: boolean;
  onClick: (index: number, event: React.MouseEvent) => void;
  index: number;
  showTooltip: boolean;
}

export function PlanItem({ plan, isActive, onClick, index, showTooltip }: PlanItemProps) {
  return (
    <div className="flex items-center relative">
      <div 
        className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all duration-300 ${isActive ? 'scale-125 shadow-lg' : ''}`}
        style={{ 
          backgroundColor: plan.color,
          transform: isActive ? 'scale(1.25)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
        }}
        onClick={(e) => onClick(index, e)}
      />
      <div className="flex-1">
        <p className={`text-sm text-black pt-[4px] transition-opacity duration-300 ${isActive ? 'opacity-100' : isActive !== null ? 'opacity-60' : 'opacity-100'}`}>
          {plan.fullName}
        </p>
      </div>
      {showTooltip && isActive && (
        <div 
          className="absolute left-6 -top-1 bg-white p-2 rounded-md shadow-lg border border-gray-200 z-50"
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: '-0.25rem'
          }}
        >
          <p className="text-sm font-medium">{plan.fullName}</p>
          <p className="text-sm">{plan.value} vendas</p>
          <p className="text-sm font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.totalAmount)}</p>
        </div>
      )}
    </div>
  );
}
