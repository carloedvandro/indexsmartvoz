import React, { useState, useCallback } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";

interface Plan {
  gb: number;
  price: number;
  commissionLevels: CommissionLevel[];
}

interface CommissionLevel {
  level: number;
  title: string;
  indications: number;
  commission: number;
  monthlyValue: number;
}

const plans: Plan[] = [
  {
    gb: 100,
    price: 104.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 20.00, monthlyValue: 100.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 120,
    price: 124.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 25.00, monthlyValue: 125.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  },
  {
    gb: 140,
    price: 144.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 30.00, monthlyValue: 150.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 5.00, monthlyValue: 125.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 5.00, monthlyValue: 625.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 5.00, monthlyValue: 3125.00 }
    ]
  }
];

export function InteractivePlanCard() {
  const [currentPlan, setCurrentPlan] = useState(0);

  const changePlan = (direction: number) => {
    setCurrentPlan(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return plans.length - 1;
      if (newIndex >= plans.length) return 0;
      return newIndex;
    });
  };

  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };

  const plan = plans[currentPlan];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      {/* Plan Card Section */}
      <div className="flex items-center justify-center mb-8 gap-4">
        <button 
          onClick={() => changePlan(-1)}
          className="text-3xl text-primary hover:text-primary/80 transition-colors p-2"
        >
          ←
        </button>
        
        <motion.div 
          key={currentPlan}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-64 h-80 relative overflow-hidden rounded-3xl p-6 text-white text-center flex flex-col justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, #6b00b6, #9c27b0)`,
          }}
        >
          {/* Rotating light effect */}
          <div className="absolute inset-0 w-full h-full opacity-10">
            <div 
              className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-spin"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 70%)',
                animationDuration: '8s'
              }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="mb-4">
              <div className="text-sm font-bold uppercase tracking-wider">
                ASSINATURA
              </div>
              <div className="text-sm">
                <strong>SEM FIDELIDADE</strong>
              </div>
            </div>
            
            <div className="my-6">
              <div className="text-6xl font-bold leading-none">
                {plan.gb}
              </div>
              <div className="text-lg opacity-80">GB</div>
            </div>
            
            <div className="text-sm">
              <div className="opacity-90">Por</div>
              <div className="text-2xl font-bold my-1">{formatCurrency(plan.price)}</div>
              <div className="opacity-80">/mês</div>
            </div>
          </div>
        </motion.div>
        
        <button 
          onClick={() => changePlan(1)}
          className="text-3xl text-primary hover:text-primary/80 transition-colors p-2"
        >
          →
        </button>
      </div>

      {/* Commission Levels Section */}
      <motion.div 
        key={`levels-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        {plan.commissionLevels.map((level, index) => (
          <div
            key={level.level}
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 shadow-md"
          >
            <h3 className="text-primary font-bold text-xl mb-3">
              {level.title}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                {level.indications} indicações{" "}
                <strong className="text-gray-900 text-base">
                  {formatCurrency(level.commission)}
                </strong> por indicado
              </p>
              <p className="text-lg font-bold text-primary pt-2">
                Total: {formatCurrency(level.monthlyValue)}/mês
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Consumption Table Section */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-primary mb-6">
          Consumo Inteligente
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Nível</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Clientes</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Valor por Indicado</th>
                <th className="px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-700">Total no Nível</th>
              </tr>
            </thead>
            <tbody>
              {plan.commissionLevels.map((level) => (
                <tr key={level.level} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-center border-b border-gray-100">{level.title}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{level.indications}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{formatCurrency(level.commission)}</td>
                  <td className="px-4 py-3 text-center border-b border-gray-100">{formatCurrency(level.monthlyValue)}</td>
                </tr>
              ))}
              <tr className="bg-purple-100 font-bold">
                <td className="px-4 py-3 text-center border-b border-gray-200">Total</td>
                <td className="px-4 py-3 text-center border-b border-gray-200">780</td>
                <td className="px-4 py-3 text-center border-b border-gray-200">-</td>
                <td className="px-4 py-3 text-center border-b border-gray-200 text-primary font-bold">
                  {formatCurrency(calculateTotal(plan.commissionLevels))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}