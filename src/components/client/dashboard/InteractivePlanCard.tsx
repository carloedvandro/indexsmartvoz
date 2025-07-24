import React, { useState } from 'react';
import { formatCurrency } from "@/utils/format";
import { motion } from 'framer-motion';
import { FlipPlanCard } from './FlipPlanCard';
import "@/styles/components/flip-card-3d.css";

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
      { level: 2, title: "2º Nível", indications: 25, commission: 7.00, monthlyValue: 175.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 6.00, monthlyValue: 750.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 6.00, monthlyValue: 3750.00 }
    ]
  },
  {
    gb: 140,
    price: 144.99,
    commissionLevels: [
      { level: 1, title: "1º Nível", indications: 5, commission: 30.00, monthlyValue: 150.00 },
      { level: 2, title: "2º Nível", indications: 25, commission: 10.00, monthlyValue: 250.00 },
      { level: 3, title: "3º Nível", indications: 125, commission: 7.00, monthlyValue: 875.00 },
      { level: 4, title: "4º Nível", indications: 625, commission: 7.00, monthlyValue: 4375.00 }
    ]
  }
];

export function InteractivePlanCard() {
  const [currentPlan, setCurrentPlan] = useState(0);

  const calculateTotal = (commissionLevels: CommissionLevel[]) => {
    return commissionLevels.reduce((total, level) => total + level.monthlyValue, 0);
  };

  const handleDotClick = (index: number) => {
    setCurrentPlan(index);
  };

  const plan = plans[currentPlan];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      {/* Container com Flip Cards */}
      <div className="plano-slide-container mb-8">
        <div className="plano-cards-wrapper">
          {plans.map((planItem, index) => (
            <FlipPlanCard 
              key={index}
              plan={planItem}
              isActive={index === currentPlan}
            />
          ))}
        </div>
        
        {/* Dots Navigation */}
        <div className="dots-wrapper">
          {plans.map((_, index) => (
            <div 
              key={index}
              className={`dot ${index === currentPlan ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Commission Levels Box */}
      <motion.div 
        key={`levels-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 mb-8"
        style={{
          boxShadow: '0 6px 16px rgba(0,0,0,0.09)'
        }}
      >
        <h2 className="text-primary font-bold text-xl mb-6">
          Níveis de Comissão - Plano {plan.gb}GB
        </h2>
        
        <div className="space-y-4">
          {plan.commissionLevels.map((level) => (
            <div
              key={level.level}
              className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-5 pl-6 border-l-4 border-primary"
            >
              <h3 className="text-primary font-bold text-lg mb-2">
                {level.title}
              </h3>
              
              <p className="text-gray-700 mb-1">
                {level.indications} indicações × {formatCurrency(level.commission)} = {formatCurrency(level.monthlyValue)}/mês
              </p>
            </div>
          ))}
          
          <div className="bg-primary text-white rounded-xl p-5 text-center">
            <h3 className="font-bold text-xl">
              Total Mensal: {formatCurrency(calculateTotal(plan.commissionLevels))}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Consumption Table Box */}
      <motion.div 
        key={`table-${currentPlan}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white p-6 rounded-2xl mb-10"
        style={{
          boxShadow: '0 6px 16px rgba(0,0,0,0.09)'
        }}
      >
        <h2 className="text-primary font-bold text-xl mb-4">
          Consumo Inteligente
        </h2>
        
        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-50">
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Nível</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Clientes</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Valor por Indicado</th>
                <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">Total no Nível</th>
              </tr>
            </thead>
            <tbody>
              {plan.commissionLevels.map((level) => (
                <tr key={level.level}>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{level.title}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{level.indications}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{formatCurrency(level.commission)}</td>
                  <td className="border-b border-gray-300 p-3 text-center text-sm">{formatCurrency(level.monthlyValue)}</td>
                </tr>
              ))}
              <tr>
                <td className="border-b border-gray-300 p-3 text-center text-sm font-bold" colSpan={3}>
                  <strong>Total</strong>
                </td>
                <td className="border-b border-gray-300 p-3 text-center text-sm font-bold">
                  <strong>{formatCurrency(calculateTotal(plan.commissionLevels))}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}