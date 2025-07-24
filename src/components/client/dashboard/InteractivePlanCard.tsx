import React, { useState } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Plan Card Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changePlan(-1)}
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <motion.div
          key={currentPlan}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-2xl w-80 text-center relative overflow-hidden shadow-xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                ASSINATURA<br/>
                <strong className="text-base">SEM FIDELIDADE</strong>
              </span>
            </div>
            
            <div className="my-6">
              <div className="text-5xl font-bold leading-none">
                {plan.gb}
              </div>
              <div className="text-lg opacity-80 mt-1">GB</div>
            </div>
            
            <div className="text-sm leading-relaxed">
              <div className="opacity-90">Por</div>
              <div className="text-2xl font-bold my-1">{formatCurrency(plan.price)}</div>
              <div className="opacity-80">/mês</div>
            </div>
          </div>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => changePlan(1)}
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Commission Levels Grid */}
      <motion.div 
        key={`levels-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {plan.commissionLevels.map((level, index) => (
          <motion.div
            key={level.level}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-primary font-bold text-lg mb-3">
              {level.title}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>{level.indications} indicações</p>
              <p>
                <strong className="text-gray-900 text-base">
                  {formatCurrency(level.commission)}
                </strong> por indicado
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="font-bold text-gray-900 text-lg">
                {formatCurrency(level.monthlyValue)}/mês
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Smart Consumption Table */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          Consumo Inteligente
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
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
              <tr className="bg-slate-100 font-bold">
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