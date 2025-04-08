
import React from 'react';
import { formatCurrency } from '@/utils/format';

export function FinancialSummary() {
  return (
    <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-1">Até o momento</h2>
        <p className="text-sm text-gray-500 mb-4">Fev 25</p>
        
        <div className="bg-green-50 p-3 rounded-md mb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-green-500 mr-2">↑</div>
              <div>
                <div className="text-green-600 font-medium">Entrou</div>
                <div className="text-sm text-green-500">Receitas</div>
              </div>
            </div>
            <div className="text-right">{formatCurrency(0)}</div>
          </div>
        </div>
        
        <div className="bg-red-50 p-3 rounded-md mb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-red-500 mr-2">↓</div>
              <div>
                <div className="text-red-600 font-medium">Saiu</div>
                <div className="text-sm text-red-500">Despesas</div>
              </div>
            </div>
            <div className="text-right">- {formatCurrency(0)}</div>
          </div>
        </div>
        
        <div className="p-3 rounded-md border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-gray-800 mr-2">→</div>
              <div>
                <div className="text-gray-800 font-medium">Sobrou</div>
                <div className="text-sm text-gray-500">Saldo</div>
              </div>
            </div>
            <div className="text-right">{formatCurrency(0)}</div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">*Estes valores não consideram retiradas e aportes de sócio. Representam só as movimentações da operação da empresa.</p>
      </div>
      
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-1">Comparação</h2>
        <p className="text-sm text-gray-500 mb-4">com o período anterior</p>
        
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Gráfico de comparação</p>
        </div>
      </div>
      
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-1">Para acontecer</h2>
        <p className="text-sm text-gray-500 mb-4">próximas 25 receitas e despesas futuras</p>
        
        <div className="flex flex-col items-center justify-center h-64">
          <img src="/lovable-uploads/827312bb-9514-49ad-abe8-a83fa4a06324.png" alt="Nada por aqui" className="w-24 opacity-30" />
          <p className="text-gray-400 mt-4">Nada por aqui...</p>
        </div>
        
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="font-bold">Saldo total:</div>
          <div className="font-bold text-xl">{formatCurrency(0)}</div>
        </div>
      </div>
    </div>
  );
}
