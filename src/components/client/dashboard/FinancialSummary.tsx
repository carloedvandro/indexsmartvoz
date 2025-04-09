
import React, { useMemo } from 'react';
import { formatCurrency } from '@/utils/format';
import { MonthData } from '@/utils/monthsData';

interface FinancialSummaryProps {
  activeMonth: string;
  monthsData: MonthData[];
}

export function FinancialSummary({ activeMonth, monthsData }: FinancialSummaryProps) {
  const activeMonthData = useMemo(() => {
    // First try to find by active flag
    const active = monthsData.find(m => m.active);
    if (active) return active;
    
    // If no active flag, find by month name
    const byMonth = monthsData.find(m => m.month === activeMonth);
    if (byMonth) return byMonth;
    
    // Fallback to default
    return { 
      month: "Abr", 
      day: "25", 
      active: true, 
      upValue: 16200, 
      downValue: 9800 
    };
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

  // Format the display date
  const displayDate = activeMonthData.date 
    ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(activeMonthData.date)
    : `${activeMonthData.month} ${activeMonthData.day}`;

  return (
    <div className="px-6 mb-6">
      {/* Até o momento card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div>
          <div className="max-w-[600px] mx-auto">
            <h2 className="text-3xl font-bold mb-1 text-gray-800">Até o momento</h2>
            <p className="text-sm text-gray-500 mb-4">{displayDate}</p>
            
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
        </div>
      </div>
    </div>
  );
}
