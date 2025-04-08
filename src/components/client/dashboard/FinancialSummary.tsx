import React from 'react';
import { formatCurrency } from '@/utils/format';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from './charts/CircularProgress';

const chartData = [
  { name: 'Mar 25', entrou: 0, saiu: 0 },
  { name: 'Abr 25', entrou: 0, saiu: 0 },
];

export function FinancialSummary() {
  return (
    <div className="px-6 grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
      {/* Até o momento card - slightly narrower */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">Até o momento</h2>
            <p className="text-sm text-gray-500 mb-4">Abr 25</p>
            
            {/* Entrou section */}
            <div className="bg-green-50 p-3 rounded-md mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-600 font-medium">Entrou</div>
                    <div className="text-sm text-green-500">Receitas</div>
                  </div>
                </div>
                <div className="text-right">R$ 0,00</div>
              </div>
            </div>
            
            {/* Saiu section */}
            <div className="bg-red-50 p-3 rounded-md mb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-red-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-600 font-medium">Saiu</div>
                    <div className="text-sm text-red-500">Despesas</div>
                  </div>
                </div>
                <div className="text-right">- R$ 0,00</div>
              </div>
            </div>
            
            {/* Sobrou section */}
            <div className="p-3 rounded-md border border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-gray-800 mr-2">→</div>
                  <div>
                    <div className="text-gray-800 font-medium">Sobrou</div>
                    <div className="text-sm text-gray-500">Saldo</div>
                  </div>
                </div>
                <div className="text-right">R$ 0,00</div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">*Estes valores não consideram retiradas e aportes de sócio. Representam só as movimentações da operação da empresa.</p>
          </div>
          
          {/* Circular chart summary */}
          <div className="flex items-center justify-center mt-6 lg:mt-0">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-green-500 text-sm">Entrou: R$ 0,00</div>
                  <div className="text-red-500 text-sm mt-1">Saiu: R$ 0,00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comparação card */}
      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-1">Comparação</h2>
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
                domain={[0, 1]}
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]} 
                tickFormatter={(tick) => `R$${tick}`} 
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
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold mb-1">Para acontecer</h2>
            <p className="text-sm text-gray-500 mb-4">próximas 25 receitas e despesas futuras</p>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-teal-500 text-sm flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              A Pagar
            </div>
            <div className="text-teal-500 text-sm flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              A Receber
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-48">
          <img src="/lovable-uploads/827312bb-9514-49ad-abe8-a83fa4a06324.png" alt="Nada por aqui" className="w-24 opacity-30" />
          <p className="text-gray-400 mt-2">Nada por aqui...</p>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="font-bold">Saldo total:</div>
          <div className="font-bold text-xl">R$ 0,00</div>
        </div>
      </div>
    </div>
  );
}
