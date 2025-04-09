
import React, { useMemo } from 'react';
import { formatCurrency } from '@/utils/format';

export function FinancialSummary({ activeMonth, monthsData }) {
  const activeMonthData = useMemo(() => {
    return monthsData.find(m => m.month === activeMonth) || 
           { month: "Abr", day: "25", active: true, upValue: 16200, downValue: 9800 };
  }, [activeMonth, monthsData]);

  const balance = activeMonthData.upValue - activeMonthData.downValue;

  // Function to style the numbers in currency format
  const formatStyledCurrency = (value) => {
    const parts = formatCurrency(value).split(',');
    // For the integer part
    const integerPart = parts[0].replace(/\D/g, '');
    
    return (
      <span className="flex items-baseline">
        <span className="text-gray-600 mr-1">R$</span>
        <span className="text-blue-600 font-bold">{integerPart}</span>
        {parts.length > 1 && (
          <>
            <span className="text-gray-600">,</span>
            <span className="text-gray-600 text-sm">{parts[1]}</span>
          </>
        )}
      </span>
    );
  };

  return (
    <div className="px-6 mb-6">
      {/* Até o momento card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="flex-1 max-w-[400px]">
            <h2 className="text-3xl font-bold mb-1 text-gray-800">Até o momento</h2>
            <p className="text-sm text-gray-500 mb-4">{activeMonthData.month} {activeMonthData.day}</p>
            
            {/* Entrou section */}
            <div className="bg-green-50 p-4 rounded-md mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-600 font-medium">Entrou</div>
                    <div className="text-sm text-green-500">Receitas</div>
                  </div>
                </div>
                <div className="text-right">{formatStyledCurrency(activeMonthData.upValue)}</div>
              </div>
            </div>
            
            {/* Saiu section */}
            <div className="bg-red-50 p-4 rounded-md mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-red-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium">Saiu</div>
                    <div className="text-sm text-red-500">Despesas</div>
                  </div>
                </div>
                <div className="text-right">- {formatStyledCurrency(activeMonthData.downValue)}</div>
              </div>
            </div>
            
            {/* Sobrou section */}
            <div className="p-4 rounded-md border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-gray-800 mr-2">→</div>
                  <div>
                    <div className="text-gray-800 font-medium">Sobrou</div>
                    <div className="text-sm text-gray-500">Saldo</div>
                  </div>
                </div>
                <div className="text-right">{formatStyledCurrency(balance)}</div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 leading-tight">*Estes valores não consideram retiradas e aportes de sócio. Representam só as movimentações da operação da empresa.</p>
          </div>
          
          {/* Circular chart summary */}
          <div className="flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-[200px] h-[200px]">
              <div className="absolute inset-0 rounded-full bg-gray-200"></div>
              <div className="absolute inset-[15px] rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center mb-2 justify-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Entrou: {formatStyledCurrency(activeMonthData.upValue)}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Saiu: {formatStyledCurrency(activeMonthData.downValue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
