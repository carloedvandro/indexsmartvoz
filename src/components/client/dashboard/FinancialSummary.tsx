
import React, { useMemo } from 'react';
import { formatCurrency } from '@/utils/format';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from './charts/CircularProgress';
import { useChartData } from '@/hooks/useChartData';

export function FinancialSummary({ activeMonth, monthsData }) {
  const activeMonthData = useMemo(() => {
    return monthsData.find(m => m.month === activeMonth) || 
           { month: "Abr", day: "25", active: true, upValue: 16200, downValue: 9800 };
  }, [activeMonth, monthsData]);

  const balance = activeMonthData.upValue - activeMonthData.downValue;

  // Find previous month data
  const currentMonthIndex = monthsData.findIndex(m => m.month === activeMonth);
  const previousMonthIndex = currentMonthIndex > 0 ? currentMonthIndex - 1 : 11;
  const previousMonthData = monthsData[previousMonthIndex];

  const chartData = [
    { name: `${previousMonthData.month} ${previousMonthData.day}`, entrou: previousMonthData.upValue / 1000, saiu: previousMonthData.downValue / 1000 },
    { name: `${activeMonthData.month} ${activeMonthData.day}`, entrou: activeMonthData.upValue / 1000, saiu: activeMonthData.downValue / 1000 },
  ];

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
    <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Até o momento card */}
      <div className="lg:col-span-6 bg-white p-6 rounded-xl shadow">
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
          
          {/* Updated Circular chart summary */}
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
      
      {/* Comparação card */}
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-1 text-gray-800">Comparação</h2>
        <p className="text-sm text-gray-500 mb-4">com o período anterior</p>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 'dataMax + 5']}
                tickFormatter={(tick) => `R$${tick}k`} 
              />
              <Bar dataKey="entrou" fill="#22c55e" />
              <Bar dataKey="saiu" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Entrou</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Saiu</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Para acontecer card */}
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-1 text-gray-800">Para acontecer</h2>
            <p className="text-sm text-gray-500 mb-4">próximas 25 receitas e despesas futuras</p>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-teal-500 text-sm flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span className="text-teal-500">A Pagar</span>
            </div>
            <div className="text-teal-500 text-sm flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span className="text-teal-500">A Receber</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-48">
          <img src="/lovable-uploads/827312bb-9514-49ad-abe8-a83fa4a06324.png" alt="Nada por aqui" className="w-24 opacity-30" />
          <p className="text-gray-400 mt-2">Nada por aqui...</p>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="font-semibold text-lg">Saldo total:</div>
          <div className="font-bold text-xl">{formatStyledCurrency(balance)}</div>
        </div>
      </div>
    </div>
  );
}
